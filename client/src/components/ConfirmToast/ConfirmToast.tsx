import React from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";

interface IConfirmProps {
  icon: React.ReactNode;
  text: string;
  label: string;
  description: string;
  message: string;
  onClick: () => Promise<void>;
  loading: boolean;
  action: string;
}

export const ConfirmToast = ({
  icon,
  text,
  onClick,
  label,
  description,
  message,
  loading,
  action,
}: IConfirmProps) => {
  return (
    <Button
      variant={"ghost"}
      className="cursor-pointer w-full justify-start"
      onClick={() =>
        toast(message, {
          description: description,
          action: {
            label: label,
            onClick: () => onClick(),
          },
        })
      }
    >
      {loading ? (
        <span>
          <Spinner />
          {action}
        </span>
      ) : (
        <>
          {icon}
          {text}
        </>
      )}
    </Button>
  );
};
