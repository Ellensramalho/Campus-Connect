"use client";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { LoadingPage } from "@/components/Loading/LoadingPage";
import { NotFound } from "@/components/NotFound/NotFound";
import { PostCard } from "@/components/PostCard/PostCard";
import { useActionContext } from "@/contexts/ActionsContext";
import { useAuthContext } from "@/contexts/AuthContext";
import { useEffect } from "react";

export default function MyPosts() {
    const { token } = useAuthContext();
    const { listMyPosts, myPosts, loadingAction } = useActionContext();
  
    useEffect(() => {
      listMyPosts(token);
  
    }, [])
  
    if (loadingAction) return <LoadingPage />;
  
    if (myPosts?.length == 0 || myPosts === null) {
      return (
        <NotFound text="Você não tem postagens..." />
      );
    }

  return (
      <div className="flex flex-col justify-between items-center">
        <h1 className="text-2xl my-10">Minhas Postagens</h1>
        <div className="w-full flex justify-center">
          {Array.isArray(myPosts) && myPosts?.map((myPost, index) => (
            <PostCard
              key={`${myPost.id}_${index}`}
              title={myPost.title}
              content={myPost.content}
              created_at={myPost.created_at}
              likes_count={myPost.likes_count}
              author={myPost.user}
              postId={myPost.id}
              tagsPost={myPost.tags}
              liked_by_me={myPost.liked_by_me}
            />
          ))}
        </div>
      </div>
    );
}
