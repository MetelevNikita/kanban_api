"use client"


import "./../globals.css";

// fonts

import { Montserrat } from "next/font/google";

// bootsatrap

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";

// Provider

import { StoreProvider } from "@/app/lib/StoreProvider";

// components

import Header from "@/components/element/Header/Header";




const montserrat = Montserrat({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
        <Container fluid>
            <Header />

          {children}

        </Container>
    </StoreProvider>
  );
}
