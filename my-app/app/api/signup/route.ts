
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";


export async function POST(req: Request) {
  const { email, password } = await req.json();
  console.log("DB URL:", process.env.DATABASE_URL);

  // check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
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

  const token = jwt.sign(
  { email: user.email }, // payload
  process.env.JWT_SECRET as string,       // secret
  { expiresIn: "7d" }                     // options
);

  return NextResponse.json({ message: "User created", user, token });
}