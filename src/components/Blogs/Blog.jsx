"use client";
import "@mantine/tiptap/styles.css";
import "@/components/tiptap-node/image-upload-node/image-upload-node.scss";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { ImageUploadNode } from "../tiptap-node/image-upload-node";
import { EditorContent, useEditor } from "@tiptap/react";
import { useEffect } from "react";
import Loading from "@/app/Loading";

export default function Blog({ article }) {
  console.log("Render..");
  const editor = useEditor({
    immediatelyRender: false,
    editable: false,
    content: "Loading",
    json: true,
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      Image,
      ImageUploadNode,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
  });

  useEffect(() => {
    if (editor) {
      editor?.commands?.setContent(article?.content, "json");
    }
  }, [editor]);

  if (!editor) return <Loading />;
  return (
    <section>
      <article>
        <h1>{article?.title}</h1>
        <EditorContent editor={editor} />
      </article>
    </section>
  );
}
