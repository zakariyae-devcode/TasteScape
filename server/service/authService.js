import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";

export const registerUserService = async ({ username, email, password,first_name="",last_name="" }) => {
    // 1. التحقق مما إذا كان اسم المستخدم أو البريد الإلكتروني مستخدماً مسبقاً
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
        throw new Error("USER_ALREADY_EXISTS");
    }

    // 2. تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(password, 15);

    // 3. إنشاء وحفظ المستخدم الجديد
    const newUser = new User({
        username,
        email,
        first_name,
        last_name,
       is_active: true,
        password: hashedPassword
    });

    await newUser.save();
    return newUser;
};



const authenticateUser = async ({ email, username, password, expectedRole }) => {
  const conditions = [];
  if (email) conditions.push({ email: email.toLowerCase().trim() });
  if (username) conditions.push({ username: username.trim() });

  if (conditions.length === 0) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const user = await User.findOne({ $or: conditions });
  if (!user) {
    throw new Error("INVALID_CREDENTIALS");
  }

  if (user.lockUntil && user.lockUntil > Date.now()) {
    throw new Error("ACCOUNT_LOCKED");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    user.loginAttempts = (user.loginAttempts || 0) + 1;

    if (user.loginAttempts >= 4) {
      user.lockUntil = Date.now() + 15 * 60 * 1000;
      await user.save();
      throw new Error("MAX_ATTEMPTS_REACHED");
    }

    await user.save();
    const remainingAttempts = 4 - user.loginAttempts;

    const error = new Error("INCORRECT_PASSWORD");
    error.remainingAttempts = remainingAttempts;
    throw error;
  }

  if (user.role !== expectedRole) {
    throw new Error("FORBIDDEN_ROLE");
  }

  user.loginAttempts = 0;
  user.lockUntil = null;

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  user.is_active = true;
  await user.save();

  return {
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  };
};

export const loginService = (credentials) =>
  authenticateUser({ ...credentials, expectedRole: "user" });

export const loginAdminService = (credentials) =>
  authenticateUser({ ...credentials, expectedRole: "admin" });







export const logoutService = async (refreshToken) => {
    if (!refreshToken) return;
    
    // البحث عن المستخدم الذي يحمل هذا الـ Refresh Token وإزالته
    const user = await User.findOne({ refreshToken });
 
    if (user) {
        user.refreshToken = null;
        user.is_active=false;
        await user.save();
    }
};

export const refreshTokenService = async (oldRefreshToken) => {
    if (!oldRefreshToken) {
        throw new Error("NO_REFRESH_TOKEN");
    }

    let decoded;
    try {
        // فك تشفير والتحقق من صلاحية الـ Refresh Token
        decoded = jwt.verify(oldRefreshToken, process.env.JWT_SECRET);
    } catch (err) {
        throw new Error("INVALID_TOKEN");
    }

    // البحث عن المستخدم والتحقق من مطابقة الـ Refresh Token المخزن (حماية أمنية قوية)
    const user = await User.findOne({ _id: decoded.userId, refreshToken: oldRefreshToken });
    if (!user) {
        throw new Error("TOKEN_REUSE_DETECTED"); // مؤشر على محاولة استخدامه مرتين أو سرقته
    }

    // توليد رموز جديدة بالكامل (Token Rotation)
    const newAccessToken = generateAccessToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);

    // تحديث الـ Refresh Token الجديد في قاعدة البيانات
    user.refreshToken = newRefreshToken;
    await user.save();

    return { newAccessToken, newRefreshToken };
};