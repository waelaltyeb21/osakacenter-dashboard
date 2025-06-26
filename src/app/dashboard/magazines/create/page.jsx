import HandleUploadedFiles from "@/components/Magazines/HandleUploadedFiles";
import MagazineHeader from "@/components/Magazines/MagazineHeader";
import React from "react";

export default function CreateMagazine() {
  return (
    <article>
      <MagazineHeader />
      <HandleUploadedFiles />
    </article>
  );
}
