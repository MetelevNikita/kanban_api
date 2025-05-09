import { NextResponse } from "next/server";

//

import { PrismaClient } from "@/../generated/prisma/client";
const prisma = new PrismaClient();

// types

import { CommentType, TaskType } from "@/types/types";



//  id в пост запросе должен быть id поста полученный с фронта


export const POST = async (request: Request, { params }: { params: { id: string } }): Promise<NextResponse<TaskType | {message: string}>> => {
  try {

    const { id } = await params;
    const { text, author  } = await request.json();

    console.log(id);

    const createComment = await prisma.task.update({
      where: {
        id: parseInt(id)
      },
      data: {
        comment: {
          create: {
            text: text,
            author: author
          }
        }
      },
      include: {
        comment: true
      }
    })

    console.log(createComment);

    if (!createComment) {
      return NextResponse.json({ message: "error creating comment" }, { status: 404 })
    }

    return NextResponse.json(createComment, { status: 200 })

  } catch (error: unknown) {

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: errorMessage }, { status: 500 });

  }
}


//  id в пост запросе должен быть id коммента полученный с фронта

export const PUT = async (request: Request, { params }: { params: { id: string } }): Promise<NextResponse<CommentType | {message: string}>> => {
  try {

    const { id } = await params;
    const { text, author } = await request.json();

    const updateComment = await prisma.comment.update({
      where: {
        id: parseInt(id)
      },
      data: {
        text: text,
        author: author
      }
    })


    if (!updateComment) {
      return NextResponse.json({ message: "error updating comment" }, { status: 404 })
    }

    return NextResponse.json({ message: `updating comment ${id}` }, { status: 200 })

  } catch (error: unknown) {

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: errorMessage }, { status: 500 });

  }



}



// id при удаленни должен быть именно комментария приходящего с фронта



export const DELETE = async (request: Request, { params }: { params: { id: string } }): Promise<NextResponse<CommentType | {message: string}> | any> => {
  try {

    const { id } = await params;

    const deleteComment = await prisma.comment.delete({
      where: {
        id: parseInt(id)
      }
    })

    console.log(deleteComment);

    if (!deleteComment) {
      return NextResponse.json({ message: "error deleting comment" }, { status: 404 })
    }

    return NextResponse.json({message: `delete comment ${id}`}, { status: 200 })


  } catch (error: unknown) {

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: errorMessage }, { status: 500 });

  }
}