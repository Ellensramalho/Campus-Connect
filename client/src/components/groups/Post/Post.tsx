"use client";

import { useActionContext } from "@/contexts/ActionsContext";
import { useAuthContext } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { ModalPosts } from "../modal/Modal";

interface IPostsProps {
  group_id: number;
}

export function Post({ group_id }: IPostsProps) {
  const { token } = useAuthContext();
  const { challenge, listChallenges } = useActionContext();

  useEffect(() => {
    listChallenges(token, group_id);
  }, []);

  return (
    <div className="space-y-4">
      {challenge?.map((c) => (
        <div
          key={c.id}
          className="
          rounded-xl border bg-card text-card-foreground shadow-sm 
          p-5 flex flex-col gap-3 hover:shadow-md transition-shadow
        "
        >
          {/* Cabeçalho */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">{c.title}</h2>
              <p className="text-sm text-muted-foreground">
                por {c.teacher.user.name}
              </p>
            </div>

            {/* Badge de XP */}
            <div
              className="
              px-3 py-1 rounded-full text-xs font-medium 
              bg-blue-500/10 text-blue-600 dark:text-blue-400 dark:bg-blue-400/10
            "
            >
              {c.xp} XP
            </div>
          </div>

          {/* Descrição */}
          <p className="text-sm text-muted-foreground">{c.description.slice(0, 10)}...</p>

          {/* Rodapé */}
          <div className="flex items-center justify-end">
            <ModalPosts author={c.teacher.user.name} dataXP={c.xp} descriptionChallenge={c.description} titleChallenge={c.title} isEnterChallenge />
          </div>
        </div>
      ))}
    </div>
  );
}
