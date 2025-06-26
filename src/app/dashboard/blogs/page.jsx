import React from "react";
import BlogsList from "@/components/Blogs/BlogsList";
import GetData from "@/lib/GetData";

export default async function Blogs() {
  const blogs = await GetData("/articles");
  console.log("blogs: ", blogs);
  return (
    <div>
      <BlogsList blogs={blogs} />
    </div>
  );
}
