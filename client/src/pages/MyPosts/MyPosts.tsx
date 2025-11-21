"use client";

import { LoadMyPosts } from "@/api/posts";
import { LoadingPage } from "@/components/Loading/LoadingPage";
import { PostCard } from "@/components/PostCard/PostCard";
import { useActionContext } from "@/contexts/ActionsContext";
import { useAuthContext } from "@/contexts/AuthContext";
import { IMyPost } from "@/types";
import { useEffect, useState } from "react";

export const MyPostsPage = () => {

  const { token } = useAuthContext();
  const { listMyPosts, myPosts, loadingAction } = useActionContext();

  useEffect(() => {
    listMyPosts(token);
  }, [])

  if (loadingAction) return <LoadingPage />;

  if (myPosts?.length == 0) {
    return (
      <span className="text-2xl text-gray-500 h-50 flex flex-col justify-center items-center">
        Você ainda não fez nenhuma postagem
      </span>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center">
      {Array.isArray(myPosts) && myPosts?.map((myPost, index) => (
        <PostCard
          key={`${myPost.ID}_${index}`}
          title={myPost.title}
          content={myPost.content}
          created_at={myPost.created_at}
          likes_count={myPost.likes_count}
          author={myPost.User}
          postId={myPost.ID}
          tagsPost={myPost.tags}
          liked_by_me={myPost.liked_by_me}
        />
      ))}
    </div>
  );
};
