import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(1, "Password is required"),
});

export const signupSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(
        2,
        "Username must be at least 2 characters"
      )
      .max(
        30,
        "Username must be 30 characters or fewer"
      ),

    email: z
      .string()
      .trim()
      .email("Please enter a valid email address")
      .toLowerCase(),

    password: z
      .string()
      .min(
        8,
        "Password must be at least 8 characters"
      )
      .refine(
        (password) =>
          password.trim().length > 0,
        {
          message: "Password must not be blank",
        }
      )
      .refine(
        (password) =>
          new TextEncoder().encode(password).length <= 72,
        {
          message:
            "Password must not exceed 72 UTF-8 bytes",
        }
      ),

    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .refine(
    (data) =>
      data.password === data.confirmPassword,
    {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }
  );