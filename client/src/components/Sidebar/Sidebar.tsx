"use client";

import { MdGroups, MdOutlineGroupAdd } from "react-icons/md";
import { IoSchoolSharp } from "react-icons/io5";
import { FaPlusCircle } from "react-icons/fa";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Dialogs } from "../Dialog/Dialog";
import { useAuthContext } from "@/contexts/AuthContext";

const title = {
  value: "Adicionar Postagem",
  icon: <FaPlusCircle />,
};

const titleGrout = {
  value: "Adicionar Turma",
  icon: <MdOutlineGroupAdd />,
};

export function Sidebar() {
  const { user } = useAuthContext();

  return (
    <Command className="rounded-lg border shadow-md md:w-[350px]">
      <CommandInput placeholder="Busque por atalhos..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {user?.role === "professor" && (
          <>
            <CommandGroup heading="Postagens">
              <CommandItem>
                <Dialogs
                  type="createPost"
                  title="Nova Postagem"
                  label="Post"
                  botton={title}
                />
              </CommandItem>
            </CommandGroup>
            <CommandGroup heading="Turmas">
              <CommandItem>
                <Dialogs
                  type="createGroup"
                  title="Nova Turma"
                  label="Descrição"
                  botton={titleGrout}
                />
              </CommandItem>
              <CommandItem>
                <MdGroups />
                <span>Minhas turmas</span>
              </CommandItem>
              <CommandItem>
                <IoSchoolSharp />
                <span>Tarefas</span>
              </CommandItem>
            </CommandGroup>
          </>
        )}

        {
          user?.role === "estudante" && (
            <CommandGroup>
              <CommandItem>
                <span>Minhas turmas</span>
              </CommandItem>
            </CommandGroup>
          )
        }

        <CommandSeparator />
        <CommandGroup heading="Tarefas / Atividades Pendentes">
          <CommandItem>- 2 tarefas pendentes</CommandItem>
          <CommandItem>- 2 tarefas pendentes</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
