import { NextResponse } from "next/server";


//

import { PrismaClient } from "@/../generated/prisma/client";
const prisma = new PrismaClient();

// types

import { ProfileType, UserType } from "@/types/types";



export const POST = async (request: Request, {params}: {params: {id: string}}): Promise<NextResponse<UserType | {message: string}>> => {
  try {

    const { id } = await params;
    const { name, lastName, profession, company } = await request.json();
    console.log(id)

    if (!name || !lastName || !profession || !company) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const createProfile = await prisma.user.update({
      where: {
        id: parseInt(id)
      },
      data: {
        profile: {
          create: {
            name,
            lastName,
            profession,
            company
          }
        }
      },
      include: {
        profile: true,
      }
    })

    if (!createProfile) {
      return NextResponse.json({ message: "error create profile" }, { status: 404 });
    }

    return NextResponse.json(createProfile, { status: 200 });

  } catch (error: unknown) {

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: errorMessage }, { status: 500 });

  }
}


export const DELETE = async (request: Request, {params}: {params: {id: string}}): Promise<NextResponse<{message: string}>> => {
  try {

    const { id } = await params;

    const deleteProfile = await prisma.user.update({
      where: {
        id: parseInt(id)
      },
      data: {
        profile: {
          delete: true
        }
      }
    })

    if (!deleteProfile) {
      return NextResponse.json({ message: "error delete profile" }, { status: 404 });
    }

    return NextResponse.json({ message: "profile deleted successfully" }, { status: 200 });

  } catch (error: unknown) {
    return NextResponse.json({ message: "error delete profile" }, { status: 404 });
  }
}


export const PATCH = async (request: Request, {params}: {params: {id: string}}): Promise<NextResponse<UserType | {message: string}>> => {

  try {
    const { id } = await params;
    const { name, lastName, profession, company } = await request.json();


    const updateUser = await prisma.user.update({
      where: {
        id: parseInt(id)
      },
      data: {
        profile: {
          update: {
            name
          }
        }
      },
      include: {
        profile: true,
      }

    })

    if (!updateUser) {
      return NextResponse.json({ message: "error update profile" }, { status: 404 });
    }

    return NextResponse.json(updateUser, { status: 200 });

  } catch (error: unknown) {

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: errorMessage }, { status: 500 });

  }




}