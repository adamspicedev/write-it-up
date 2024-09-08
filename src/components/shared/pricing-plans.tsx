import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import SubmitButton from "../dashboard/submit-button";
import Link from "next/link";
import { createSubscriptionAction } from "@/actions/subscription-actions";

interface PricingProps {
  id: number;
  cardTitle: string;
  cardDescription: string;
  priceTitle: string;
  benefits: string[];
}

const plans: PricingProps[] = [
  {
    id: 0,
    cardTitle: "Freelancer",
    cardDescription: "The best pricing plan for people starting out.",
    benefits: ["1 Site"],
    priceTitle: "Free",
  },
  {
    id: 1,
    cardTitle: "Startup",
    cardDescription: "The best pricing plan for professionals.",
    priceTitle: "$29",
    benefits: ["Unlimited Sites", "API access to your articles"],
  },
];

const PricingPlans = () => {
  return (
    <>
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-semibold text-primary">Pricing</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          Pricing Plans for everyone and every budget!
        </h1>
      </div>

      <p className="mx-auto mt-6 max-w-2xl text-center leading-tight text-muted-foreground">
        Choose the best pricing plan for you and your team. You can always
        change your plan or cancel your subscription at any time.
      </p>

      <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {plans.map((plan) => (
          <Card key={plan.id} className={plan.id === 1 ? "border-primary" : ""}>
            <CardHeader>
              <CardTitle>
                {plan.id === 1 ? (
                  <div className="flex items-center justify-between">
                    <h3 className="text-primary">Startup</h3>

                    <p className="rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold leading-5 text-primary">
                      Most popular
                    </p>
                  </div>
                ) : (
                  <>{plan.cardTitle}</>
                )}
              </CardTitle>
              <CardDescription>{plan.cardDescription}</CardDescription>
            </CardHeader>
            <CardContent className="min-h-56">
              <p className="mt-6 text-4xl font-bold tracking-tight">
                {plan.priceTitle}
              </p>

              <ul className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
                {plan.benefits.map((benefit, index) => (
                  <li key={index} className="flex gap-x-3">
                    <Check className="size-5 text-primary" />

                    {benefit}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="min-h-20">
              {plan.id === 1 ? (
                <form className="w-full" action={createSubscriptionAction}>
                  <SubmitButton text="Buy Plan" className="mt-5 w-full" />
                </form>
              ) : (
                <Button variant="outline" className="mt-8 w-full" asChild>
                  <Link href="/dashboard">Try for free</Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

export default PricingPlans;
