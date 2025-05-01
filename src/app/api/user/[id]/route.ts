import { NextResponse } from 'next/server';

// prisma

import { PrismaClient } from "@/../generated/prisma/client";
const prisma = new PrismaClient();

// type

import { UserType } from '@/types/types';


export const GET = async (request: Request, { params }: { params: { id: string } }): Promise<NextResponse<UserType | {message: string}>> => {

  try {

    const { id } = await params;

    const singleUser = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        profile: true,
        task: {
          include: {
            comment: true
          }
        }
      }
    });

    if (!singleUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(singleUser, {status: 200});

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}


export const DELETE = async (request: Request, { params }: { params: { id: string } }): Promise<NextResponse<{message: string}>> => {
  try {

    const { id } = await params;

    const deleteCard = await prisma.user.delete({
      where: {
        id: parseInt(id)
      }
    })

    if (!deleteCard) {
      return NextResponse.json({message: "User not found"}, {status: 404});
    }

    return NextResponse.json({message: "Delete user successfully"}, {status: 200});

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}