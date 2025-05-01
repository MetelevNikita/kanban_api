import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// prisma

import { PrismaClient } from "@/../generated/prisma/client";
const prisma = new PrismaClient();

// types

import { UserType  } from "@/types/types";



export const GET = async (): Promise<NextResponse<UserType[] | {message: string}>> => {
  try {

    const users = await prisma.user.findMany({
      include: {
        profile: true,
        task: {
          include: {
            comment: true
          }
        }
      }
    });

    if(users.length < 1) {
      return NextResponse.json([] , { status: 200 });
    }

    return NextResponse.json(users, { status: 200 });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}




export const POST = async (request: Request) => {

  try {

    const {username, email, password  } = await request.json();
    const checkPassword = password.split('')


    if (!username || !email || !password) {
      return NextResponse.json({ error: "please enter all field" }, { status: 404 });
    }

    if (checkPassword.length <= 6) {
      return NextResponse.json({ error: "password too short" }, { status: 404 });
    }


    const hashPassword = await bcrypt.hash(password.trim(), 10);

    const users = await prisma.user.create({
      data: {
        username: username.trim(),
        email: email.trim(),
        password: hashPassword,
        isAdmin: false
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
