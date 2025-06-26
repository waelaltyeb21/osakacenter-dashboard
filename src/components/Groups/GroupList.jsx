"use client";
import { Table } from "@mantine/core";
import GroupsFilters from "./GroupsFilters";
import { useState } from "react";
import useFetch from "@/Hooks/useFetch";
import GroupsOverview from "./GroupsOverview";
import Link from "next/link";
import AddGroupModal from "./GroupModals/AddGroupModal";
import Loading from "@/app/Loading";
import { useTranslations } from "next-intl";

export default function GroupList() {
  const GroupsTransilations = useTranslations("groups");
  const [filters, setFilters] = useState({
    page: 1,
    limit: 20,
    course: "",
    supervisor: "",
    level: "",
    sortby: "",
    sort_type: "",
    status: "",
  });
  
  // Fetch The Data
  const url = `/groups?page=${filters.page}&limit=${filters.limit}&supervisor=${filters.supervisor}&course=${filters.course}&sortby=${filters.sortby}&sort_type=${filters.sort_type}&status=${filters.status}`;
  const { data, isLoading, error, refresh } = useFetch(url);

  if (isLoading) return <Loading />;
  if (error) console.log(error);

  const HandleChange = (filter, val) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [filter]: val };
      return newFilters;
    });
  };

  const GroupsTable = {
    caption: "قائمة المجموعات",
    head: [
      "الكورس",
      "المستوى",
      "المشرف",
      "الوقت",
      "الحالة",
      "تاريخ البدأ",
      "عدد الطلاب",
      "الاجراءات",
    ],
    body: data?.groups?.map((group) => [
      group?.course,
      group?.level,
      group?.supervisor || "Not Set",
      group?.time,
      group?.status,
      group?.startingDate ? group?.startingDate : "No Date Set",
      group?.students_count,
      <Link
        href={`/dashboard/groups/details/${group?._id}`}
        className="text-blue-500 hover:underline"
      >
        التفاصيل
      </Link>,
    ]),
  };

  const ResetFilters = () => {
    setFilters({
      page: 1,
      limit: 20,
      course: "",
      supervisor: "",
      level: "",
      sortby: "",
      sort_type: "",
      status: "",
    });
  };
  return (
    <section>
      <GroupsOverview statics={data?.info} />
      <article>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl mb-4">قائمة المجموعات</h1>
          <AddGroupModal
            supervisors={data?.supervisors}
            courses={data?.info}
            onGroupDataUpdated={refresh}
            title="اضافة قروب جديد"
          />
        </div>
        <GroupsFilters
          filters={filters}
          data={data?.info}
          supervisors={data?.supervisors}
          HandleChange={HandleChange}
          ResetFilters={ResetFilters}
        />
        <div className="lg:overflow-hidden overflow-x-auto w-full mt-6">
          <Table
            data={GroupsTable}
            striped
            withTableBorder
            withRowBorders
            withColumnBorders
            highlightOnHover
          />
        </div>
      </article>
    </section>
  );
}
