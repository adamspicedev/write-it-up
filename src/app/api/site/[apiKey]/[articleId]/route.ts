import prisma from "@/lib/db";
import { NextRequest } from "next/server";

interface SiteArticleRequestParams {
  params: { apiKey: string; articleId: string };
}

export async function GET(
  req: NextRequest,
  { params }: SiteArticleRequestParams,
) {
  try {
    const { apiKey, articleId } = params;

    if (!apiKey) {
      return Response.json({
        status: 400,
        body: { error: "Missing API key" },
      });
    }

    if (!articleId) {
      return Response.json({
        status: 400,
        body: { error: "Missing article ID" },
      });
    }
    const res = await prisma.site.findUnique({
      where: { apiKey: apiKey as string },
      select: {
        articles: true,
      },
    });

    return Response.json({
      status: 200,
      body: res?.articles.filter((article) => article.id === articleId),
    });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return Response.json({
      status: 500,
      body: { error: "Internal server error" },
    });
  }
}
