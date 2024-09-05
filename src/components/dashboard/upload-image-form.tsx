"use client";

import { UploadDropzone } from "@/lib/upload-buttons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import SubmitButton from "./submit-button";
import { updateImageAction } from "@/actions/image-actions";
import { useToast } from "@/hooks/use-toast";

interface UploadImageFormProps {
  siteId: string;
}

const UploadImageForm = ({ siteId }: UploadImageFormProps) => {
  const { toast } = useToast();
  const [imageUrl, setImageUrl] = useState<undefined | string>(undefined);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Image</CardTitle>
        <CardDescription>
          This is the image of your site. you can change it here
        </CardDescription>
      </CardHeader>
      <CardContent>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="Uploaded Image"
            width={200}
            height={200}
            className="size-[200px] rounded-lg object-cover"
          />
        ) : (
          <UploadDropzone
            endpoint="imageUploader"
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
            className="ut-button:bg-primary ut-label:text-primary ut-button:ut-readying:bg-primary ut-button:ut-ready:bg-primary ut-button:ut-uploading:bg-primary/50 ut-button:ut-uploading:ring-0 ut-button:ut-uploading:after:bg-primary ut-button:ut-uploading:focus:ring-0"
          />
        )}
      </CardContent>
      <CardFooter>
        <form action={updateImageAction}>
          <input type="hidden" name="siteId" value={siteId} />
          <input type="hidden" name="imageUrl" value={imageUrl} />
          <SubmitButton text="Change Image" />
        </form>
      </CardFooter>
    </Card>
  );
};

export default UploadImageForm;
