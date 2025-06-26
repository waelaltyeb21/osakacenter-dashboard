import TextEditor from "@/components/Blogs/TextEditor";
import { Container } from "@mantine/core";
import React from "react";

export default function AddNewBlog() {
  return (
    <div>
      <Container>
        <TextEditor />
      </Container>
    </div>
  );
}
