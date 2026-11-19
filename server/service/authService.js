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



export const loginService = async ({ email, username, password }) => {
    // 1. البحث عن المستخدم بالبريد أو اسم المستخدم
    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (!user) {
        throw new Error("INVALID_CREDENTIALS");
    }
    
    // 2. التحقق من الحظر المؤقت
    if (user.lockUntil && user.lockUntil > Date.now()) {
        throw new Error("ACCOUNT_LOCKED");
    }

    

    // 3. التحقق من صحة كلمة المرور
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        user.loginAttempts = (user.loginAttempts || 0) + 1;

        if (user.loginAttempts >= 4) {
            user.lockUntil = Date.now() + 15 * 60 * 1000; // حظر لمدة 15 دقيقة
            await user.save();
            throw new Error("MAX_ATTEMPTS_REACHED");
        }
         
        await user.save();
        const remainingAttempts = 4 - user.loginAttempts;
        
        // رمي خطأ يحمل عدد المحاولات المتبقية
        const error = new Error("INCORRECT_PASSWORD");
        error.remainingAttempts = remainingAttempts;
        throw error;
    }

    // 4. إعادة تعيين محاولات الفشل عند نجاح الدخول
    user.loginAttempts = 0;
    user.lockUntil = null;

    // 5. توليد التوكنات
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
         
        }
    };
};

export const loginAdminService =  async ({email, username, password}) =>
{
    // 1. البحث عن المستخدم بالبريد أو اسم المستخدم
    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (!user) {
        throw new Error("INVALID_CREDENTIALS");
    }
    
    // 2. التحقق من الحظر المؤقت
    if (user.lockUntil && user.lockUntil > Date.now()) {
        throw new Error("ACCOUNT_LOCKED");
    }

    

    // 3. التحقق من صحة كلمة المرور
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        user.loginAttempts = (user.loginAttempts || 0) + 1;

        if (user.loginAttempts >= 4) {
            user.lockUntil = Date.now() + 15 * 60 * 1000; // حظر لمدة 15 دقيقة
            await user.save();
            throw new Error("MAX_ATTEMPTS_REACHED");
        }
         
        await user.save();
        const remainingAttempts = 4 - user.loginAttempts;
        
        // رمي خطأ يحمل عدد المحاولات المتبقية
        const error = new Error("INCORRECT_PASSWORD");
        error.remainingAttempts = remainingAttempts;
        throw error;
    }

    // 4. إعادة تعيين محاولات الفشل عند نجاح الدخول
    user.loginAttempts = 0;
    user.lockUntil = null;

    // 5. توليد التوكنات
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
         
        }
    };
};





export const logoutService = async (refreshToken) => {
    if (!refreshToken) return;
    
    // البحث عن المستخدم الذي يحمل هذا الـ Refresh Token وإزالته
    const user = await User.findOne({ refreshToken });
    if (user) {
        user.refreshToken = null;
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