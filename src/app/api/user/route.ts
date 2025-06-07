import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";


// prisma

import { PrismaClient } from "@/../generated/prisma/client";
const prisma = new PrismaClient();

// types

import { UserType  } from "@/types/types";


// fn

import { uploadImageHandler } from "@/functions/uploadImageHandler"





export const GET = async (): Promise<NextResponse<UserType[] | {message: string}>> => {
  try {

    const users = await prisma.user.findMany({
      include: {
        profile: true,
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

    const url = new URL(request.url);

    const formData = await request.formData();
    const username = formData.get('username') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const file: File | null = await formData.get('avatar') as unknown as File;
    const company = formData.get('company') as string


    const checkPassword = password.split('')

    const filename = await uploadImageHandler(file)

    console.log(username, email, password, company);


    const emailExists = await prisma.user.findFirst({
      where: {
        email: email
      }
    })

    if (emailExists) {
      return NextResponse.json({ message: "email already exists" }, { status: 404 });
    }

    if (emailExists) {
      return NextResponse.json({ message: "user already exists" }, { status: 404 });
      
    }

    if (!username || !email || !password) {
      return NextResponse.json({ message: "please enter all field" }, { status: 404 });
    }

    if (checkPassword.length <= 6) {
      return NextResponse.json({ message: "password too short" }, { status: 404 });
    }

    const hashPassword = await bcrypt.hash(password.trim(), 10);

    const user = await prisma.user.create({
      data: {
        username: username.trim(),
        avatar: `${url.origin}/uploads/avatar/${filename}`,
        email: email.trim(),
        password: hashPassword,
        company: company.trim(),
        isAdmin: false
      }
    })
    




    if (!user) {
      return NextResponse.json({ message: "error create users" }, { status: 404 });
    }


    const board = await prisma.board.findMany({
      where: {
        company: company.trim(),
      }
    })


    const newBoard = await prisma.board.create({
      data: {
        boardId: (board.length + 1).toString(),
        company: company.trim(),
        label: username,
        value: username,
        color: '#3D8F8F',
        colorBoard: '#CDE8E8' 
      }
    })

    if (!newBoard) {
      return NextResponse.json({ message: "error create board user" }, { status: 404 });
    }



    return NextResponse.json({ message: 'user is created' }, { status: 200 });



  } catch (error) {
    return NextResponse.json({ error: "something went wrong" }, { status: 500 });
  }
}
