"use client";

import { createSiteAction } from "@/actions/site-actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { siteSchema } from "@/lib/schemas";
import { useForm } from "@conform-to/react";
import { useActionState } from "react";
import { parseWithZod } from "@conform-to/zod";
import SubmitButton from "@/components/dashboard/submit-button";

const NewSitePage = () => {
  const [lastResult, action] = useActionState(createSiteAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate: ({ formData }) =>
      parseWithZod(formData, { schema: siteSchema }),
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <div className="flex flex-1 flex-col items-center">
      <Card className="max-w-[450px]">
        <CardHeader>
          <CardTitle>Create A Site</CardTitle>
          <CardDescription>
            Create a new site to get started with your amazing blog
          </CardDescription>
        </CardHeader>
        <form id={form.id} onSubmit={form.onSubmit} action={action}>
          <CardContent>
            <div className="flex flex-col gap-y-6">
              <div className="grid gap-2">
                <Label>Site Name</Label>
                <Input
                  placeholder="Enter a site name"
                  name={fields.name.name}
                  key={fields.name.key}
                  defaultValue={fields.name.initialValue}
                />
                <p className="text-sm text-destructive">{fields.name.errors}</p>
              </div>
              <div className="grid gap-2">
                <Label>Subdirectory</Label>
                <Input
                  placeholder="Enter a subdirectory"
                  name={fields.subdirectory.name}
                  key={fields.subdirectory.key}
                  defaultValue={fields.subdirectory.initialValue}
                />
                <p className="text-sm text-destructive">
                  {fields.subdirectory.errors}
                </p>
              </div>
              <div className="grid gap-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Enter a description for your site"
                  name={fields.description.name}
                  key={fields.description.key}
                  defaultValue={fields.description.initialValue}
                />
                <p className="text-sm text-destructive">
                  {fields.description.errors}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton text="Submit" />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default NewSitePage;
