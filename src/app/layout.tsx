import type { Metadata } from "next";
import "./globals.css";

// fonts

import { Montserrat } from "next/font/google";

// bootsatrap

import 'bootstrap/dist/css/bootstrap.css';
import { Container } from "react-bootstrap";


const montserrat = Montserrat({ subsets: ['latin'] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en" className={montserrat.className}>
      <body>
        <Container fluid style={{padding: '0px'}}>

          {children}

        </Container>
      </body>
    </html>

  );
}
