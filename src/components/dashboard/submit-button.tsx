"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface SubmitButtonsProps {
  name?: string;
  value?: string;
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

const SubmitButton = ({
  name,
  value,
  text,
  className,
  variant,
}: SubmitButtonsProps) => {
  const { pending } = useFormStatus();

  return pending ? (
    <Button
      name={name}
      value={value}
      disabled
      className={cn("w-fit", className)}
      variant={variant}
    >
      <Loader2 className="mr-2 size-4 animate-spin" />
      Please Wait...
    </Button>
  ) : (
    <Button
      name={name}
      value={value}
      className={cn("w-fit", className)}
      variant={variant}
      type="submit"
    >
      {text}
    </Button>
  );
};

export default SubmitButton;
