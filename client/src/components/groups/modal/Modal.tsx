import { CreateChallenge } from "@/api/groups";
import { MarkdownEditor } from "@/components/MdEditor/MdEditor";
import { Selects } from "@/components/Select/Select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useActionContext } from "@/contexts/ActionsContext";
import { useAuthContext } from "@/contexts/AuthContext";
import React, { useState } from "react";
import { toast } from "sonner";

import dynamic from "next/dynamic";

const Markdown = dynamic(() => import("@uiw/react-md-editor").then(mod => mod.default.Markdown), {
  ssr: false
});

interface IModalPostsProps {
  group_id?: number | undefined;
  titleChallenge?: string;
  descriptionChallenge?: string;
  isEnterChallenge?: boolean;
  dataXP?: number;
  author?: string;
}

export function ModalPosts({
  group_id,
  titleChallenge,
  descriptionChallenge,
  isEnterChallenge,
  dataXP,
  author,
}: IModalPostsProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState<string | undefined>("");
  const [type, setType] = useState("");
  const [xp, setXp] = useState(0);
  const [loading, setLoading] = useState(false);

  const { token } = useAuthContext();
  const { listChallenges } = useActionContext();

  const handleSubmitCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!group_id) {
      toast.error("Erro interno: group_id não encontrado.");
      return;
    }

    setLoading(true);

    if (!title || !description || !type) {
      toast.info("Preencha todos os campos.");
      setLoading(false);
      return;
    }

    try {
      const data = await CreateChallenge(
        token,
        group_id,
        title,
        description,
        type,
        xp
      );

      await listChallenges(token, group_id);

      toast.success(data.challenge);
    } catch (err) {
      toast.error("Erro ao criar desafio.");
    } finally {
      setLoading(false);

      // Limpa os campos APENAS no modo criar
      if (!isEnterChallenge) {
        setTitle("");
        setDescription("");
        setType("");
        setXp(0);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          {isEnterChallenge ? "Ver desafio →" : "Criar desafio"}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        {isEnterChallenge && (
          <>
            <DialogHeader>
              <DialogTitle>{titleChallenge}</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 mt-3">
              <span>Autor: {author}</span>
              <hr />
              <div>
                <span>Descrição: </span>
                <div className="border my-2.5 flex rounded-2xl p-5">
                  <Markdown source={descriptionChallenge} style={{ whiteSpace: "pre-wrap", backgroundColor: "transparent" }} />
                </div>
              </div>
              <span
                className="
              px-3 py-1 w-[50px] rounded-full text-xs font-medium 
              bg-blue-500/10 text-blue-600 dark:text-blue-400 dark:bg-blue-400/10
            "
              >
                {dataXP}XP
              </span>
            </div>

            <DialogFooter>
              <Button variant="outline" className="w-full mt-5">
                Enviar resposta
              </Button>
            </DialogFooter>
          </>
        )}

        {!isEnterChallenge && (
          <form onSubmit={handleSubmitCreate}>
            <DialogHeader>
              <DialogTitle>Criar um novo desafio</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 mt-3">
              <div className="grid gap-3">
                <Label htmlFor="titulo">Título</Label>
                <Input
                  id="titulo"
                  placeholder="Título do desafio"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="grid gap-3">
                <MarkdownEditor
                  setValue={setDescription}
                  textAreaName="description"
                  value={description}
                  labelText="Conteúdo"
                />
              </div>

              <Selects setType={setType} setXp={setXp} />
            </div>

            <DialogFooter>
              <Button type="submit" className="w-full mt-5" variant="outline">
                {loading ? (
                  <span className="flex items-center gap-1.5">
                    <Spinner />
                    Criando...
                  </span>
                ) : (
                  "Criar"
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
