"use client";

import React, { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { Badge } from "../ui/badge";

const ApiKeyCopy = ({ apiKey }: { apiKey: string }) => {
  const [copied, setCopied] = useState(false);
  return (
    <div className="mt-10 flex flex-row gap-4">
      <CopyToClipboard text={apiKey} onCopy={() => setCopied(true)}>
        <span className="cursor-pointer">{apiKey}</span>
      </CopyToClipboard>
      {copied && (
        <Badge variant="outline" className="bg-success/10 text-success">
          Copied
        </Badge>
      )}
    </div>
  );
};

export default ApiKeyCopy;
