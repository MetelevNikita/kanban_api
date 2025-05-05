import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// bootsatrap

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";

// Provider

import { StoreProvider } from "@/app/lib/StoreProvider";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
    <html lang="en">
      <body>
        <Container>

          {children}

        </Container>
      </body>
    </html>
    </StoreProvider>
  );
}
