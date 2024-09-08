import prisma from "@/lib/db";
import { requireUser } from "../require-user";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EmptyState } from "@/components/dashboard/empty-state";

const getData = async (userId: string) => {
  const [sites, articles] = await Promise.all([
    prisma.site.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    }),
    prisma.article.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    }),
  ]);

  return { sites, articles };
};

const DashboardPage = async () => {
  const user = await requireUser();
  const { articles, sites } = await getData(user.id);
  return (
    <div>
      <h1 className="mb-5 text-2xl font-semibold">Your Sites</h1>
      {sites.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {sites.map((item) => (
            <Card key={item.id}>
              <Image
                src={item.imageUrl ?? "/default.png"}
                alt={item.name}
                className="h-[200px] w-full rounded-t-lg object-cover"
                width={400}
                height={200}
              />
              <CardHeader>
                <CardTitle className="truncate">{item.name}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {item.description}
                </CardDescription>
              </CardHeader>

              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/dashboard/sites/${item.id}`}>
                    View Articles
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="You don't have any sites created"
          description="You currently don't have any Sites. Please create some so that you can see them right here."
          href="/dashboard/sites/new"
          buttonText="Create Site"
        />
      )}

      {articles.length > 0 ? (
        <>
          <h1 className="mb-5 mt-10 text-2xl font-semibold">Recent Articles</h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {articles.map((item) => (
              <Card key={item.id}>
                <Image
                  src={item.imageUrl ?? "/default.png"}
                  alt={item.title}
                  className="h-[200px] w-full rounded-t-lg object-cover"
                  width={400}
                  height={200}
                />
                <CardHeader>
                  <CardTitle className="truncate">{item.title}</CardTitle>
                  <CardDescription className="line-clamp-3">
                    {item.description}
                  </CardDescription>
                </CardHeader>

                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/dashboard/sites/${item.siteId}/${item.id}`}>
                      Edit Article
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </>
      ) : (
        sites.length > 0 && (
          <EmptyState
            title="You don't have any articles created"
            description="Your currently don't have any articles created. Please create some so that you can see them right here"
            buttonText="Create Article"
            href="/dashboard/sites"
          />
        )
      )}
    </div>
  );
};

export default DashboardPage;
