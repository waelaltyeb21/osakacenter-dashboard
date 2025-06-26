"use client"
import Loading from "@/app/Loading";
import { useFetch } from "@mantine/hooks";
import React from "react";

export default function Supervisors() {
  const { data, isLoading, error, refresh } = useFetch(`/supervisors`);
  if (isLoading) return <Loading />;
  if (error) throw new Error(error);
  console.log(data);

  return <div>Supervisors</div>;
}
