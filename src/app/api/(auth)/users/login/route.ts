import User from "@/app/models/user.model";
import connectDB from "@/lib/connectDB";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Parse the request body
    const { email, password } = await req.json();

    // Check if both email and password are provided
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectDB();

    // Find the user by email
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Compare the entered password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate JWT accessToken with user details
    const accessToken = jwt.sign(
      { userId: user._id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    // Sanitize the user object by excluding sensitive fields
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    // Respond with a success message and the accessToken
    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
        data: { accessToken, user: userData },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during login", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
