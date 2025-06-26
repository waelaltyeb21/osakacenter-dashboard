"use client";
import { Button } from "@mantine/core";
import { getCookie, setCookie } from "cookies-next";
import React, { useState } from "react";

export default function ModeSwitcher() {
  const [Mode, setMode] = useState(getCookie("mode") || "light");

  const ModeToggle = () => {
    const NewMode = Mode === "light" ? "dark" : "light";
    const Root = document.documentElement;
    Root.classList.remove("light", "dark");
    Root.classList.add(NewMode);
    setMode(NewMode);
    setCookie("mode", NewMode);
  };
  return (
    <div>
      <Button onClick={ModeToggle}>{Mode}</Button>
    </div>
  );
}
