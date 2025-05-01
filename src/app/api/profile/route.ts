import { NextResponse } from "next/server";

//

import { PrismaClient } from "@/../generated/prisma/client";
const prisma = new PrismaClient();

// types

import { ProfileType } from "@/types/types";



export const GET = async (): Promise<NextResponse<ProfileType[]> | {message: string} | unknown>  => {
  try {

    const profiles = await prisma.profile.findMany({});

    if(profiles.length < 1) {
      return NextResponse.json([], { status: 200 })
    }

    return NextResponse.json(profiles, {status: 200})

  } catch (error: unknown) {

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: errorMessage }, { status: 500 });

  }
}