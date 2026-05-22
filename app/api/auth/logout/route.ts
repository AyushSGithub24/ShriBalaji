// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );

    // This tells the browser to instantly delete the cookie
    response.cookies.delete("accessToken");

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred during logout" },
      { status: 500 }
    );
  }
}