"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";

interface ISettingsGroupsProps {
  title: string | undefined;
  description: string | undefined;
}

export const SettingsGroups = ({
  title,
  description,
}: ISettingsGroupsProps) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  return (
    <div>
      <form 
        className="flex flex-col justify-center items-center"
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
