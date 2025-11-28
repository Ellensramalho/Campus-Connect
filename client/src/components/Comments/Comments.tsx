"use client";

import { FiSend } from "react-icons/fi";
import { GrSend } from "react-icons/gr";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { FaRegCommentDots } from "react-icons/fa";
import { useActionContext } from "@/contexts/ActionsContext";
import { useAuthContext } from "@/contexts/AuthContext";
import { Spinner } from "../ui/spinner";
import { createComents, likeComment } from "@/api/posts";
import { convertDate } from "@/services/formateDate";
import { BiLike } from "react-icons/bi";
import { User2Icon } from "lucide-react";
import { Responses } from "./Responses/Responses";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useState } from "react";
import { FormResponse } from "./FormResponse/FormResponse";
import { LiaCommentsSolid } from "react-icons/lia";
import dynamic from "next/dynamic";

const PostTools = dynamic(
  () => import("../PostTools/PostTools"),
  { ssr: false }
);


interface ICommentsProps {
  post_id: number;
}

export function Comments({ post_id }: ICommentsProps) {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [loadingComments, setLoadingComments] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);

  const [openSendId, setOpenSendId] = useState<number | null>(null);
  const [openRespId, setOpenRespId] = useState<number | null>(null);
  const [loadResps, setLoadResp] = useState<boolean>(false);

  const { listComments, comment } = useActionContext();
  const { token } = useAuthContext();

  const { user } = useAuthContext();

  // Criar comentário
  const handleSend = async () => {
    setSending(true);
    try {
      if (!text.trim()) return;

      await createComents(text, post_id, token);
      await listComments(post_id, token);

      setText("");
    } finally {
      setSending(false);
    }
  };

  // Dar like nos comentários
  const handleLike = async (comment_id: number) => {
    const data = await likeComment(user?.id, comment_id, token);
    console.log(data);
  };

  // Abrir respostas
  const handleOpenResps = (comment_id: number) => {
    setOpenRespId(openRespId === comment_id ? null : comment_id);
  };

  // Abrir Input para responder o comentário
  const handleOpenSend = (comment_id: number) => {
    setOpenSendId(openSendId === comment_id ? null : comment_id);
  };

  return (
    <Drawer
      open={open}
      onOpenChange={async (isOpen) => {
        setOpen(isOpen);
        if (isOpen) {
          setLoadingComments(true);
          await listComments(post_id, token);

          setLoadingComments(false);
        }
      }}
    >
      <DrawerTrigger asChild>
        <div className="cursor-pointer flex gap-1.5">
          <FaRegCommentDots className="size-5" />
        </div>
      </DrawerTrigger>

      <DrawerContent className="p-0">
        {/* Header */}
        <DrawerHeader className="border-b">
          <DrawerTitle className="text-lg flex gap-1.5 justify-center items-center font-semibold">
            Comentários
            <LiaCommentsSolid className="size-6" />
          </DrawerTitle>
        </DrawerHeader>

        {/* Lista scrollável */}
        <div className="h-[60vh] overflow-y-auto px-4 py-3 space-y-4">
          {loadingComments ? (
            <div className="flex h-full gap-2.5 justify-center items-center">
              <Spinner className="size-8 text-blue-500" />
              <span>Carregando</span>
            </div>
          ) : (
            <>
              {comment?.length === 0 || comment === null && (
                <p className="text-sm text-muted-foreground">
                  Nenhum comentário ainda.
                </p>
              )}

              {comment?.map((c, index) => (
                <div
                  key={`${c.id}-${index}`}
                  className="p-3 rounded-lg bg-secondary"
                >
                  <span className="flex justify-between">
                    <div className="flex py-3 items-center gap-2">
                      <User2Icon className="size-6 md:size-8" />
                      <div className="text-sm flex flex-col font-semibold">
                        <span>{c.user.name}</span>
                        <span className="font-light">
                          {convertDate(c.created_at)}
                        </span>
                      </div>
                    </div>
                    {c.user.id === user?.id && (
                      <PostTools
                        ID={c.id}
                        type="editComment"
                        content={c.content}
                        post_id={post_id}
                      />
                    )}
                  </span>
                  <p className="text-sm">{c.content}</p>

                  {/* Botões de (like, responder e respostas) */}
                  <div className="mt-5 flex flex-col md:flex-row items-start md:items-center">
                    <div className="flex">
                      <Button
                        variant={"ghost"}
                        className="cursor-pointer"
                        onClick={() => handleLike(c.id)}
                      >
                        <BiLike className="size-6" />
                      </Button>
                      <Button
                        variant={"ghost"}
                        className="cursor-pointer"
                        onClick={() => handleOpenSend(c.id)}
                      >
                        {openSendId === c.id ? (
                          <span>Cancelar</span>
                        ) : (
                          <span>Responder</span>
                        )}
                      </Button>
                    </div>

                    {/* Input para responder comentário */}
                    {openSendId === c.id && (
                      <FormResponse
                        openSend={openSendId}
                        comment={c}
                      />
                    )}
                  </div>

                  {/* Respostas */}
                  <hr />
                  <Button
                    variant={"ghost"}
                    className="px-4 mt-3 flex cursor-pointer hover:bg-blue-500 hover:text-white"
                    onClick={() => { 
                      handleOpenResps(c.id);
                      setLoadResp((prev) => !prev)
                    }}
                  >
                    <span className="flex items-center gap-2">
                      Respostas
                      {openRespId === c.id ? (
                        <IoIosArrowUp />
                      ) : (
                        <IoIosArrowDown />
                      )}
                    </span>
                  </Button>
                  {
                    openRespId === c.id && (
                      <Responses loadReps={loadResps} openResps={openRespId} comment_id={c.id} />
                    )
                  }
                  
                </div>
              ))}
            </>
          )}
        </div>

        {/* Caixa de comentários fixa embaixo */}
        <div className="border-t p-3 flex items-center gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escreva um comentário..."
            className="flex-1 bg-muted p-2 rounded-md outline-none"
          />

          <Button
            className="cursor-pointer bg-blue-600 hover:bg-blue-700"
            onClick={handleSend}
            disabled={sending}
          >
            {sending ? <GrSend /> : <FiSend className="size-5" />}
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
