import type { Metadata } from "next";
import "./globals.css";

// fonts

import { Montserrat } from "next/font/google";

// bootsatrap

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";

// Provider

import { StoreProvider } from "@/app/lib/StoreProvider";




const montserrat = Montserrat({ subsets: ['latin'] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
    <html lang="en" className={montserrat.className}>
      <body>
        <Container fluid>

          {children}

        </Container>
      </body>
    </html>
    </StoreProvider>
  );
}
