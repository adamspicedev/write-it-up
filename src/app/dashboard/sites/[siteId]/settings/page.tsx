import { deleteSiteAction } from "@/actions/site-actions";
import { requireUser } from "@/app/require-user";
import SubmitButton from "@/components/dashboard/submit-button";
import UploadImageForm from "@/components/dashboard/upload-image-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/db";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import ApiKeyCopy from "@/components/dashboard/api-key-copy";
import { Role } from "@prisma/client";

const getData = async (userId: string, siteId: string) => {
  const data = await prisma.site.findUnique({
    where: {
      id: siteId,
      userId: userId,
    },
    select: {
      user: {
        select: {
          subscription: true,
          role: true,
        },
      },
      apiKey: true,
      subdirectory: true,
      articles: {
        select: {
          imageUrl: true,
          title: true,
          createdAt: true,
          id: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return data;
};

const SettingsSitePage = async ({ params }: { params: { siteId: string } }) => {
  const user = await requireUser();

  const data = await getData(user.id, params.siteId);

  return (
    <>
      <div className="flex items-center gap-x-2">
        <Button variant="outline" size="icon">
          <Link href={`/dashboard/sites/${params.siteId}`}>
            <ChevronLeft className="size-4" />
          </Link>
        </Button>
        <h3 className="text-xl font-semibold">Go back</h3>
      </div>

      {data?.user.role === Role.ADMIN || data?.user.subscription ? (
        <Card>
          <CardHeader>
            <CardTitle>API Key</CardTitle>
            <CardDescription>
              This is your unique API key. Use this key to authenticate with the
              API
            </CardDescription>
            <CardContent>
              <ApiKeyCopy apiKey={data.apiKey ?? ""} />
            </CardContent>
          </CardHeader>
        </Card>
      ) : null}

      <UploadImageForm siteId={params.siteId} />

      <Card className="border-red-500 bg-red-500/10">
        <CardHeader>
          <CardTitle className="text-red-500">Danger</CardTitle>
          <CardDescription>
            This will delete your site and all articles associated with it.
            Click the button below to delete everything
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <form action={deleteSiteAction}>
            <input type="hidden" name="siteId" value={params.siteId} />
            <SubmitButton text="Delete Everything" variant="destructive" />
          </form>
        </CardFooter>
      </Card>
    </>
  );
};

export default SettingsSitePage;
