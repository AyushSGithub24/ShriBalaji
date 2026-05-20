import { NextResponse } from "next/server";
import { db } from "@/lib/db"; 
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { signupSchema } from "@/lib/validations";  

export async function POST(req: Request) {
  try {
    // 1. Parse the incoming JSON body
    const body = await req.json();

    // 2. Validate the input using your Zod schema
    const result = signupSchema.safeParse(body);
    
    if (!result.success) {
      // Return 400 Bad Request with the specific Zod errors
      return NextResponse.json(
        { message: "Invalid input", errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { email, name, password } = result.data;

    // 3. Check if a user with this email already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 } // 409 Conflict
      );
    }

    // 4. Hash the password
 
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Insert the new user into the database
    await db.insert(users).values({
      name,
      email,
      passwordHash: hashedPassword,
      role: 'CUSTOMER', // Defaulting to CUSTOMER from your schema
    });

    // 6. Return a success response
    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );

  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}