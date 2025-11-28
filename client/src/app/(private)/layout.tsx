"use client";

import Footer from "@/components/Footer/Footer";
import DraggableFab from "@/components/DraggableFab/DraggableFab";
import PrivateGuard from "./privateRoutes";
import { NavbarClient } from "@/components/Navbar/Navbar";


export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return(
    <PrivateGuard>
      <NavbarClient />
      <div className="mt-10 pt-[var(--header-height)]">
        {children}
        <DraggableFab />
      </div>
      <Footer />
    </PrivateGuard>
  ) 
}