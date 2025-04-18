import { NextResponse } from "next/server";
import { getAuthUser } from "@/utils/auth"; // You'll create this
import { prisma } from "@/utils/prisma"; // Adjust the import path as necessary

export async function GET(req: Request) {
  const user = await getAuthUser(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(users);
}
