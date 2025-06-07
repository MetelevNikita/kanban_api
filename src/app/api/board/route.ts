import { NextResponse } from "next/server";

// prisma

import { PrismaClient } from '@/../generated/prisma/client'
const prisma = new PrismaClient();

// type

import { BoardTypes } from "@/types/types";


export const GET = async (): Promise<NextResponse<BoardTypes[] | [] | {message: string}>> => {

    try {

        const board = await prisma.board.findMany();

        if (!board) {
            return NextResponse.json({ message: 'No tasks found.' }, { status: 404 });
        }

        if (board.length === 0) {
            return NextResponse.json([], { status: 404 });
        }

        return NextResponse.json(board, { status: 200 });

        
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ message: errorMessage }, { status: 500 });
    }
}



export const POST = async (req: Request): Promise<NextResponse<{message: string} | BoardTypes>> => {
    try {


        const { boardId, company, label, value, color, colorBoard } = await req.json();
        console.log(boardId, company, label, value, color, colorBoard)


        const newBoard = await prisma.board.create({
            data: {
                boardId: boardId,
                company: company,
                label: label,
                value: value,
                color: color,
                colorBoard: colorBoard
            }          
        })

        if (!newBoard) {
            return NextResponse.json({ message: 'Failed to create new board.' }, { status: 500 });
        }

        return NextResponse.json(newBoard, { status: 201 });

    } catch (error: unknown) {

        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ message: errorMessage }, { status: 500 });
        
    }
}