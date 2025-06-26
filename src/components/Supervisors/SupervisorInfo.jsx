import Link from "next/link";
import React from "react";

const SupervisorInfo = ({ supervisor }) => {
  return (
    <div>
      <div className="flex justify-between items-center my-8">
        <h1 className="text-2xl font-bold">بيانات المشرف</h1>
        {supervisor?.role == "admin" && (
          <Link
            href={`/dashboard/profile/supervisors`}
            className="ml-4 text-blue-500 hover:underline"
          >
            تعديل
          </Link>
        )}
      </div>
      <div className="flex flex-wrap *:grow items-center gap-4 my-8">
        <div className="p-4 bordered">
          <h1>اسم المشرف</h1>
          <h1>{supervisor?.name}</h1>
        </div>
        <div className="p-4 bordered">
          <h1>البريد الالكتروني</h1>
          <h1>{supervisor?.email}</h1>
        </div>
        <div className="p-4 bordered">
          <h1>الصلاحية</h1>
          <h1>{supervisor?.role}</h1>
        </div>
        <div className="p-4 bordered">
          <h1>المجموعات</h1>
          <h1>{supervisor?.groups_count}</h1>
        </div>
      </div>
      <div>
        <Link
          href="/dashboard/profile/change-password"
          className="text-blue-500 hover:underline"
        >
          هل تريد تغيير كلمة المرور ؟
        </Link>
      </div>
    </div>
  );
};

export default SupervisorInfo;
