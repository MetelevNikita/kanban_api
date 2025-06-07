import { NextResponse } from "next/server";

// prisma

import { PrismaClient } from "@/../generated/prisma/client";
const prisma = new PrismaClient();

// type

import { UserType, TaskType } from "@/types/types";


// id при изменении должен быть именно таски приходящего с фронта



export const GET = async (req: Request, { params }: { params: { taskId: string } }): Promise<NextResponse<TaskType | {message: string} | null>> => {
  try {
    const { taskId } = await params;

    if(!taskId) {
      return NextResponse.json({message: "now any card"}, {status: 400})
    }

      const task = await prisma.task.findUnique({
        where: {
          id: parseInt(taskId),
        },
        include: {
          comment: true
        }
    })

    return NextResponse.json(task, {status: 200});

  } catch (error) {
    return NextResponse.json({message: "error"}, {status: 500})
  }
}



export const PUT = async (req: Request, { params }: { params: { taskId: string } }): Promise<NextResponse<TaskType | {message: string}>> => {
  try {

    const { taskId } = await params;
    const { title, description, author, status } = await req.json();

    if(!title || !description || !author || !status) {
      return NextResponse.json({message: "no empty fields"}, {status: 400})
    }


    const updateTask = await prisma.task.update({
      where: {
        id: parseInt(taskId),
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

    return NextResponse.json({message: `update task ${taskId} success`}, {status: 200});


  } catch (error: unknown) {

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: errorMessage }, { status: 500 });

  }
}



// id при удаленни должен быть именно таски приходящего с фронта



export const DELETE = async (req: Request, { params }: { params: { taskId: string } }): Promise<NextResponse<{message: string}>> => {
  try {
    const { taskId } = await params;

    if(!taskId) {
      return NextResponse.json({message: "no empty fields"}, {status: 400})
    }

    const deleteTask = await prisma.task.delete({
      where: {
        id: parseInt(taskId),
      }
    })


    if(!deleteTask) {
      return NextResponse.json({message: "error delete task"}, {status: 500})
    }

    return NextResponse.json({message: `delete task ${taskId}`}, {status: 200});


  } catch (error: unknown) {

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: errorMessage }, { status: 500 });

  }
}


// 


export const PATCH = async (req: Request, { params }: { params: { taskId: string } }): Promise<NextResponse<TaskType | {message: string}>> => {

  try {

    const { taskId } = await params;
    const status= await req.json();
    console.log(status)

    const updateTask = await prisma.task.update({
      where: {
        id: parseInt(taskId),
      },
      data: {
        status: status
      }
      
    })

    console.log(updateTask)

    if(!updateTask) {
      return NextResponse.json({message: "error update task"}, {status: 500})
    }

    return NextResponse.json({message: 'status is update'}, {status: 200});


  } catch (error: unknown) {

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: errorMessage }, { status: 500 });


    }

}


