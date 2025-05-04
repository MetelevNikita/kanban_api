import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// bootsatrap

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Container>

          {children}

        </Container>
      </body>
    </html>
  );
}
