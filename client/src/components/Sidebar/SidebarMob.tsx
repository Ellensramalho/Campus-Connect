import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Sidebar } from "./Sidebar"


interface SidebarProp {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export function SidebarMob({ open, setOpen }: SidebarProp) {

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="left" className="z-[150]">
        
        <SheetHeader>
          <SheetTitle>O que deseja fazer?</SheetTitle>
        </SheetHeader>

        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <Sidebar />
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Fechar</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
