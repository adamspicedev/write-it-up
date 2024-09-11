"use server";

import prisma from "@/lib/db";
import { articleSchema } from "@/lib/schemas";
import { requireUser } from "@/app/require-user";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import { Tag } from "@prisma/client";

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
  console.log("running`");
  const submission = parseWithZod(formData, {
    schema: articleSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const tags: Tag[] = JSON.parse(submission.value.tags!);
  const articleId = formData.get("articleId") as string;

  const data = await prisma.article.update({
    where: {
      userId: user.id,
      id: articleId,
    },
    data: {
      title: submission.value.title,
      description: submission.value.description,
      slug: submission.value.slug,
      content: JSON.parse(submission.value.content),
      imageUrl: submission.value.imageUrl,
      tags: {
        connectOrCreate: tags.map((tag) => ({
          where: {
            articleId_tagId: {
              articleId: articleId,
              tagId: tag.id,
            },
          },
          create: {
            tag: {
              connect: {
                id: tag.id,
              },
            },
          },
        })),
      },
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
