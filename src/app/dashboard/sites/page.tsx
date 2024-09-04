import { Button } from "@/components/ui/button";
import { FileIcon, PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

const SitesPage = () => {
  return (
    <>
      <div className="flex w-full justify-end">
        <Button asChild>
          <Link href="/dashboard/sites/new">
            <PlusCircle className="mr-2 size-4" /> Create Site
          </Link>
        </Button>
      </div>

      <div className="animate-in fade-in-50 flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
        <div className="bg-primary/10 flex size-20 items-center justify-center rounded-full">
          <FileIcon className="text-primary size-10" />
        </div>
        <h2 className="mt-6 text-xl font-semibold">No sites found</h2>
        <p className="text-muted-foreground mb-8 mt-2 text-center text-sm leading-tight">
          Create one to get started
        </p>
        <Button asChild size="lg">
          <Link href="/dashboard/sites/new">
            <PlusCircle className="mr-2 size-8" />
            <span className="text-lg">Create Site</span>
          </Link>
        </Button>
      </div>
    </>
  );
};

export default SitesPage;
