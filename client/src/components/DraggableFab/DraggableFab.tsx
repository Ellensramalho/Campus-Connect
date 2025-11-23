"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { SidebarMob } from "../Sidebar/SidebarMob";
import { Plus } from "lucide-react";

export default function DraggableFab() {
  const constraintsRef = useRef(null);
  const [open, setOpen] = useState(false);

  return (
    <>
    <SidebarMob open={open} setOpen={setOpen} />
    <div
      className="block md:hidden fixed z-[100] inset-0 pointer-events-none"
      ref={constraintsRef}
    >
      <motion.button
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.2}
        onClick={() => setOpen(true)}
        className="
          pointer-events-auto
          w-10 h-10 rounded-full
          opacity-80
          bg-blue-600 text-white
          flex items-center justify-center
          shadow-xl
          cursor-pointer
        "
      >
        <Plus />
      </motion.button>
    </div>
    </>
  );
}
