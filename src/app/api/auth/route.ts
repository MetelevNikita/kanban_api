import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//

import { PrismaClient } from "@/../generated/prisma/client";
import { cookies } from "next/headers";
const prisma = new PrismaClient();

// types

export const POST = async (req:Request) => {
  try {

    const { email, password } = await req.json();

    console.log(email,password);

    // Check if the user already exists

    const checkUser = await prisma.user.findFirst({
      where: {
        email: email,
      }
    });

    if (!checkUser) {
      return NextResponse.json({ message: 'email not valid' }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, checkUser?.password || '');

    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid password' }, { status: 404 });
    }

    // Generate a JWT token for the new user

    const token = jwt.sign({ userId: checkUser?.id }, process.env.JWT_SECRET_KEY || '', { expiresIn: '1d' });

    // Send the JWT token as a response

    (await cookies()).set('token', token, {})

    return NextResponse.json('user is auth', { status: 200 });

  } catch (error: Error | unknown) {

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: errorMessage }, { status: 500 });

  }
}