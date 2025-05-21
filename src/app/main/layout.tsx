"use client"


import "./../globals.css";

// 

import { useState, createContext } from "react";
import { QueryClientProvider, QueryClient} from "@tanstack/react-query";

// fonts

import { Montserrat } from "next/font/google";

// bootsatrap

import 'bootstrap/dist/css/bootstrap-grid.css';
import { Container } from "react-bootstrap";


// components

import Header from "@/components/element/Header/Header";

const montserrat = Montserrat({ subsets: ['latin'] });



export const MenuContext = createContext({
  menuActive: '',
  setMenuActive: (value: any) => {
    return value
  }
})

export const RefreshContext = createContext({
  refresh: false,
  setRefresh: (value: any) => {
    return value
  }
})




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const queryClient = new QueryClient()


  const [menuActive, setMenuActive] = useState('')
  const [refresh, setRefresh] = useState(false);


  return (
    <QueryClientProvider client={queryClient}>
    <RefreshContext.Provider value={{refresh, setRefresh}}>
      <MenuContext.Provider value={{menuActive, setMenuActive}}>
        <Container fluid>
            <Header/>

          {children}

        </Container>
        </MenuContext.Provider>
      </RefreshContext.Provider>
      </QueryClientProvider>
  );
}
