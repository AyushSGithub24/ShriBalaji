// lib/session.ts
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getUserSession() {
  const cookieStore = await cookies();
  const token =cookieStore.get("accessToken")?.value;

  if (!token) return null;

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { 
      userId: string; 
      userName: string 
    };
    return decoded;
  } catch (error) {
    // If the token is expired or invalid, return null
    return null;
  }
}