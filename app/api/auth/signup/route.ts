import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import connectDB from "@/config/database";
import User from "@/models/User";

export async function POST(request: Request) {
  const { name, email, password, confirmPassword } = await request.json();

  // Email validation
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Input validation
  if (!name || !email || !password || !confirmPassword) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { message: "Invalid email format" },
      { status: 400 }
    );
  }

  if (confirmPassword !== password) {
    return NextResponse.json(
      { message: "Passwords do not match" },
      { status: 400 }
    );
  }

  if (password.length < 6) {
    return NextResponse.json(
      { message: "Password must be at least 6 characters long" },
      { status: 400 }
    );
  }

  try {
    // Connect to the database
    await connectDB();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      name,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Return success response
    return NextResponse.json({ message: "User created" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
