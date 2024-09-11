"use client";

import { createTagAction } from "@/actions/tag-actions";
import SubmitButton from "@/components/dashboard/submit-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { tagSchema } from "@/lib/schemas";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ArrowLeft, Link } from "lucide-react";
import { useActionState } from "react";

const NewTagPage = () => {
  const { toast } = useToast();

  const [lastResult, action] = useActionState(createTagAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate: ({ formData }) => parseWithZod(formData, { schema: tagSchema }),
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  return (
    <>
      <div className="flex items-center">
        <Button asChild size="icon" variant="outline" className="mr-3">
          <Link href={`/dashboard/tags`}>
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold">Create Tag</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Tag Details</CardTitle>
          <CardDescription>
            Add a Tag that can be used on all Articles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-6"
            id={form.id}
            onSubmit={form.onSubmit}
            action={action}
          >
            <div className="flex flex-col gap-2">
              <Label>Tags Name</Label>
              <Input
                placeholder="Enter a name"
                name={fields.name.name}
                key={fields.name.key}
                defaultValue={fields.name.initialValue}
              />
              <p className="text-sm text-destructive">{fields.name.errors}</p>
            </div>
            <SubmitButton text="Create Tag" />
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default NewTagPage;
