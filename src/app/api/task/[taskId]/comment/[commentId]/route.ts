import { NextResponse } from "next/server";

// 

import { PrismaClient } from "@/../generated/prisma/client";

// 

import { TaskType, CommentType } from "@/types/types";

const prisma = new PrismaClient();


export const GET = async (req: Request, context: {params: any}): Promise<NextResponse<CommentType | [] | {message: string}>> => {

    try {

        const { taskId, commentId } = await context.params;

        const task: TaskType | null = await prisma.task.findUnique({
            where: {
                id: parseInt(taskId),
            },
            include: {
                comment: true
            }
        })

        if (!task) {
            return NextResponse.json({ message: 'Task not found' }, { status: 404 });
        }

        const currentComment = task.comment.find((item: CommentType) => {
            console.log(item);
            return item.id == parseInt(commentId)
        })


        console.log(currentComment);


        if (!currentComment) {
            return NextResponse.json([], { status: 404 });
        }


        return NextResponse.json(currentComment, { status: 200 });

            
        } catch (error: Error | unknown) {
            return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
        }
        
}


export const PUT = async (req: Request, context: {params: any}): Promise<NextResponse<TaskType | any | {message: string}>> => {
    try {
        const { taskId, commentId } = await context.params;


        const { author, text, img } = await req.json();
        console.log(author, text, img);

        if (!author || !text || !img) {
            return NextResponse.json({ message: 'Author, text and img are required' }, { status: 400 });
        }

        const newComment = await prisma.task.update({
            where: {
                id: parseInt(taskId),
            },
            data: {
                comment: {
                    create: {
                        author,
                        text,
                        img
                    }
                }
            },
            
        })


        if (!newComment) {
            return NextResponse.json({ message: 'Task not found' }, { status: 404 });
        }

        return NextResponse.json(newComment, { status: 200 });



    
    } catch (error: Error | unknown) {
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}


export const DELETE = async (req: Request, context: {params: any}): Promise<NextResponse<TaskType[] | {message: string}>> => {
    try {

        const { taskId, commentId } = await context.params;

        const deletedTask: TaskType | any = await prisma.task.update({
            where: {
                id: parseInt(taskId),
            },
            data: {
                comment: {
                    delete: {
                        id: parseInt(commentId)
                        }
                    }
                }
        })

        console.log(deletedTask);
        
        if  (!deletedTask) {
            return NextResponse.json({ message: 'Comment not found' }, { status: 404 });
        }

        return NextResponse.json({message: `Task ${taskId} delete comment ${commentId}`}, { status: 200 });
                    
        
    } catch (error: Error | unknown | any) {
        return NextResponse.json({ message: `Something went wrong - ${error.message}` }, { status: 500 });
    }
}