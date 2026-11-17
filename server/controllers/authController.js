import  { registerValidation,loginValidation } from "../validation/authValidation.js";
import 
{
    registerUserService,
    loginService,
    logoutService,
    refreshTokenService,

} from "../service/authService.js"


export const register = async (req, res) => {
    try {
        // 1. التحقق من صحة البيانات عبر Zod
        const validationResult = registerValidation.safeParse(req.body);
        if (!validationResult.success) {
            const errorsMessage = validationResult.error.errors.map(err => err.message);
            return res.status(400).json({ errors: errorsMessage });
        }

        // 2. استدعاء خدمة التسجيل وتمرير البيانات المتحقق منها
        await authService.registerUserService(validationResult.data);

        return res.status(201).json({ message: "User registered successfully." });
    }
    catch (err) {
        // 3. التعامل مع الأخطاء القادمة من الـ Service
        if (err.message === "USER_ALREADY_EXISTS") {
            return res.status(400).json({ error: "Username or email is already in use, please choose another one." });
        }

        console.error("Registration error:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const login = async (req, res) => {
    try {
        // 1. التحقق من صحة البيانات عبر Zod
        const validationResult = loginValidation.safeParse(req.body);
        if (!validationResult.success) {
            const errorsMessage = validationResult.error.errors.map(err => err.message);
            return res.status(400).json({ errors: errorsMessage });
        }

        // 2. استدعاء خدمة تسجيل الدخول
        const { accessToken, refreshToken, user } = await authService.loginService(validationResult.data);

        // 3. تخزين الـ Refresh Token في الـ Cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 2 * 24 * 60 * 60 * 1000, // يومان
        });

        return res.status(200).json({
            message: "تم تسجيل الدخول بنجاح! 🚀",
            accessToken,
            user,
        });

    } catch (error) {
        // 4. معالجة الأخطاء القادمة من الـ Service
        if (error.message === "INVALID_CREDENTIALS") {
            return res.status(401).json({ error: "Your password, email, or username is incorrect." });
        }
        if (error.message === "ACCOUNT_LOCKED") {
            return res.status(403).json({ 
                error: "You have exceeded the allowed number of incorrect attempts. Your account has been temporarily locked; please try again later.",
                redirectToRegister: true 
            });
        }
        if (error.message === "MAX_ATTEMPTS_REACHED") {
            return res.status(403).json({ 
                error: "4 failed attempts! Account has been temporarily blocked.",
                redirectToRegister: true 
            });
        }
        if (error.message === "INCORRECT_PASSWORD") {
            return res.status(401).json({ 
                error: `The password is incorrect. You have ${error.remainingAttempts} attempts remaining.` 
            });
        }

        console.error("Login error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const logout = async (req, res) => {
    try {
        // 1. استخدام req.cookies (بإضافة s) مع الاستخدام الآمن ?
        const refreshToken = req.cookies?.refreshToken;

        if (!refreshToken) {
            return res.status(204).send();
        }

        // 2. استدعاء خدمة تسجيل الخروج
        await authService.logoutService(refreshToken);

        // 3. مسح الـ Cookie من المتصفح
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        return res.status(200).json({ message: "You have been logged out successfully." });
    }
    catch (error) { // 4. استخدام المتغير الصحيح error بدلاً من err
        console.error("Logout error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    // استدعاء خدمة تجديد التوكن
    const { newAccessToken, newRefreshToken } = await authService.refreshTokenService(refreshToken);

    // تخزين الـ Refresh Token الجديد في الـ Cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 2 * 24 * 60 * 60 * 1000, // يومان
    });

    return res.status(200).json({
      accessToken: newAccessToken,
    });

  } catch (error) {
    // معالجة الأخطاء القادمة من الـ Service
    if (error.message === "NO_REFRESH_TOKEN") {
      return res.status(401).json({ error: "Refresh Token غير موجود في الكوكيز." });
    }
    if (error.message === "INVALID_TOKEN" || error.message === "TOKEN_REUSE_DETECTED") {
      return res.status(403).json({ error: "تحذير أمني: الرمز غير صالح، منتهٍ، أو تم استخدامه مسبقاً." });
    }

    console.error("Token rotation error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

