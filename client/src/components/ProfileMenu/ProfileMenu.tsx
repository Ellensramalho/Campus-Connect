"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuthContext } from "@/contexts/AuthContext";
import { User } from "lucide-react";
import React, { useState } from "react";
import { BiExit } from "react-icons/bi";
import { Spinner } from "../ui/spinner";
import Image from "next/image";

type listItems = {
  item: string;
  icon: React.ReactNode;
  onClick?: () => void;
};

interface IProfileMenuProps {
  items: listItems[];
  iconProfile?: React.ReactNode | string;
  shrunk?: boolean;
}

export function ProfileMenu({ items, iconProfile, shrunk }: IProfileMenuProps) {
  const { logout, user, loading } = useAuthContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleRedirect = async (item: listItems) => {
    if (item.onClick) {
      item.onClick();
    }

    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <div className="cursor-pointer w-[100px] flex flex-col items-center justify-center">
          {
            user?.avatarUrl ? (
              <Image 
              className="rounded-full"
                src={user.avatarUrl} 
                width={40}
                height={40}
                alt="Perfil"
              />
            ) : (
              <User />
            )
          }
        </div>
      </SheetTrigger>
      <SheetContent className="z-150 overflow-y-auto py-2.5">
        <SheetHeader>
          <SheetTitle>Meu perfil</SheetTitle>
          <div className="flex flex-col mt-2 gap-1">
            {loading ? (
              <span>
                <Spinner />
                Aguarde...
              </span>
            ) : (
              <>
                {user?.avatarUrl ? (
                  <div className="flex justify-center my-3.5 items-center h-20">
                    <Image className="rounded-full" src={user.avatarUrl} width={100} height={100} alt="perfil" />
                  </div>
                ) : (
                  <div className="flex justify-center items-center h-20">
                    <User className="size-15" />
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="font-semibold">{user?.name_user}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {user?.email}
                </span>
                <span className="text-sm text-muted-foreground">
                  {user?.role}
                </span>
                <span className="text-sm text-muted-foreground">
                  Quantidade de XP:{" "}
                  <span className="text-blue-500">{user?.xp}</span>
                </span>
                <hr />
                <span className="mt-3">
                  <strong>Biografia:</strong>
                  {user?.biography === "" || user?.biography === undefined
                    ? " Sem biografia"
                    : " " + user?.biography}
                </span>
              </>
            )}
          </div>
        </SheetHeader>
        <hr />
        <div className="flex justify-around">
          <span>Seguidores: {user?.followers}</span>
          <span>Seguindo: {user?.following}</span>
        </div>
        <div className="mt-6 flex flex-col gap-3">
          {items.map((item, index) => (
            <div key={index} className="grid gap-3">
              <Button
                className="justify-start cursor-pointer"
                variant={"ghost"}
                onClick={() => handleRedirect(item)}
              >
                {item.icon} {item.item}
              </Button>
            </div>
          ))}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button
              onClick={logout}
              className="cursor-pointer"
              variant="destructive"
            >
              Sair
              <BiExit />
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
