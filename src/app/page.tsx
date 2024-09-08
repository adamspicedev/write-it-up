import { Button } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Hero from "@/components/frontend/hero";
import Logos from "@/components/frontend/logos";
import Features from "@/components/frontend/features";
import PricingTable from "@/components/shared/pricing-plans";
import { redirect } from "next/navigation";

export default async function Home() {
  const { getUser } = getKindeServerSession();
  const session = await getUser();

  if (session?.id) {
    return redirect("/dashboard");
  }

  return (
    <div className="mx-auto mb-24 max-w-7xl px-4 sm:px-6 lg:px-8">
      <Hero />
      <Logos />
      <Features />
      <PricingTable />
    </div>
  );
}
