import prisma from "@/lib/db";
import Image from "next/image";
import { notFound } from "next/navigation";
import Logo from "@/components/dashboard/logo";
import { ThemeToggle } from "@/components/dashboard/theme-toggle";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getData(subDir: string) {
  const data = await prisma.site.findUnique({
    where: {
      subdirectory: subDir,
    },
    select: {
      name: true,
      articles: {
        select: {
          description: true,
          title: true,
          imageUrl: true,
          createdAt: true,
          slug: true,
          id: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function BlogIndexPage({
  params,
}: {
  params: { subdirectory: string };
}) {
  const data = await getData(params.subdirectory);
  return (
    <>
      <nav className="my-10 grid grid-cols-3">
        <div className="col-span-1" />
        <div className="flex items-center justify-center gap-x-4">
          <Logo />
          <h1 className="text-3xl font-semibold tracking-tight">{data.name}</h1>
        </div>

        <div className="col-span-1 flex w-full justify-end">
          <ThemeToggle />
        </div>
      </nav>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        {data.articles.map((articles) => (
          <Card key={articles.id}>
            <Image
              src={articles.imageUrl ?? "/default.png"}
              alt={articles.title}
              className="h-[200px] w-full rounded-t-lg object-cover"
              width={400}
              height={200}
            />
            <CardHeader>
              <CardTitle className="truncate">{articles.title}</CardTitle>
              <CardDescription className="line-clamp-3">
                {articles.description}
              </CardDescription>
            </CardHeader>

            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/blog/${params.subdirectory}/${articles.slug}`}>
                  Read more
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
