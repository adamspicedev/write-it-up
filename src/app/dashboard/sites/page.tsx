import { EmptyState } from "@/components/dashboard/empty-state";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Site } from "@prisma/client";
import { FileIcon, PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const getData = async (userId: string) =>
  await prisma.site.findMany({
    where: { userId: userId },
    orderBy: { createdAt: "desc" },
  });

const SitesPage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data: Site[] = await getData(user.id);

  return (
    <>
      <div className="flex w-full justify-end">
        <Button asChild>
          <Link href="/dashboard/sites/new">
            <PlusCircle className="mr-2 size-4" /> Create Site
          </Link>
        </Button>
      </div>

      {!data ? (
        <EmptyState
          title="You don't have any Sites created"
          description="You haven't set a site up yet. Get started by creating a new site."
          buttonText="Create Site"
          href="/dashboard/sites/new"
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {data.map((site) => (
            <Card key={site.id}>
              <Image
                src={site.imageUrl ?? "/default.png"}
                alt={site.name}
                className="h-[200px] w-full rounded-t-lg object-cover"
                width={400}
                height={200}
              />
              <CardHeader>
                <CardTitle>{site.name}</CardTitle>
                <CardDescription>{site.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/dashboard/sites/${site.id}`}>
                    View Articles
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export default SitesPage;
