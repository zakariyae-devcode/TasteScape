import redisClient from "../config/redisClient.js";

export const cacheMiddleware = (durationInSeconds = 60) => {
    return async (req, res, next) => {
        // إنشاء مفتاح فريد بناءً على مسار الطلب ومعاملات البحث (Query Params)
        const key = `cache:${req.originalUrl || req.url}`;

        try {
            const cachedData = await redisClient.get(key);

            if (cachedData) {
                // وجدنا البيانات في الكاش، إرسالها فوراً
                return res.status(200).json({
                    success: true,
                    source: "cache",
                    ...JSON.parse(cachedData)
                });
            }

            // إذا لم توجد، نقوم باعتراض دالة res.json لحفظ النتيجة قبل إرسالها
            const originalJson = res.json.bind(res);
            res.json = async (data) => {
                await redisClient.setEx(key, durationInSeconds, JSON.stringify(data));
                return originalJson(data);
            };

            next();
        } catch (error) {
            console.error("Redis Cache Error:", error);
            next(); // في حال حدوث خطأ في Redis، يتم تجاوز الكاش ومتابعة الطلب طبيعياً
        }
    };
};