"use server";

import { requireUser } from "@/app/require-user";
import prisma from "@/lib/db";
import { siteSchema } from "@/lib/schemas";
import { randomUUID } from "@/lib/utils";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

export const createSiteAction = async (_: any, formData: FormData) => {
  const user = await requireUser();

  const submission = parseWithZod(formData, { schema: siteSchema });
  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.site.create({
    data: {
      description: submission.value.description,
      name: submission.value.name,
      subdirectory: submission.value.subdirectory,
      apiKey: randomUUID(),
      userId: user.id,
    },
  });

  return redirect("/dashboard/sites");
};

export async function deleteSiteAction(formData: FormData) {
  const user = await requireUser();

  const data = await prisma.site.delete({
    where: {
      userId: user.id,
      id: formData.get("siteId") as string,
    },
  });

  return redirect("/dashboard/sites");
}
