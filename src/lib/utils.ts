import { Tag } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function randomUUID(): string {
  return crypto.randomUUID();
}

export const tagsAsOptions = (
  tags: Tag[],
): { value: string; label: string }[] => {
  return tags.map((tag) => ({
    value: tag.name,
    label: tag.name,
  }));
};
