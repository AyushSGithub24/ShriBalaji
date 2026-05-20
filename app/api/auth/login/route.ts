import { NextResponse } from "next/server";
import { db } from "@/lib/db"; 
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

import { loginSchema } from "@/lib/validations"; 
import { generateAccessToken } from "@/lib/token";

export async function POST(req:Request){
    try{
        const body = await req.json();
        const result = loginSchema.safeParse(body);
        if(!result.success){
            return NextResponse.json(
                { message: "Invalid input", errors: result.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        const { email, password } = result.data;
        const user = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

        if(user.length === 0){
            return NextResponse.json(
                { message: "Invalid email or password" },
                { status: 401 }
            );
        }

        const isMatch = await bcrypt.compare(password, user[0].passwordHash);
        if (!isMatch) {
            return NextResponse.json(
                { message: "Invalid email or password" },
                { status: 401 }
            );
        }

        const accessToken = generateAccessToken(user[0]);   
      

        // 2. Prepare the response
        const response = NextResponse.json(
            { message: "Login successful" },
            { status: 200 }
        );

        // 3. Set the token as an HttpOnly cookie
        response.cookies.set("accessToken", accessToken, {
            httpOnly: true, // Prevents JavaScript from reading the cookie
            secure: process.env.NODE_ENV === "production", // Requires HTTPS in production
            sameSite: "strict", // Protects against Cross-Site Request Forgery (CSRF)
            maxAge: 60 * 60 * 24, // 1 day in seconds (matches your JWT expiration)
            path: "/", // Makes the cookie available across the whole site
        });

        // 4. Return the modified response
        return response;

    }catch(error){
        console.error("Login error:", error);
        return NextResponse.json(
            { message: "An error occurred during login" },
            { status: 500 }
        );
    }
}