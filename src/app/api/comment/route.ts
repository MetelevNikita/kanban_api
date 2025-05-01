import { NextResponse } from "next/server";

//

import { PrismaClient } from "@/../generated/prisma/client";
const prisma = new PrismaClient();

// types

import { CommentType } from "@/types/types";



export const GET = async (): Promise<NextResponse<CommentType[] | {message: string}>> => {
  try {

    const comment = await prisma.comment.findMany()

    if(comment.length < 1) {
      return NextResponse.json([], {status: 404})
    }

    return NextResponse.json(comment, {status: 200})


  } catch (error: unknown) {

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: errorMessage }, { status: 500 });

  }
}