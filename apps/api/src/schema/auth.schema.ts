import * as zod from "zod";

export const registerUserSchema = zod
  .object({
    name: zod.string({ required_error: "Name is required" }),
    email: zod
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid email" }),
    password: zod
      .string({ required_error: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: zod
      .string({ required_error: "Confirm password is required" })
      .min(6, {
        message: "Confirm password must be at least 6 characters long",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Types of the above schema
export type RegisterUserInput = zod.infer<typeof registerUserSchema>;
