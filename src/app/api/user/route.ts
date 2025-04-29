import { NextResponse } from "next/server";

//

import { PrismaClient } from "@/../generated/prisma/client";
const prisma = new PrismaClient();



export const GET = async () => {
  try {

    const users = await prisma.user.findMany({
      include: {
        post: true
      }
    });

    if(users.length < 1) {
      return NextResponse.json({ error: "no users" }, { status: 404 });
    }

    return NextResponse.json({ users }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}




export const POST = async (request: Request) => {
  try {

    const {username, email, password  } = await request.json();

    const users = await prisma.user.create({
      data: {
        username,
        email,
        password
      }
    })


    if (!users) {
      return NextResponse.json({ error: "error create users" }, { status: 404 });
    }

    return NextResponse.json({ users }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
