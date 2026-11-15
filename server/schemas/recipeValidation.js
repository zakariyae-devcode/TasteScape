import {z} from 'zod';

import { z } from "zod";

export const recipeValidation = z.object({
  title: z
    .string({ required_error: "عنوان الوصفة مطلوب" })
    .min(1, "عنوان الوصفة مطلوب")
    .max(100, "العنوان يجب ألا يتجاوز 100 حرف"),
    
  description: z
    .string({ required_error: "وصف الوصفة مطلوب" })
    .min(1, "وصف الوصفة مطلوب")
    .max(500, "الوصف يجب ألا يتجاوز 500 حرف"),
    
  ingredients: z
    .array(z.string().min(1, "المكون لا يمكن أن يكون فارغاً"), {
      required_error: "يجب إدراج مكون واحد على الأقل"
    })
    .min(1, "يجب إدراج مكون واحد على الأقل"),
    
  instructions: z
    .array(z.string().min(1, "الخطوة لا يمكن أن تكون فارغة"), {
      required_error: "خطوات التحضير مطلوبة"
    })
    .min(1, "خطوات التحضير مطلوبة"),
    
  category: z
    .enum(["إفطار", "غداء", "عشاء", "وجبات خفيفة", "حلويات", "أخرى"], {
      errorMap: () => ({ message: "التصنيف غير صالح" })
    })
    .optional(),
    
  prepTime: z
    .number()
    .nonnegative("وقت التحضير يجب ألا يكون سالباً")
    .optional(),
    
  cookTime: z
    .number()
    .nonnegative("وقت الطهي يجب ألا يكون سالباً")
    .optional(),
    
  servings: z
    .number()
    .positive("عدد الأفراد يجب أن يكون أكبر من الصفر")
    .optional(),
    
  image: z
    .string()
    .url("رابط الصورة غير صالح")
    .optional()
    .or(z.literal(""))
});