import { type JSONContent } from "novel";
import { useMemo } from "react";
import { generateHTML } from "@tiptap/html";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import Code from "@tiptap/extension-code";
import BlockQuote from "@tiptap/extension-blockquote";
import TextStyle from "@tiptap/extension-text-style";
import CodeBlock from "@tiptap/extension-code-block";
import OrderList from "@tiptap/extension-ordered-list";
import Bold from "@tiptap/extension-bold"; // Ajoutez cette ligne
import HardBreak from "@tiptap/extension-hard-break"; // Ajoutez cette ligne
import HorizontalRule from "@tiptap/extension-horizontal-rule";

export function RenderArticle({ json }: { json: JSONContent }) {
  const outPut = useMemo(() => {
    return generateHTML(json, [
      Document,
      Paragraph,
      Text,
      Link,
      Underline,
      Heading,
      ListItem,
      BulletList,
      Code,
      BlockQuote,
      TextStyle,
      CodeBlock,
      OrderList.configure({
        HTMLAttributes: {
          class: "document",
        },
      }),
      Bold,
      HardBreak,
      HorizontalRule,
    ]);
  }, [json]);

  return (
    <div
      className="prose m-auto w-11/12 dark:prose-invert sm:prose-lg prose-li:marker:text-primary sm:w-2/3"
      dangerouslySetInnerHTML={{ __html: outPut }}
    />
  );
}
