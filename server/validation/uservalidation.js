import {z} from 'zod';

export const updateProfileValidation = z.object({
  username: z.string().min(3, {message: 'Username must be at least 3 characters long'}).optional(),
  first_name:z.string().min(4,{message:"first_name must be at least 4 characters long"}).optional(),
  last_name:z.string().min(4,{message:"first_name must be at least 4 characters long"}).optional(),
  email: z.string().email({message: 'Invalid email address'}).optional(),
  
});





export const changePasswordValidation = z
  .object({
    currentPassword: z
      .string({ required_error: "Current password is required." })
      .min(8, "Current password is required."),
    newPassword: z
      .string({ required_error: "New password is required." })
      .min(8, "New password must be at least 8 characters long.")
      .max(100, "New password is too long.")
      .regex(/[A-Z]/, "New password must contain at least one uppercase letter.")
      .regex(/[a-z]/, "New password must contain at least one lowercase letter.")
      .regex(/[0-9]/, "New password must contain at least one number."),

    confirmPassword: z
      .string({ required_error: "Confirm password is required." })
      .min(8, "Confirm password is required."),
    
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password.",
    path: ["newPassword"],
  });