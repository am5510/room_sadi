import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const isAuthenticated = await getSession();
  if (!isAuthenticated) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const { name, color } = await request.json();

    const updatedRoom = await prisma.room.update({
      where: { id },
      data: {
        name,
        color,
      },
    });

    return NextResponse.json(updatedRoom);
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ error: "Failed to update room" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const isAuthenticated = await getSession();
  if (!isAuthenticated) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    
    // Check for existing bookings first
    const bookings = await prisma.booking.findMany({
      where: { roomId: id }
    });

    if (bookings.length > 0) {
      return NextResponse.json({ error: "Cannot delete room with existing bookings." }, { status: 400 });
    }

    await prisma.room.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete room" }, { status: 500 });
  }
}
