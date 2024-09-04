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
import React from "react";

const NewSitePage = () => {
  return (
    <div className="flex flex-1 flex-col items-center">
      <Card className="max-w-[450px]">
        <CardHeader>
          <CardTitle>Create A Site</CardTitle>
          <CardDescription>
            Create a new site to get started with your amazing blog
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-y-6">
            <div className="grid gap-2">
              <Label>Site Name</Label>
              <Input placeholder="Enter a site name" />
            </div>

            <div className="grid gap-2">
              <Label>Subdirectory</Label>
              <Input placeholder="Enter a subdirectory" />
            </div>

            <div className="grid gap-2">
              <Label>Description</Label>
              <Textarea placeholder="Enter a description for your site" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NewSitePage;
