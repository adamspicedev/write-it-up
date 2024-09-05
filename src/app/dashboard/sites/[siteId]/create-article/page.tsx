"use client";

import { createArticleAction } from "@/actions/article-actions";
import EditorWrapper from "@/components/dashboard/editor-wrapper";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { articleSchema } from "@/lib/schemas";
import { UploadDropzone } from "@/lib/upload-buttons";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ArrowLeft, Atom } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { JSONContent } from "novel";
import { useActionState, useState } from "react";
import slugify from "react-slugify";

interface CreateArticleProps {
  params: {
    siteId: string;
  };
}

const CreateArticle = ({ params }: CreateArticleProps) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [content, setContent] = useState<JSONContent | undefined>(undefined);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [slug, setSlug] = useState<string | undefined>(undefined);
  const { toast } = useToast();

  const [lastResult, action] = useActionState(createArticleAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate: ({ formData }) =>
      parseWithZod(formData, { schema: articleSchema }),
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
    <>
      <div className="flex items-center">
        <Button asChild size="icon" variant="outline" className="mr-3">
          <Link href={`/dashboard/sites/${params.siteId}`}>
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold">Create Article</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Article Details</CardTitle>
          <CardDescription>
            Fill in the details for your new article
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-6"
            id={form.id}
            onSubmit={form.onSubmit}
            action={action}
          >
            <input type="hidden" name="siteId" value={params.siteId} />
            <div className="flex flex-col gap-2">
              <Label>Title</Label>
              <Input
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a title"
                name={fields.title.name}
                key={fields.title.key}
                defaultValue={fields.title.initialValue}
                value={title}
              />
              <p className="text-sm text-destructive">{fields.title.errors}</p>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Slug</Label>
              <div className="flex flex-col gap-2 md:flex-row">
                <div className="flex w-full flex-col gap-2">
                  <Input
                    placeholder="Enter a slug"
                    name={fields.slug.name}
                    key={fields.slug.key}
                    defaultValue={fields.slug.initialValue}
                    onChange={(e) => setSlug(e.target.value)}
                    value={slug}
                  />
                  <p className="text-sm text-destructive">
                    {fields.slug.errors}
                  </p>
                </div>
                <Button
                  onClick={generateSlug}
                  className="w-fit"
                  variant="secondary"
                  type="button"
                >
                  <Atom className="mr-2 size-4" />
                  Generate Slug
                </Button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Description</Label>
              <Textarea
                placeholder="An description of your blog article"
                name={fields.description.name}
                key={fields.description.key}
                defaultValue={fields.description.initialValue}
              />
              <p className="text-sm text-destructive">
                {fields.description.errors}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Cover Image</Label>
              <Input
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
              <p className="text-sm text-destructive">
                {fields.imageUrl.errors}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Content</Label>
              <Input
                type="hidden"
                name={fields.content.name}
                key={fields.content.key}
                defaultValue={fields.content.initialValue}
                value={JSON.stringify(content)}
              />
              <EditorWrapper initialValue={content} onChange={setContent} />
              <p className="text-sm text-destructive">
                {fields.content.errors}
              </p>
            </div>
            <SubmitButton text="Create Article" />
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default CreateArticle;
