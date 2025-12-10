"use client";

import { LoadingPage } from "@/components/Loading/LoadingPage";
import { NotFound } from "@/components/NotFound/NotFound";
import { PostCard } from "@/components/PostCard/PostCard";
import { useActionContext } from "@/contexts/ActionsContext";
import { useAuthContext } from "@/contexts/AuthContext";
import { useEffect } from "react";

export default function PostsSaved() {
  const { token } = useAuthContext();
  const { listSavedPosts, postSaved, loadingAction } = useActionContext();

  useEffect(() => {
    listSavedPosts(token);
  }, []);

  return (
    <div className="w-full">
      <span className="w-full flex text-2xl items-center justify-center">Postagens Salvas</span>
      <hr className="my-5" />
      <div className="grid md:grid-cols-2 grid-cols-1 gap-15 justify-center justify-items-center">
        {postSaved?.length == 0 || postSaved === null ? (
          <NotFound text="Nenhuma postagem salva..." />
        ) : (
          postSaved?.map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              content={post.content}
              created_at={post.createdAt}
              liked={post.liked}
              likes_count={post.likes}
              author={post.author}
              postId={post.id}
              saved={post.saved}
            />
          ))
        )}
      </div>
    </div>
  );
}
