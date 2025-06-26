"use client";
import Loading from "@/app/Loading";
import useFetch from "@/Hooks/useFetch";
import { Pagination, Table } from "@mantine/core";
import Link from "next/link";
import React, { useState } from "react";
import StudentsFilters from "./StudentsFilters";
import useDebounce from "@/Hooks/useDebounce";
import StudentsHeader from "./StudentsHeader";
import UpdateStudentModal from "./StudentModals/UpdateStudentModal";
import { useTranslations } from "next-intl";

const StudentsList = () => {
  const students = useTranslations("students.students-fields");
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    student: "",
    sort: "",
    course: "",
    group: "",
    address: "",
    paymentStatus: "",
  });
  const debounceStudent = useDebounce(filters.student, 500);
  const url = `/students?page=${filters.page}&limit=${filters.limit}&student=${debounceStudent}&paymentStatus=${filters.paymentStatus}&address=${filters.address}&course=${filters.course}&group=${filters.group}&sort=${filters.sort}`;
  const { data, isLoading, error, refresh } = useFetch(url);

  if (isLoading) return <Loading />;
  if (error) return <h1>{error}</h1>;

  // label => students
  const statics = [
    { id: 1, label: "اجمالي طلاب المعهد", value: data?.students_count },
    ...data?.courses.map((course) => ({
      id: course?._id,
      label: course?.name,
      value: course?.students_count,
    })),
  ];

  const StudentTable = {
    head: [
      "#",
      students("name"),
      students("age"),
      students("phone"),
      students("address"),
      students("course"),
      students("group"),
      students("time"),
      students("paymentStatus"),
      students("joinedAt"),
      students("actions"),
    ],
    body: data?.students?.map((student) => [
      <span>{student?.studentId}</span>,
      <span className="w-[340px]">{student?.name}</span>,
      student?.age,
      <Link
        href={`tel:${student?.phone}`}
        className="text-blue-700 underline underline-offset-2"
      >
        {student?.phone}
      </Link>,
      student?.address,
      student?.course,
      student.group,
      `${student?.time} ${student?.time >= 12 ? "PM" : "AM"}`,
      student.paymentStatus,
      `${student?.joinedAt?.split("T")[0]}`,
      <UpdateStudentModal student={student} OnGroupDataUpdated={refresh} />,
    ]),
  };

  const HandleChange = (filter, val) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [filter]: val, page: 1 };
      return newFilters;
    });
  };

  const Reset = () => {
    setFilters({
      page: 1,
      limit: 10,
      student: "",
      sort: "",
      course: "",
      group: "",
      address: "",
      paymentStatus: "",
    });
  };

  return (
    <article>
      <StudentsHeader statics={statics} />
      {/* Filters */}
      <StudentsFilters
        data={data?.courses}
        filters={filters}
        HandleChange={HandleChange}
        Reset={Reset}
      />

      {/* Students Table */}
      <div className="lg:overflow-hidden overflow-x-auto">
        <Table
          data={StudentTable}
          verticalSpacing="sm"
          horizontalSpacing="md"
          striped
          highlightOnHover
          withTableBorder
          withColumnBorders
          withRowBorders
        />
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <Pagination
          onChange={(val) => HandleChange("page", val)}
          page={filters?.page}
          total={data?.total_pages}
        >
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </div>
    </article>
  );
};

export default StudentsList;
