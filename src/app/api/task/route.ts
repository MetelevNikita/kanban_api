import { NextResponse } from "next/server";

// prisma

import { PrismaClient } from "@/../generated/prisma/client";
const prisma = new PrismaClient();

// type

import { UserType, TaskType } from "@/types/types";

//


export const GET = async (): Promise<NextResponse<TaskType[] | {message: string}>>  => {

  try {

    const task = await prisma.task.findMany({
      include: {
        comment: true
      }
    });

    if(task.length < 1) {
      return NextResponse.json([], {status: 200});
    }
    return NextResponse.json(task, {status: 200});

  } catch (error: unknown) {

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: errorMessage }, { status: 500 });

  }

};







