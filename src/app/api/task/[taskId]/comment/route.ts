import { NextResponse } from "next/server";

// 

import { PrismaClient } from "@/../generated/prisma/client";
import { TaskType } from "@/types/types";


const prisma = new PrismaClient();


export const POST = async (req: Request, context: {params: any}): Promise<NextResponse<TaskType | {message: string}>> => {
    try {

    const { taskId } = await context.params
    const {author, text, img} = await req.json()

    console.log(author, text, img)

    const newComment = await prisma.task.update({
        where: {
            id: parseInt(taskId)
        },
        data: {
            comment: {
                create: {
                    author,
                    text,
                    img
                }
            }
        }
    })

    console.log(newComment)

    if(!newComment) {
        return NextResponse.json({message: `error creating comment`}, {status: 500})
    }

    return NextResponse.json({message: "success"}, {status: 200})
        
    } catch (error: Error | unknown | any) {
        return NextResponse.json({message: `error ${error.message}`})
        
    }
}