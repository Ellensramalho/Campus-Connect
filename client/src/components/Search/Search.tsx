import { SearchStudents } from "@/api/groups";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuthContext } from "@/contexts/AuthContext";
import { IUser } from "@/types";
import { Search, User } from "lucide-react";
import React, { useState } from "react";
import { Spinner } from "../ui/spinner";
import { DetailsUser } from "./DetailsUser/DetailsUser";

export function SearchPerson() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { token } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    try {
      e.preventDefault();

      const data = await SearchStudents(token, query);

      setUsers(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-full hover:bg-blue-600! cursor-pointer gap-0 flex-col"
        >
          <Search className="size-6" />
          <span>Pesquisar</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Buscar usuários</SheetTitle>
          <SheetDescription>Busque por usuários e conecte-se</SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row justify-center items-end gap-1.5">
            <div className="grid gap-3">
              <Label htmlFor="sheet-demo-name">Name</Label>
              <Input
                id="sheet-demo-name"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Button variant={"outline"} className="cursor-pointer">
              <Search />
            </Button>
          </div>
        </form>

        <div className="w-full">
          {loading ? (
            <span className="flex justify-center items-center h-100">
              <Spinner />
            </span>
          ) : (
            users.map((u) => (
              <div className="w-full flex m-1" key={u.id}>
                <DetailsUser user={u} />
              </div>
            ))
          )}
        </div>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
