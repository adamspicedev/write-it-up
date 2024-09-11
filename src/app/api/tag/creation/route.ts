import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 },
      );
    }

    const data = await req.json();
    const { name } = data;

    if (!name) {
      return NextResponse.json(
        { error: "Tag name is required" },
        { status: 400 },
      );
    }

    const newTag = await prisma.tag.create({ data: { name } });

    return NextResponse.json({ status: 200, body: newTag });
  } catch (error) {
    console.error("Error creating tag:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
