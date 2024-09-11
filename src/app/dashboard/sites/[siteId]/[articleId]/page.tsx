import { EditArticleForm } from "@/components/dashboard/edit-article-form";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getData(articleId: string) {
  const [article, tags] = await Promise.all([
    prisma.article.findUnique({
      where: {
        id: articleId,
      },
      select: {
        imageUrl: true,
        title: true,
        description: true,
        slug: true,
        content: true,
        id: true,
        tags: {
          select: {
            tag: true,
          },
        },
      },
    }),
    await prisma.tag.findMany(),
  ]);

  if (!article) {
    return notFound();
  }

  return { article, tags };
}

interface EditArticlePageProps {
  params: {
    siteId: string;
    articleId: string;
  };
}

const EditArticlePage = async ({ params }: EditArticlePageProps) => {
  const { article, tags } = await getData(params.articleId);

  return (
    <div>
      <div className="flex items-center">
        <Button size="icon" variant="outline" asChild className="mr-3">
          <Link href={`/dashboard/sites/${params?.siteId}`}>
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-semibold">Edit Article</h1>
      </div>

      <EditArticleForm article={article} tags={tags} siteId={params.siteId} />
    </div>
  );
};

export default EditArticlePage;
