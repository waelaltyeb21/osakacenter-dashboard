"use client";
import React, { useState } from "react";
import { Button } from "@mantine/core";
import { RequestController } from "@/lib/RequestController";
import { getCookie } from "cookies-next";
import OTPVerification from "@/components/Auth/OTPVerification/OTPVerification";

const HeaderSection = ({ GetOTP }) => {
  return (
    <section className="flex justify-center items-center">
      <article className="flex flex-col gap-4">
        <h1 className="text-center text-2xl font-bold">تغيير كلمة المرور</h1>
        <p>لتغيير كلمة المرور يرجى ارسال رمز التحقق</p>
        <Button type="submit" onClick={GetOTP}>
          ارسال رمز التحقق الى البريد الالكتروني
        </Button>
      </article>
    </section>
  );
};

export default function ChangePassword() {
  const [ShowOtpSection, setShowOtpSection] = useState(false);
  const [supervisor, setSupervisor] = useState(null);
  const id = getCookie("supervisor")?.split(`"`)[1];
  if (!id) return null;

  const GetOTP = async () => {
    const response = await RequestController(`/auth/otp/${id}`);
    if (response.status === 200) {
      setSupervisor(response.data?.supervisor);
      setShowOtpSection(true);
    }
  };

  return (
    <section className="min-h-[50dvh] bg-slate-200 flex justify-center items-center">
      {ShowOtpSection ? (
        <OTPVerification email={supervisor?.email} _id={supervisor?._id} />
      ) : (
        <HeaderSection GetOTP={GetOTP} />
      )}
    </section>
  );
}
