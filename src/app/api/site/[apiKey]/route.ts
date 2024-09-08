import prisma from "@/lib/db";
import { NextApiRequest } from "next";

interface SiteArticleRequestParams {
  params: { apiKey: string };
}

export async function GET(
  req: NextApiRequest,
  { params }: SiteArticleRequestParams,
) {
  try {
    const { apiKey } = params;

    if (!apiKey) {
      return Response.json({
        status: 400,
        body: { error: "Missing API key" },
      });
    }
    const articles = await prisma.site.findUnique({
      where: { apiKey: apiKey as string },
      select: {
        articles: true,
      },
    });

    return Response.json({
      status: 200,
      body: articles,
    });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return Response.json({
      status: 500,
      body: { error: "Internal server error" },
    });
  }
}
