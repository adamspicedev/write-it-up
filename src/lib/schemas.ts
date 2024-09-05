import { JsonValue } from "@prisma/client/runtime/library";
import { JSONContent } from "novel";
import { title } from "process";
import { z } from "zod";

export const siteSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().min(1).max(200),
  subdirectory: z.string().min(5).max(50),
});

export const articleSchema = z.object({
  title: z.string().min(1).max(100),
  slug: z.string().min(1).max(190),
  imageUrl: z.string().min(1),
  description: z.string().min(1).max(200),
  content: z.string().min(1),
});
