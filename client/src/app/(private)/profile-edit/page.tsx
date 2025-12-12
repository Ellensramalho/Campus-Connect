"use client";

import { EditData } from "@/api/user";
import { AccountCategory } from "@/components/AccountCategory/AccountCategory";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuthContext } from "@/contexts/AuthContext";
import Image from "next/image";
import React, { useState } from "react";

export default function ProfileEdit() {
  const { user } = useAuthContext();

  const [newName, setNewName] = useState<string | undefined>(user?.name);
  const [newNameUser, setNewNameUser] = useState<string | undefined>(
    user?.name_user
  );
  const [biography, setBiography] = useState<string | "">("");
  const [avatar, setAvatar] = useState<string | "">("");
  const [newPass, setNewPass] = useState<string | "">("");
  const [repeatPass, setRepeatPass] = useState<string | "">("");

  const { token, loadProfile } = useAuthContext();

  // Enviando dados para o backend
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = await EditData(newName, newNameUser, biography, token);
    await loadProfile();
    console.log(data);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="rounded-2xl flex flex-col items-center w-full md:w-[80%] p-5 border">
        <h1 className="text-center text-2xl">Meus dados</h1>
        <hr />
        <form className="w-full md:w-[50%]" onSubmit={handleSubmit}>
          <div>
            <div className="py-2">
              <label htmlFor="nome">Nome:</label>
              <Input
                placeholder="Nome"
                id="nome"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>
            <div className="py-2">
              <label htmlFor="nomeU">Nome de usuário:</label>
              <Input
                placeholder="Nome de usuário"
                id="nomeU"
                value={newNameUser}
                onChange={(e) => setNewNameUser(e.target.value)}
              />
            </div>
            <div className="py-2">
              <label htmlFor="bio">Biografia:</label>
              <Textarea
                id="bio"
                placeholder="Fale sobre você..."
                value={biography}
                onChange={(e) => setBiography(e.target.value)}
              />
            </div>
            <div className="py-2">
              <label htmlFor="avatar">Avatar:</label>
              <Input
                placeholder="link da imagem"
                id="avatar"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
              />
            </div>
            <hr className="my-2" />
            {/* <div className="py-2">
              <label htmlFor="nova_senha">Senha:</label>
              <Input
                  placeholder="Nova senha"
                  id="nova_senha"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
              />
            </div>
            <div className="py-2">
              <label htmlFor="repeat_senha">Repita a senha:</label>
              <Input
                  placeholder="Repita a senha"
                  id="repeat_senha"
                  value={repeatPass}
                  onChange={(e) => setNewPass(e.target.value)}
              />
            </div> */}
          </div>
          <div className="flex items-end justify-end">
            <Button
              className="bg-blue-500 w-full md:w-auto hover:bg-blue-600 cursor-pointer"
              type="submit"
            >
              Salvar
            </Button>
          </div>
        </form>
        {user?.role !== "professor" && user?.role !== "estudante" && (
          <>
            <hr className="my-2" />
            <div className="py-2">
              <h2 className="text-2xl">Mudar categoria de conta</h2>
              <div className="flex flex-col gap-3.5 md:flex-row items-center justify-between">
                <div>
                  <AccountCategory
                    src="/select_teacher.svg"
                    textButton="Professor"
                  />
                </div>
                <div>
                  <AccountCategory src="/student.png" textButton="Estudante" />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
