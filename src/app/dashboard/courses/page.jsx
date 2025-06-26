import React from "react";
import CoursesList from "@/components/Courses/CoursesList";
import GetData from "@/lib/GetData";

export default async function Courses() {
  const courses = await GetData("/courses");
  return (
    <section>
      <CoursesList courses={courses} />
    </section>
  );
}
