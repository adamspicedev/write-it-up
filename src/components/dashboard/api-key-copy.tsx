"use client";

import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { Badge } from "../ui/badge";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

const ApiKeyCopy = ({ apiKey }: { apiKey: string }) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  return (
    <div className="mt-10 flex flex-row gap-4">
      <span className="cursor-pointer">{apiKey}</span>
      {isCopied && (
        <Badge variant="outline" className="bg-success/10 text-success">
          Copied
        </Badge>
      )}
    </div>
  );
};

export default ApiKeyCopy;
