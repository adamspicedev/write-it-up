"use server";

import prisma from "@/lib/db";
import { articleSchema } from "@/lib/schemas";
import { requireUser } from "@/app/require-user";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

export const createArticleAction = async (_: any, formData: FormData) => {
  const user = await requireUser();

  const submission = parseWithZod(formData, { schema: articleSchema });
  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.article.create({
    data: {
      title: submission.value.title,
      description: submission.value.description,
      slug: submission.value.slug,
      content: JSON.parse(submission.value.content),
      imageUrl: submission.value.imageUrl,
      userId: user.id,
      siteId: formData.get("siteId") as string,
    },
  });

  return redirect(`/dashboard/sites/${formData.get("siteId")}`);
};

export async function editArticleActions(prevState: any, formData: FormData) {
  const user = await requireUser();

  const submission = parseWithZod(formData, {
    schema: articleSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.article.update({
    where: {
      userId: user.id,
      id: formData.get("articleId") as string,
    },
    data: {
      title: submission.value.title,
      description: submission.value.description,
      slug: submission.value.slug,
      content: JSON.parse(submission.value.content),
      imageUrl: submission.value.imageUrl,
    },
  });

  return redirect(`/dashboard/sites/${formData.get("siteId")}`);
}

export async function deleteArticleAction(formData: FormData) {
  const user = await requireUser();

  const data = await prisma.article.delete({
    where: {
      userId: user.id,
      id: formData.get("articleId") as string,
    },
  });

  return redirect(`/dashboard/sites/${formData.get("siteId")}`);
}
