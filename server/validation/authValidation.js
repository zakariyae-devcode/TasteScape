import {z} from 'zod';

export const registerValidation = z
  .object({
    username: z.string().min(3, { message: "Username must be at least 3 characters long." }),
    first_name: z.string().min(4, { message: "First name must be at least 4 characters long." }).optional(),
    last_name: z.string().min(4, { message: "Last name must be at least 4 characters long." }).optional(),
    email: z.string().email({ message: "Invalid email address." }),
    password: z
      .string({ required_error: "Password is required." })
      .min(8, "Password must be at least 8 characters long.")
      .max(100, "Password is too long.")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
      .regex(/[0-9]/, "Password must contain at least one number."),
    confirmPassword: z.string({ required_error: "Confirm password is required." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
export const loginValidation = z.object({
  username:z.string().min(3,{message:"Username must be at least 3 characters long."}).optional(),
  email: z.string().email({message: 'Invalid email address'}).optional(),
  password: z.string().min(8, {message: 'Password must be at least 8 characters long'}),
});