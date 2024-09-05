"use server";

import { requireUser } from "@/app/require-user";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";

export async function updateImageAction(formData: FormData) {
  const user = await requireUser();

  const data = await prisma.site.update({
    where: {
      userId: user.id,
      id: formData.get("siteId") as string,
    },
    data: {
      imageUrl: formData.get("imageUrl") as string,
    },
  });

  return redirect(`/dashboard/sites/${formData.get("siteId")}`);
}
