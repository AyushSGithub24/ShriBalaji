import jwt from "jsonwebtoken";
import { users } from "@/lib/schema";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

// 1. Magically extract the type directly from your Drizzle schema!
export type DrizzleUser = typeof users.$inferSelect;

export function generateAccessToken(user: DrizzleUser) {
  return jwt.sign(
    { userId: user.id, userName: user.name },
    process.env.JWT_SECRET!,  
    { expiresIn: "1d" } // Access token expires in 1 day
  );
}