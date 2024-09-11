"use server";

import { requireUser } from "@/app/require-user";
import prisma from "@/lib/db";
import { tagSchema } from "@/lib/schemas";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

export const createTagAction = async (_: any, formData: FormData) => {
  const user = await requireUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const submission = parseWithZod(formData, { schema: tagSchema });
  if (submission.status !== "success") {
    return submission.reply();
  }

  const existingTags = await prisma.tag.findMany({});
  const existingTag = existingTags.find(
    (tag) => tag.name === submission.value.name,
  );

  if (existingTag) {
    throw new Error("Tag already exists");
  }
  await prisma.tag.create({
    data: {
      name: submission.value.name,
    },
  });

  return redirect(`/dashboard/tags`);
};

export const deleteTagAction = async (tagId: string) => {
  const user = await requireUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  await prisma.tag.delete({ where: { id: tagId } });

  return redirect(`/dashboard/tags`);
};

export const updateTagForArticleAction = async (
  tags: string[],
  articleId: string,
  formData: FormData,
) => {
  const user = await requireUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const submission = parseWithZod(formData, { schema: tagSchema });
  if (submission.status !== "success") {
    return submission.reply();
  }

  return redirect(`/dashboard/tags`);
};
