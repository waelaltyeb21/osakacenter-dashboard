"use client";
import Loading from "@/app/Loading";
import Blog from "@/components/Blogs/Blog";
import useFetch from "@/Hooks/useFetch";
import { useParams } from "next/navigation";
import React from "react";

export default function BlogDetails() {
  const { id } = useParams();
  const {
    data: article,
    isLoading,
    error,
  } = useFetch(`/articles/${id}`);
  //
  if (isLoading) return <Loading />;
  if (error) return <p>{error}</p>;
  if (article === null || !article) return <p>Nothing...</p>;
  console.log(article);
  return <div>{article && <Blog article={article} />}</div>;
}
