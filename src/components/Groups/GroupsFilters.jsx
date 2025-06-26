import { Button, Select } from "@mantine/core";
import React from "react";

const GroupsFilters = ({
  data,
  supervisors,
  filters,
  HandleChange,
  ResetFilters,
}) => {
  // Courses
  let courses = [
    { value: "", label: "الكل" },
    ...data?.map((course) => {
      return { value: course._id, label: course.name };
    }),
  ];

  // Supervisors
  let supervisorsOptions = [
    { value: "", label: "الكل" },
    ...supervisors?.map((supervisor) => {
      return { value: supervisor._id, label: supervisor.name };
    }),
  ];

  return (
    <article className="w-full flex flex-wrap *:grow gap-4 mb-4">
      <Select
        label="الدورة"
        defaultValue="الكل"
        data={courses}
        value={filters?.course}
        onChange={(val) => HandleChange("course", val)}
      />
      <Select
        label="المشرف"
        defaultValue="الكل"
        data={supervisorsOptions}
        value={filters?.supervisor}
        onChange={(val) => HandleChange("supervisor", val)}
      />
      <Select
        label="الترتيب"
        defaultValue="من الاحدث للاقدم"
        data={[
          { value: "", label: "الكل" },
          { value: "asc", label: "من الاحدث للاقدم" },
          { value: "desc", label: "من الاقدم للاحدث" },
        ]}
        value={filters?.sort_type}
        onChange={(val) => HandleChange("sort_type", val)}
      />

      <Select
        label="حالة المجموعة"
        defaultValue="الكل"
        data={[
          { value: "", label: "الكل" },
          { value: "Under Registration", label: "تحت التسجيل" },
          { value: "In Progress", label: "قيد التقدم" },
          { value: "Completed", label: "مكتملة" },
        ]}
        value={filters?.status}
        onChange={(val) => HandleChange("status", val)}
      />
      <Button
        variant="outline"
        color="red"
        onClick={ResetFilters}
        className="self-end"
      >
        حذف الفلتره
      </Button>
    </article>
  );
};

export default GroupsFilters;
