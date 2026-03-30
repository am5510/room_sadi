import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST() {
  try {
    // Clear existing rooms
    await prisma.booking.deleteMany({});
    await prisma.room.deleteMany({});

    // Create sample rooms
    const rooms = await Promise.all([
      prisma.room.create({
        data: {
          name: "ห้องประชุม A",
          type: "ห้องประชุม",
          capacity: 20,
          description: "ห้องประชุมขนาดเล็กสำหรับทีมงาน",
          amenities: "Whiteboard, Projector, Video Conference",
        },
      }),
      prisma.room.create({
        data: {
          name: "ห้องประชุม B",
          type: "ห้องประชุม",
          capacity: 15,
          description: "ห้องประชุมขนาดเล็กสำหรับทีมงาน",
          amenities: "Whiteboard, Monitor, Video Conference",
        },
      }),
      prisma.room.create({
        data: {
          name: "ห้องอื่นๆ",
          type: "ห้องอื่นๆ",
          capacity: 30,
          description: "ห้องสำหรับกิจกรรมพิเศษ",
          amenities: "Sound System, Projector, Air Conditioning",
        },
      }),
    ]);

    return NextResponse.json({ 
      message: "Sample rooms created successfully",
      rooms 
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "Failed to seed rooms" }, { status: 500 });
  }
}
