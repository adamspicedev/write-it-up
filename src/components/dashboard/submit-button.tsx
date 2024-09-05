"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface SubmitButtonsProps {
  text: string;
  className?: string;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
}

const SubmitButton = ({ text, className, variant }: SubmitButtonsProps) => {
  const { pending } = useFormStatus();

  return pending ? (
    <Button disabled className={cn("w-fit", className)} variant={variant}>
      <Loader2 className="mr-2 size-4 animate-spin" />
      Please Wait...
    </Button>
  ) : (
    <Button className={cn("w-fit", className)} variant={variant} type="submit">
      {text}
    </Button>
  );
};

export default SubmitButton;
