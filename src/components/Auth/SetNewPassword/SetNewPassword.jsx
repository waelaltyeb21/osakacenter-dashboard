"use client";
import { RequestController } from "@/lib/RequestController";
import { Button, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { redirect } from "next/navigation";
import React from "react";

export default function SetNewPassword({ _id }) {
  const form = useForm({
    onSubmitPreventDefault: "always",
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: {
      password: (value) =>
        value?.length < 8 ? "Password should be at least 6 characters" : null,
      confirmPassword: (value, values) =>
        value !== values?.password ? "Passwords do not match" : null,
    },
  });
  const ResetPassword = async () => {
    const response = await RequestController("/auth/reset-password", "POST", {
      id: _id,
      password: form.values.password,
      confirmPassword: form.values.confirmPassword,
    });
    if (response.status !== 200) return alert(response.data.message);
    redirect("/dashboard/profile");
  };
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold">🗝️اعادة تعيين كلمة المرور</h1>
      <form
        onSubmit={form.onSubmit(ResetPassword)}
        className="min-w-4/5 flex flex-col justify-center gap-4"
      >
        <PasswordInput
          label="كلمة المرور"
          key={form.key("password")}
          {...form.getInputProps("password")}
        />
        <PasswordInput
          label="تاكيد كلمة المرور"
          key={form.key("confirmPassword")}
          {...form.getInputProps("confirmPassword")}
        />
        <Button type="submit">تغيير كلمة المرور</Button>
      </form>
    </div>
  );
}
