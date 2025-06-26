"use client";
import React from "react";
import Image from "next/image";
import { Badge, Card, Group } from "@mantine/core";
import UpdateCourseModal from "./CoursesModal/UpdateCourseModal";
import DeleteCourseModal from "./CoursesModal/DeleteCourseModal";
import CoursesHeader from "./CoursesHeader";
import useFetch from "@/Hooks/useFetch";
import Loading from "@/app/Loading";
import { useTranslations } from "next-intl";
import Error from "next/error";
import { notFound } from "next/navigation";

const CoursesList = () => {
  const Courses_Transilations = useTranslations("courses");
  const { data: courses, isLoading, error, refresh } = useFetch("/courses");

  if (isLoading) return <Loading />;
  if (error) notFound();

  const IMAGE_URL = `${process.env.NEXT_PUBLIC_SERVER_HOST}/uploads/images/courses/`;
  return (
    <section>
      <CoursesHeader
        Courses_Transilations={Courses_Transilations}
        OnCourseDataUpdated={refresh}
      />
      <div className="courses grid lg:grid-cols-4 md:grid-cols-2 gap-4">
        {courses?.map((course) => (
          <Card padding="lg" radius="md" withBorder key={course._id}>
            <div className="relative w-full h-[200px] bg-slate-200 rounded overflow-hidden">
              <Image
                src={`${IMAGE_URL}${course.image}`}
                className="object-cover"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                alt={course.name}
              />
            </div>

            <Group justify="space-between" mt="md" mb="xs">
              <span className="text-xl">{course.name}</span>
              <Badge color={course.isAvailable ? "green" : "red"}>
                {course.isAvailable
                  ? Courses_Transilations("available")
                  : Courses_Transilations("unavailable")}
              </Badge>
            </Group>

            <div className="font-semibold *:ml-1">
              {course.price}
              <span>{Courses_Transilations("currancy")}</span>
            </div>

            <div className="*:w-full flex mt-4 gap-4">
              <DeleteCourseModal
                id={course._id}
                OnCourseDataUpdated={refresh}
                Courses_Transilations={Courses_Transilations}
              />
              <UpdateCourseModal
                course={course}
                OnCourseDataUpdated={refresh}
                Courses_Transilations={Courses_Transilations}
              />
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default CoursesList;
