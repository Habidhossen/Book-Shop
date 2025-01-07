import User from "@/app/models/user.model";
import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Connect to the database
    await connectDB();

    // Fetch all users from the database
    const users = await User.find();

    // Respond with the list of users
    return NextResponse.json(
      {
        success: true,
        message: "Data fetched successfully",
        result: users.length,
        data: users,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching users", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
