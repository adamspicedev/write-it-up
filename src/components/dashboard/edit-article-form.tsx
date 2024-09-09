"use client";

import { editArticleActions } from "@/actions/article-actions";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { articleSchema } from "@/lib/schemas";
import { UploadDropzone } from "@/lib/upload-buttons";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Atom } from "lucide-react";
import Image from "next/image";
import { JSONContent } from "novel";
import { useActionState, useState } from "react";
import slugify from "react-slugify";
import EditorWrapper from "./editor-wrapper";
import SubmitButton from "./submit-button";

interface iAppProps {
  data: {
    slug: string;
    title: string;
    description: string;
    content: any;
    id: string;
    imageUrl: string;
  };
  siteId: string;
}

export function EditArticleForm({ data, siteId }: iAppProps) {
  const { toast } = useToast();
  const [imageUrl, setImageUrl] = useState<undefined | string>(data.imageUrl);
  const [value, setValue] = useState<JSONContent | undefined>(data.content);
  const [slug, setSlug] = useState<undefined | string>(data.slug);
  const [title, setTitle] = useState<undefined | string>(data.title);

  const [lastResult, action] = useActionState(editArticleActions, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: articleSchema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const generateSlug = () => {
    if (!title || title.length === 0) {
      return toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please add a title first",
      });
    }
    setSlug(slugify(title));
    return toast({
      variant: "success",
      title: "Success",
      description: "Slug has been created",
    });
  };
  return (
    <Card className="mt-5">
      <CardHeader>
        <CardTitle>Edit Article</CardTitle>
        <CardDescription>
          Edit your article to make it more appealing
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-6"
          id={form.id}
          onSubmit={form.onSubmit}
          action={action}
        >
          <input type="hidden" name="articleId" value={data.id} />
          <input type="hidden" name="siteId" value={siteId} />
          <div className="grid gap-2">
            <Label>Title</Label>
            <Input
              key={fields.title.key}
              name={fields.title.name}
              defaultValue={fields.title.initialValue}
              placeholder="Nextjs blogging application"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <p className="text-sm text-red-500">{fields.title.errors}</p>
          </div>

          <div className="grid gap-2">
            <Label>Slug</Label>
            <Input
              key={fields.slug.key}
              name={fields.slug.name}
              defaultValue={fields.slug.initialValue}
              placeholder="Article Slug"
              onChange={(e) => setSlug(e.target.value)}
              value={slug}
            />
            <Button
              onClick={generateSlug}
              className="w-fit"
              variant="secondary"
              type="button"
            >
              <Atom className="mr-2 size-4" /> Generate Slug
            </Button>
            <p className="text-sm text-red-500">{fields.slug.errors}</p>
          </div>

          <div className="grid gap-2">
            <Label>Description</Label>
            <Textarea
              key={fields.description.key}
              name={fields.description.name}
              defaultValue={data.description}
              placeholder="Small Description for your blog article..."
              className="h-32"
            />
            <p className="text-sm text-red-500">{fields.description.errors}</p>
          </div>

          <div className="grid gap-2">
            <Label>Cover Image</Label>
            <input
              type="hidden"
              name={fields.imageUrl.name}
              key={fields.imageUrl.key}
              defaultValue={fields.imageUrl.initialValue}
              value={imageUrl}
            />
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="Uploaded Image"
                className="h-[200px] w-[200px] rounded-lg object-cover"
                width={200}
                height={200}
              />
            ) : (
              <UploadDropzone
                onClientUploadComplete={(res) => {
                  setImageUrl(res[0].url);
                  toast({
                    variant: "success",
                    title: "Upload complete",
                    description: "Your image has been uploaded",
                  });
                }}
                onUploadError={() => {
                  toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem uploading your image",
                  });
                }}
                endpoint="imageUploader"
                className="ut-button:bg-primary ut-label:text-primary ut-button:ut-readying:bg-primary ut-button:ut-ready:bg-primary ut-button:ut-uploading:bg-primary/50 ut-button:ut-uploading:ring-0 ut-button:ut-uploading:after:bg-primary ut-button:ut-uploading:focus:ring-0"
              />
            )}

            <p className="text-sm text-red-500">{fields.imageUrl.errors}</p>
          </div>

          <div className="grid gap-2">
            <Label>Article Content</Label>
            <input
              type="hidden"
              name={fields.content.name}
              key={fields.content.key}
              defaultValue={fields.content.initialValue}
              value={JSON.stringify(value)}
            />
            <EditorWrapper onChange={setValue} initialValue={value} />
            <p className="text-sm text-red-500">{fields.content.errors}</p>
          </div>

          <SubmitButton text="Edit Article" />
        </form>
      </CardContent>
    </Card>
  );
}
