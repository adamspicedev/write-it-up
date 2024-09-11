import prisma from "@/lib/db";

const getData = async () => {
  const data = await prisma.tag.findMany();
  return data;
};

const TagsPage = async () => {
  const data = await getData();
  console.log(data);
  return <div>Tags</div>;
};

export default TagsPage;
