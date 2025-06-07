import { NextResponse } from "next/server";

// prisma

import { PrismaClient } from '@/../generated/prisma/client'
const prisma = new PrismaClient();

// types

import { BoardTypes } from "@/types/types";


export const GET = async (req: Request, context: {params: {id: string}}): Promise<NextResponse<BoardTypes | [] | {message: string}>> => {
    try {

        const { id } = await context.params
        console.log('id', id)

        const singleBoard = await prisma.board.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if (!singleBoard) {
            return NextResponse.json({message: "No board found"})
        }

        return NextResponse.json(singleBoard, {status: 200})

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ message: errorMessage }, { status: 500 });

    } 
}


export const DELETE = async (req: Request, context: {params: {id: string}}): Promise<NextResponse<{message: string}>> => {
    try {

        const { id } = await context.params
        console.log('id', id)

        const deletedBoard = await prisma.board.delete({
            where: {
                id: parseInt(id)
            }
        })

        if (!deletedBoard) {
            return NextResponse.json({message: "Board not found"})
        }

        return NextResponse.json({message: "Board deleted successfully"}, {status: 200})

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ message: errorMessage }, { status: 500 });

    }
    
}