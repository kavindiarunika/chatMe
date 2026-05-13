
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";


export async function POST(req: Request) {
  const { email, password } = await req.json();
  console.log("=== SIGNUP START ===");
  console.log("Email:", email);

  // check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log("User already exists:", email);
    return NextResponse.json(
      { error: "User already exists" },
      { status: 400 }
    );
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // create user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  console.log("User created successfully:", {
    id: user.id,
    email: user.email,
  });

  const token = jwt.sign(
  { userId: user.id, email: user.email }, // payload
  process.env.JWT_SECRET as string,       // secret
  { expiresIn: "7d" }                     // options
);

  console.log("Token created:", token);
  console.log("=== SIGNUP END ===");

  return NextResponse.json({ message: "User created", user, token });
}