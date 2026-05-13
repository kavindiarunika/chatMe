import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

// Extract userId safely
function getUserIdFromToken(req: Request): string | null {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { userId?: string; id?: string };

    return decoded.userId ?? decoded.id ?? null;
  } catch {
    return null;
  }
}

// GET PROFILE
export async function GET(req: Request) {
  try {
    const userId = getUserIdFromToken(req);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profile = await prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      return NextResponse.json(
        { name: "", bio: "", image: "" },
        { status: 200 }
      );
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error("GET Profile Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

// PATCH PROFILE
export async function PATCH(req: Request) {
  try {
    const userId = getUserIdFromToken(req);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("PATCH Profile - userId from token:", userId);

    const body = await req.json();
    console.log("PATCH Profile - body:", body);
    const { name, bio, image } = body;

    const updatedProfile = await prisma.profile.upsert({
      where: { userId },
      update: {
        name,
        bio,
        image,
      },
      create: {
        userId,
        name: name ?? "",
        bio: bio ?? "",
        image: image ?? "",
      },
    });

    console.log("PATCH Profile - success:", updatedProfile);
    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.error("PATCH Profile Error - Full Details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      error: error,
    });
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update profile" },
      { status: 500 }
    );
  }
}