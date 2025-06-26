"use client";
import React, { useState } from "react";
import { RequestController } from "@/lib/RequestController";
import { Button, PinInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import SetNewPassword from "../SetNewPassword/SetNewPassword";

const VerificationSection = ({ form, CheckOTP }) => {
  return (
    <article className="w-3/5 mx-auto p-4 text-center">
      <h1 className="text-2xl font-bold">رمز التحقق</h1>
      <p>تم ارسال رمز التحقق الى بريدك الالكتروني</p>
      <div className="flex flex-col justify-center items-center gap-4 my-8">
        <form onSubmit={form.onSubmit(CheckOTP)}>
          <PinInput
            length={6}
            inputMode="numeric"
            oneTimeCode
            key={form.key("otp")}
            {...form.getInputProps("otp")}
            className="mb-8"
          />
          <Button onClick={CheckOTP}>التحقق</Button>
        </form>
      </div>
    </article>
  );
};

export default function OTPVerification({ _id, email }) {
  const [ShowSetPasswordSection, setShowSetPasswordSection] = useState(false);
  // Handle OTP
  const form = useForm({
    onSubmitPreventDefault: "always",
    initialValues: {
      otp: "",
    },
    validate: {
      otp: (value) => (value.length < 6 ? "Name should be at least 6" : null),
    },
  });
  const CheckOTP = async () => {
    console.log("Email: ", email, " otp: ", form.values.otp, " _id: ", _id);
    const response = await RequestController("/auth/check-otp", "POST", {
      otp: Number(form.values.otp),
      email: email,
    });
    if (response.status === 200) {
      setShowSetPasswordSection(true);
    }
  };
  return (
    <section className="w-full">
      {ShowSetPasswordSection ? (
        <SetNewPassword _id={_id} />
      ) : (
        <VerificationSection form={form} CheckOTP={CheckOTP} />
      )}
    </section>
  );
}
