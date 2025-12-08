"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useActionContext } from "@/contexts/ActionsContext";
import { useAuthContext } from "@/contexts/AuthContext";
import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";

interface ISettingsGroupsProps {
  title: string | undefined;
  description: string | undefined;
  group_id: number;
}

export const SettingsGroups = ({
  title,
  description,
  group_id
}: ISettingsGroupsProps) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const { updateGroup } = useActionContext();
  const { token } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();

    const data = await updateGroup(token, newTitle, newDescription, group_id);

    console.log(data);

  }

  return (
    <div>
      <form 
        className="flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
        <div className="grid w-full md:w-100 gap-4 mt-3">
          <h1 className="text-2xl">Dados da turma</h1>
          <hr />
          <div className="grid gap-3">
            <Label htmlFor="titulo">Título</Label>
            <Input
              id="titulo"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Título do desafio"
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="conteudo">Conteúdo</Label>
            <Textarea
              id="conteudo"
              placeholder="Fale mais sobre..."
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>
          <div className="w-full">
            <Button variant={"outline"} className="w-full cursor-pointer">Salvar</Button>
          </div>
        </div>
      </form>
    </div>
  );
};
