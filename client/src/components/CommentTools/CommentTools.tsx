"use client";

import { MoreHorizontalIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BiPencil, BiTrash } from "react-icons/bi";
import { Dialogs } from "../Dialog/Dialog";
import { deleteComment, deletePost } from "@/api/posts";
import { useAuthContext } from "@/contexts/AuthContext";
import { useActionContext } from "@/contexts/ActionsContext";
import { toast } from "sonner";
import { ConfirmToast } from "../ConfirmToast/ConfirmToast";
import { useState } from "react";

interface ICommentToolsProps {
  ID: number;
  content?: string;
  post_id?: number | undefined;
  isPost: boolean;
  titlePost?: string; // Para editar
  tagsPost?: string[];
}

const title = {
  value: "Editar",
  icon: <BiPencil />,
};

export function CommentTools({
  ID,
  content,
  post_id,
  isPost,
  titlePost,
  tagsPost,
}: ICommentToolsProps) {
  const { token } = useAuthContext();
  const { listPosts, listComments, listMyPosts } = useActionContext();
  const [loading, setLoading] = useState<boolean>(false);

  // Deletar postagem caso seja isPost
  const handleDeletePost = async () => {
    setLoading(true);
    try{
      await deletePost(ID, token);
      await listPosts(token);
      await listMyPosts(token);
      toast.success("Postagem deletada com sucesso");
    }
    finally{
      setLoading(false);
    }

  };

  // Deletar comentário
  const handleDeleteComment = async () => {
    await deleteComment(ID, token);
    await listComments(post_id, token);
    toast.success("Comentário deletado com sucesso");
  };

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            className="cursor-pointer"
            variant="ghost"
            aria-label="Open menu"
            size="icon-sm"
          >
            <MoreHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="end">
          <DropdownMenuGroup>
            {/* Se for aberto por uma postagem */}
            {isPost ? (
              <>
              {/* Botão de confirmação para deletar */}
                <ConfirmToast
                  text="Excluir"
                  icon={<BiTrash />}
                  description="Deseja excluir a postagem?"
                  message="Excluir postagem"
                  label="Sim"
                  onClick={handleDeletePost}
                  action="Deletando"
                  loading={loading}
                />

                <div className="cursor-pointer">
                  <Dialogs
                    tagsPost={tagsPost}
                    titlePost={titlePost}
                    isPost={true}
                    title="Edição de Postagem"
                    label="Conteúdo"
                    botton={title}
                    content={content}
                    ID={ID}
                  />
                </div>
              </>
            ) : (
              <>
                <Button
                  variant={"ghost"}
                  className="cursor-pointer w-full justify-start"
                  onClick={() => handleDeleteComment()}
                >
                  <BiTrash />
                  Excluir
                </Button>
                <div className="cursor-pointer">
                  <Dialogs
                    isPost={false}
                    title="Edição de comentário"
                    label="Comentário"
                    botton={title}
                    content={content}
                    ID={ID}
                    post_id={post_id}
                  />
                </div>
              </>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
