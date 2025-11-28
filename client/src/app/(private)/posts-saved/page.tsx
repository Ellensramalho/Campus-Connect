"use client";

import { PostCard } from "@/components/PostCard/PostCard";
import { useActionContext } from "@/contexts/ActionsContext";
import { useAuthContext } from "@/contexts/AuthContext";
import { useEffect } from "react"

export default function PostsSaved() {

    const { token } = useAuthContext();
    const { listSavedPosts, postSaved } = useActionContext();

    useEffect(() => {
        listSavedPosts(token);
    }, []);

    return(
        <div>
            {
                postSaved?.map((post, index) => (
                    <PostCard
                        key={index}
                        title={post.title}
                        content={post.content}
                        created_at={post.created_at}
                        likes_count={post.likes_count}
                        author={post.user}
                        postId={post.id}
                        tagsPost={post.tags}
                        liked_by_me={post.liked_by_me}
                        
                    />
                ))
            }
        </div>
    )
}