import { Button } from "@/components/ui/button";
import { IUser } from "@/types";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FormResponse } from "../FormResponse/FormResponse";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { User } from "lucide-react";
import { convertDate } from "@/services/formateDate";
import { useAuthContext } from "@/contexts/AuthContext";
import dynamic from "next/dynamic";
import { likeComment } from "@/api/posts";
import { useEffect, useState } from "react";
import { Responses } from "../Responses/Responses";
import Image from "next/image";

const Markdown = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default.Markdown),
  {
    ssr: false,
  }
);

const PostTools = dynamic(() => import("../../PostTools/PostTools"), {
  ssr: false,
});

interface ICardCommentProps {
  id: string;
  content: string;
  createdAt: string;
  likes: number;
  author: IUser;
  liked: boolean;
  postId: string;
  comment: any;
  postAuthor: IUser
}

export const CardComment = ({
  postId,
  id,
  comment,
  content,
  createdAt,
  liked,
  likes,
  author,
  postAuthor
}: ICardCommentProps) => {
  const [openSendId, setOpenSendId] = useState<string | null>(null);
  const [openRespId, setOpenRespId] = useState<string | null>(null);
  const [loadResps, setLoadResp] = useState<boolean>(false);
  const [like, setLike] = useState<boolean>(liked);
  const [likeCounts, setLikeCounts] = useState<number>(likes);

  const { user, token } = useAuthContext();

  // Dar like nos comentários
  const handleLike = async (comment_id: string) => {
    if (like) {
      setLike(false);

      setLikeCounts((prev) => prev - 1);

      const data = await likeComment(user?.id, comment_id, token);

      console.log(data);
    } else {
      setLike(true);

      const data = await likeComment(user?.id, comment_id, token);

      setLikeCounts((prev) => prev + 1);

      console.log(data);
    }
  };

  // Abrir respostas
  const handleOpenResps = (comment_id: string) => {
    setOpenRespId(openRespId === comment_id ? null : comment_id);
  };

  // Abrir Input para responder o comentário
  const handleOpenSend = (comment_id: string) => {
    setOpenSendId(openSendId === comment_id ? null : comment_id);
  };

  return (
    <>
      <div className="p-3 rounded-lg bg-secondary">
        <span className="flex justify-between">
          <div className="flex py-3 items-center gap-2">
            {author?.avatarUrl && author.avatarUrl.trim().length > 0  ? (
              <div className="flex justify-center my-3.5 items-center h-20">
                <Image
                  className="rounded-full"
                  src={author.avatarUrl}
                  width={60}
                  height={60}
                  alt="perfil"
                />
              </div>
            ) : (
              <div className="flex justify-center items-center h-20">
                <User className="size-15" />
              </div>
            )}
            <div className="text-sm flex flex-col font-semibold">
              <span>{author.name}</span>
              <span className="font-light">{convertDate(createdAt)}</span>
            </div>
          </div>
          {author.id === user?.id && (
            <PostTools
              id={id}
              type="editComment"
              content={content}
              post_id={postId}
            />
          )}
        </span>
        <Markdown
          source={content}
          style={{ whiteSpace: "pre-wrap", backgroundColor: "transparent" }}
        />

        {/* Botões de (like, responder e respostas) */}
        <div className="mt-5 flex flex-col md:flex-row items-start md:items-center">
          <div className="flex">
            <Button
              variant={"ghost"}
              className="cursor-pointer active:bg-gray-200 active:text-blue-600"
              onClick={() => handleLike(id)}
            >
              {like ? (
                <BiSolidLike className="size-6 text-blue-600 transition-all duration-200 transform scale-110 animate-like" />
              ) : (
                <BiLike className="size-6 transition-all duration-200 transform hover:scale-110" />
              )}
              {likeCounts}
            </Button>
            <Button
              variant={"ghost"}
              className="cursor-pointer"
              onClick={() => handleOpenSend(id)}
            >
              {openSendId === id ? (
                <span>Cancelar</span>
              ) : (
                <span>Responder</span>
              )}
            </Button>
          </div>

          {/* Input para responder comentário */}
          {openSendId === id && (
            <FormResponse openSend={openSendId} comment={comment} />
          )}
        </div>

        {/* Respostas */}
        <hr />
        <Button
          variant={"ghost"}
          className="px-4 mt-3 flex cursor-pointer hover:bg-blue-500 hover:text-white"
          onClick={() => {
            handleOpenResps(id);
            setLoadResp((prev) => !prev);
          }}
        >
          <span className="flex items-center gap-2">
            Respostas
            {openRespId === id ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </span>
        </Button>
        {openRespId === id && (
          <Responses loadReps={loadResps} openResps={openRespId} comment={id} />
        )}
      </div>
    </>
  );
};
