"use client";
import { Checkbox, Table } from "@mantine/core";
import Link from "next/link";
import React, { useState } from "react";
import AddGroupStudents from "./GroupModals/AddGroupStudents";
import DeleteGroupStudents from "./GroupModals/DeleteGroupStudents";
import StudentResultModal from "./GroupModals/StudentResultModal";
import UpdateStudentModal from "../Students/StudentModals/UpdateStudentModal";

const GroupStudents = ({ group, groupId, OnGroupDataUpdated }) => {
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [studentsResult, setStudentsResult] = useState(null);
  // Group Students Data
  const StudentTable = {
    caption: "قائمة الطلاب",
    head: ["#", "الاسم", "العمر", "الهاتف", "السكن", "الانضمام", "الاجراءات"],
    body: group?.students?.map((student) => [
      <div className="flex items-center gap-4" key={student._id}>
        <Checkbox
          aria-label="Select row"
          className="cursor-pointer"
          checked={selectedStudents.find((std) => std._id === student._id)}
          onChange={(event) => {
            setSelectedStudents(
              event.currentTarget.checked
                ? [...selectedStudents, student]
                : selectedStudents.filter((std) => std._id !== student._id)
            );
          }}
        />
        <span>{student.studentId}</span>
      </div>,
      student?.name,
      student?.age,
      <Link
        href={`tel:${student?.phone}`}
        className="text-blue-500 hover:underline print:hidden"
      >
        {student?.phone}
      </Link>,
      student?.address,
      `${student.joinedAt.split("T")[0]}`,
      <UpdateStudentModal
        student={student}
        OnGroupDataUpdated={OnGroupDataUpdated}
      />,
    ]),
  };
  return (
    <div>
      {group?.students?.length != 0 ? (
        <article>
          <div className="flex flex-wrap justify-between items-center">
            <h1 className="text-2xl font-bold my-8">قائمة الطلاب</h1>
            <div className="flex flex-wrap items-center *:grow gap-4 mb-4">
              <DeleteGroupStudents
                selectedStudents={selectedStudents}
                OnGroupDataUpdated={OnGroupDataUpdated}
              />
              <StudentResultModal
                selectedStudents={selectedStudents}
                OnGroupDataUpdated={OnGroupDataUpdated}
                studentsResult={studentsResult}
                setStudentsResult={setStudentsResult}
              />
              <AddGroupStudents
                groupId={groupId}
                OnGroupDataUpdated={OnGroupDataUpdated}
              />
            </div>
          </div>
          <div className="lg:overflow-hidden overflow-x-auto">
            <Table
              data={StudentTable}
              stickyHeader
              stickyHeaderOffset={10}
              striped
              highlightOnHover
              withTableBorder
              withColumnBorders
              withRowBorders={false}
            />
          </div>
        </article>
      ) : (
        <article className="flex flex-col items-center justify-center h-64 gap-4">
          <h1>لا يوجد طلاب لعرض بياناتهم</h1>
          <AddGroupStudents
            groupId={groupId}
            OnGroupDataUpdated={OnGroupDataUpdated}
          />
        </article>
      )}
    </div>
  );
};

export default GroupStudents;
