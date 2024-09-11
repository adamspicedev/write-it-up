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
import { tagsAsOptions } from "@/lib/utils";
import { useTagStore } from "@/store";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Article, Tag } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";
import { Atom } from "lucide-react";
import Image from "next/image";
import { JSONContent } from "novel";
import { useActionState, useEffect, useState } from "react";
import slugify from "react-slugify";
import { MultiSelect } from "../multi-select";
import EditorWrapper from "./editor-wrapper";
import SubmitButton from "./submit-button";

interface EditArticleFormProps {
  article: {
    id: string;
    title: string;
    content: JsonValue;
    description: string;
    imageUrl: string;
    slug: string;
    tags: {
      tag: {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
      };
    }[];
  };
  tags: Tag[];
  siteId: string;
}

export function EditArticleForm({
  article,
  tags,
  siteId,
}: EditArticleFormProps) {
  const selectedTags = useTagStore((state) => state.selectedTags);
  const setSelectedTags = useTagStore((state) => state.setSelectedTags);
  const setGlobalTags = useTagStore((state) => state.setGlobalTags);

  const { toast } = useToast();
  const [imageUrl, setImageUrl] = useState<undefined | string>(
    article.imageUrl,
  );
  const [value, setValue] = useState<JSONContent | undefined>(
    article.content as JSONContent,
  );
  const [slug, setSlug] = useState<undefined | string>(article.slug);
  const [title, setTitle] = useState<undefined | string>(article.title);

  const [lastResult, action] = useActionState(editArticleActions, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      const isValid = parseWithZod(formData, { schema: articleSchema });
      console.log(isValid);

      return isValid;
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

  useEffect(() => {
    setSelectedTags(article.tags);
    setGlobalTags(tags);
  }, [article.tags, tags]);
  console.log("tag fields", fields.tags.value);
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
          <input type="hidden" name="articleId" value={article.id} />
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
              defaultValue={article.description}
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
          <div className="grid gap-2">
            <input
              type="hidden"
              name={fields.tags.name}
              key={fields.tags.key}
              defaultValue={
                Array.isArray(fields.tags.initialValue)
                  ? fields.tags.initialValue
                  : []
              }
              value={JSON.stringify(selectedTags)}
            />
            <Label>Tags</Label>
            <MultiSelect
              options={tagsAsOptions(tags)}
              onValueChange={(tagNames) => {
                const newTags: { tag: Tag }[] = [];
                tagNames.forEach((tagName) => {
                  const tag = tags.find((tag) => tag.name === tagName);
                  if (tag) {
                    newTags.push({ tag });
                  }
                });
                setSelectedTags(newTags);
              }}
              defaultValue={selectedTags.map((tag) => tag.name)}
              value={selectedTags.map((tag) => tag.name)}
              placeholder="Select Tags"
              variant="inverted"
              animation={2}
              maxCount={3}
            />
            <p className="text-sm text-red-500">{fields.tags.errors}</p>
          </div>

          <SubmitButton text="Update Article" />
        </form>
      </CardContent>
    </Card>
  );
}
