import z from "zod";
export const registerSchema=z.object({
            email:z.string().email(),
            password:z.string().min(3),
            username:z
            .string()
            //[username].shop.com
            .min(3, "Username must be at least 3 characters")
            .max(63, "Username must be less than 63 characters")
            .regex(/^[a-z0-9][a-z0-9]*[a-z0-9]$/,
                "Username ca only contain lowercase letters, numbers ans hyphens.It must start and end with a letter or number"
            )
            .refine(
                (val)=>!val.includes("--"),
                "Username cannot contain consecutive hyphens"
            )
            .transform ((val)=>val.toLowerCase()),
        });

export const loginSchema= z.object({
            email:z.string().email(),
            password:z.string(),
        })