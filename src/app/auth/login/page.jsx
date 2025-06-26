"use client";
import { RequestController } from "@/lib/RequestController";
import { Button, Input, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Login() {
  const LoginTransilations = useTranslations("login");
  const router = useRouter();
  const form = useForm({
    onSubmitPreventDefault: "always",
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: {
      name: (value) => (value.length < 4 ? "Name should be at least 4" : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 8 ? "Password should be at least 6 characters" : null,
    },
  });

  const HandleLogin = async () => {
    const response = await RequestController(
      "/auth/login",
      "POST",
      form.values
    );
    if (response.status === 200) {
      window.localStorage.setItem(
        "Supervisor",
        JSON.stringify(response.data.supervisor)
      );
      router.replace("/dashboard/");
    }
  };
  return (
    <section className="w-full min-h-dvh flex justify-center items-center">
      <article className="lg:md:min-w-2/6 min-w-11/12 p-4 bordered">
        <h1 className="text-3xl font-semibold mb-4">
          {LoginTransilations("title")}
        </h1>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.onSubmit(HandleLogin)}
        >
          <Input.Wrapper label={LoginTransilations("username")}>
            <TextInput
              type="text"
              id="name"
              key={form.key("name")}
              {...form.getInputProps("name")}
            />
          </Input.Wrapper>
          <Input.Wrapper label={LoginTransilations("email")}>
            <TextInput
              type="email"
              id="email"
              key={form.key("email")}
              {...form.getInputProps("email")}
            />
          </Input.Wrapper>
          <Input.Wrapper label={LoginTransilations("password")}>
            <PasswordInput
              type="password"
              id="password"
              key={form.key("password")}
              {...form.getInputProps("password")}
            />
          </Input.Wrapper>
          <Button type="submit">{LoginTransilations("login")}</Button>
        </form>
      </article>
    </section>
  );
}
