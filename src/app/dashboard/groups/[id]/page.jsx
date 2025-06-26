"use client";
import Loading from "@/app/Loading";
import useFetch from "@/Hooks/useFetch";
import { useParams } from "next/navigation";
import React from "react";

export default function GroupDetails() {
  const { id } = useParams();
  const { data, isLoading, error } = useFetch(`/groups/${id}`);
  if (isLoading) return <Loading />;
  if (error) return <h1>Error</h1>;
  console.log(data);
  return <div></div>;
}
