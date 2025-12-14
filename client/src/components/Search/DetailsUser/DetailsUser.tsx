"use client";

import { FollowUser } from "@/api/user";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { useAuthContext } from "@/contexts/AuthContext";
import { IUser } from "@/types";
import { User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

interface DetailsUserProps {
  user: IUser;
}

export function DetailsUser({ user }: DetailsUserProps) {
  const { token } = useAuthContext();
  const [loading, setLoading] = useState<boolean>(false);

  const handleFollow = async () => {
    setLoading(true);
    try {
      const res = await FollowUser(token, user.id);
      toast.success(res.msg ?? "Agora você está seguindo este usuário");
    } catch (err: any) {
      toast.error(err.response?.data?.error ?? "Erro ao seguir usuário");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full flex items-center gap-3 justify-start"
        >
          {user.avatarUrl ? (
            <Image
              src={user.avatarUrl}
              alt="avatar"
              width={32}
              height={32}
              className="rounded-full"
            />
          ) : (
            <User className="w-5 h-5" />
          )}
          {user.name}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Perfil</DialogTitle>
          <DialogDescription>
            {user.biography || "Sem biografia"}
          </DialogDescription>
          <span className="text-sm text-muted-foreground">{user.role}</span>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4">
          {user.avatarUrl ? (
            <Image
              src={user.avatarUrl}
              alt="avatar"
              width={80}
              height={80}
              className="rounded-full"
            />
          ) : (
            <User className="w-20 h-20" />
          )}

          <h1 className="text-2xl font-semibold">{user.name}</h1>

          <div className="w-full flex justify-around text-sm text-muted-foreground">
            <span>Seguindo: {user.following ?? 0}</span>
            <span>Seguidores: {user.followers ?? 0}</span>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleFollow}>
            {loading ? <Spinner /> : <span>Interagir</span>}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
