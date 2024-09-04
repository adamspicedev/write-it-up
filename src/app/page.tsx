import AuthButtons from "@/components/auth/auth-buttons";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Home() {
  const { getUser } = getKindeServerSession();
  const session = await getUser();
  return (
    <div className="flex gap-4 p-8">
      <AuthButtons user={session} />
    </div>
  );
}
