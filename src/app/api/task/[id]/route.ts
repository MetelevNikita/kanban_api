import { NextResponse } from "next/server";

// prisma

import { PrismaClient } from "@/../generated/prisma/client";
const prisma = new PrismaClient();

// type

import { UserType, TaskType } from "@/types/types";


// id при изменении должен быть именно таски приходящего с фронта



export const PUT = async (req: Request, { params }: { params: { id: string } }): Promise<NextResponse<TaskType | {message: string}>> => {
  try {

    const { id } = await params;
    const { title, description, author, status } = await req.json();

    if(!title || !description || !author || !status) {
      return NextResponse.json({message: "no empty fields"}, {status: 400})
    }


    const updateTask = await prisma.task.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
        description,
        status
      },
      include: {
        comment: true
      }

    })

    if(!updateTask) {
      return NextResponse.json({message: "error update task"}, {status: 500})
    }

    return NextResponse.json({message: `update task ${id} success`}, {status: 200});


  } catch (error: unknown) {

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: errorMessage }, { status: 500 });

  }
}



// id при удаленни должен быть именно таски приходящего с фронта



export const DELETE = async (req: Request, { params }: { params: { id: string } }): Promise<NextResponse<{message: string}>> => {
  try {
    const { id } = await params;

    if(!id) {
      return NextResponse.json({message: "no empty fields"}, {status: 400})
    }

    const deleteTask = await prisma.task.delete({
      where: {
        id: parseInt(id),
      }
    })


    if(!deleteTask) {
      return NextResponse.json({message: "error delete task"}, {status: 500})
    }

    return NextResponse.json({message: `delete task ${id}`}, {status: 200});


  } catch (error: unknown) {

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: errorMessage }, { status: 500 });

  }
}
