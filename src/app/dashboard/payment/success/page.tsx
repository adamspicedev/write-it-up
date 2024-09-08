import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

const PaymentSuccessPage = () => {
  return (
    <div className="flex w-full flex-1 items-center justify-center">
      <Card className="w-[350px]">
        <div className="p-6">
          <div className="flex w-full justify-center">
            <Check className="size-12 rounded-full bg-green-500/30 p-2 text-green-500" />
          </div>

          <div className="mt-3 w-full text-center sm:mt-5">
            <h2 className="text-xl font-semibold">Payment Successful</h2>
            <p className="mt-2 text-sm tracking-tight text-muted-foreground">
              Congrats to your subscription. You can now create unlimited sites.
            </p>

            <Button asChild className="mt-5 w-full">
              <Link href="/dashboard">Go back to Dashboard</Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PaymentSuccessPage;
