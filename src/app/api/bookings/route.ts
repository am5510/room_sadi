import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const month = searchParams.get("month");
  const year = searchParams.get("year");

  if (!month || !year) {
    return NextResponse.json({ error: "Month and Year are required" }, { status: 400 });
  }

  const startDate = new Date(parseInt(year), parseInt(month), 1);
  const endDate = new Date(parseInt(year), parseInt(month) + 1, 0);

  try {
    const bookings = await prisma.booking.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        room: true,
      },
    });
    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { roomId, title, date, startTime, endTime, userName, userEmail } = body;

    const booking = await prisma.booking.create({
      data: {
        roomId,
        title,
        date: new Date(date),
        startTime,
        endTime,
        userName,
        userEmail,
        status: "CONFIRMED",
      },
    });

    return NextResponse.json(booking);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}
