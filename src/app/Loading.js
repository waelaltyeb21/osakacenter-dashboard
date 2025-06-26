"use client";
import { Loader } from "@mantine/core";
import React from "react";

const Loading = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Loader color="blue" size="lg" type="dots" />
    </div>
  );
};

export default Loading;
