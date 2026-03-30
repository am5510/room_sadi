import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function GET() {
  try {
    const rooms = await prisma.room.findMany({
      include: {
        bookings: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(rooms);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch rooms" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  // Security Check
  const isAuthenticated = await getSession();
  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, color } = body;

    const room = await prisma.room.create({
      data: {
        name,
        color,
        type: "ห้องทั่วไป", // Default type
        capacity: 10, // Default capacity
      },
    });

    return NextResponse.json(room);
  } catch (error) {
    console.error("Create error:", error);
    return NextResponse.json({ error: "Failed to create room" }, { status: 500 });
  }
}
