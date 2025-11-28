"use client";

import { responseComment } from "@/api/posts";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuthContext } from "@/contexts/AuthContext";
import { IComment } from "@/types"
import { useState } from "react";
import { FiSend } from "react-icons/fi";
import { GrSend } from "react-icons/gr";

interface IFormResProps {
    comment: IComment;
    openSend: number;
}

export const FormResponse = ({ comment }: IFormResProps) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [content, setContent] = useState<string>("");

    const { token } = useAuthContext();

    const handleResponse = async () => {
        setLoading(true);
        try{
            await responseComment(comment.id, content, token);
        }
        finally{
            setLoading(false);
        }
    }

    return(
        <div className="flex w-full gap-3">
            <Input
                placeholder={`Sua resposta para ${comment.user.name}`}
                onChange={(e) => setContent(e.target.value)}
            />

            <Button 
                variant={"outline"} 
                className="cursor-pointer"
                onClick={() => handleResponse()}
            >
                {loading ? <GrSend /> : <FiSend className="size-5" />}
            </Button>
        </div>
    )
}