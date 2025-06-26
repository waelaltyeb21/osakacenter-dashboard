"use client";
import { Button, Divider, Select, TextInput } from "@mantine/core";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import Link from "@tiptap/extension-link";

// Styles
import "@mantine/tiptap/styles.css";
// import "@/components/tiptap-node/image-upload-node/image-upload-node.scss";
import { useState } from "react";
import Loading from "@/app/Loading";
import { RequestController } from "@/lib/RequestController";
// import { ImageUploadButton } from "../tiptap-ui/image-upload-button";
// import Image from "@tiptap/extension-image";

const content = '<h2 style="text-align: center;">Content Goes Here</h2>';

const TextEditor = () => {
  const CustomLink = Link.extend({
    addAttributes() {
      return {
        ...this.parent?.(),
        target: {
          default: "_blank",
        },
        rel: {
          default: "noopener noreferrer",
        },
      };
    },
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.extend(CustomLink),
      Superscript,
      SubScript,
      Highlight,
      // Image.configure({
      //   inline: true,
      //   HTMLAttributes: {
      //     class: "tiptap-image-upload",
      //   },
      // }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    immediatelyRender: false,
    content,
  });

  const [title, setTitle] = useState("Blog 1");
  const [level, setLevel] = useState("advanced");
  const [course, setCourse] = useState("Spanish");

  const SaveText = async () => {
    const blog = editor.getJSON();

    const BlogData = {
      title: title,
      content: blog.content,
      courseID: course,
      level: level,
      publishedBy: "6836dc8c9694ffeaabd93188",
    };

    console.log("Blog Data: ", BlogData);
    return;
    try {
      const response = await RequestController(
        "/articles/create",
        "POST",
        BlogData
      );
      if (response.status === 201) {
      }
    } catch (error) {
      console.error("Error: ", error);
      throw new Error("Error saving blog");
    }
  };
  // Check if editor is loaded
  if (!editor) return <Loading />;
  return (
    <section>
      {editor && (
        <div>
          <article className="grid grid-cols-2 gap-4 mb-10">
            <TextInput
              label="عنوان المقالة"
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextInput label="ناشر المقالة" disabled value="Ahmed Mamado" />
            <Select
              label="مناسبة للمستوى ؟"
              onChange={(val) => setLevel(val)}
              defaultValue="advanced"
              data={["beginner", "intermediate", "advanced"]}
            />
            <Select
              label="الكورس"
              onChange={(val) => setCourse(val)}
              defaultValue="English"
              data={["English", "French", "Spanish"]}
            />
          </article>
          <h1>محتوى المقال</h1>
          <RichTextEditor editor={editor}>
            <RichTextEditor.Toolbar
              sticky
              stickyOffset="var(--docs-header-height)"
            >
              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Bold />
                <RichTextEditor.Italic />
                <RichTextEditor.Underline />
                <RichTextEditor.Strikethrough />
                <RichTextEditor.ClearFormatting />
                <RichTextEditor.Highlight />
                <RichTextEditor.Code />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.H1 />
                <RichTextEditor.H2 />
                <RichTextEditor.H3 />
                <RichTextEditor.H4 />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Blockquote />
                <RichTextEditor.Hr />
                <RichTextEditor.BulletList />
                <RichTextEditor.OrderedList />
                <RichTextEditor.Subscript />
                <RichTextEditor.Superscript />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Link />
                <RichTextEditor.Unlink />
              </RichTextEditor.ControlsGroup>

              {/* Image upload */}
              {/* <RichTextEditor.ControlsGroup>
                <ImageUploadButton editor={editor} />
              </RichTextEditor.ControlsGroup> */}

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.AlignLeft />
                <RichTextEditor.AlignCenter />
                <RichTextEditor.AlignJustify />
                <RichTextEditor.AlignRight />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Undo />
                <RichTextEditor.Redo />
              </RichTextEditor.ControlsGroup>
            </RichTextEditor.Toolbar>

            <RichTextEditor.Content />
          </RichTextEditor>
          <Divider />
          <div className="mt-4 flex justify-center items-center">
            <Button className="block w-4/6" onClick={SaveText}>
              Save
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default TextEditor;
