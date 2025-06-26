import React from "react";
import DeleteGroupModal from "./GroupModals/DeleteGroupModal";
import { Table } from "@mantine/core";
import UpdateGroupModal from "./GroupModals/UpdateGroupModal";

const GroupHeaderDetails = ({ group, OnGroupDataUpdated }) => {
  const TableData = {
    caption: "تفاصيل المجموعة",
    head: ["الكورس", "المستوى", "المشرف", "الزمن", "الحالة", "عدد الطلاب"],
    body: [
      [
        group?.course,
        group?.level,
        group?.supervisor,
        group?.time,
        group?.status,
        group?.students?.length,
      ],
    ],
  };
  return (
    <article>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">تفاصيل المجموعة</h1>
        <div className="flex flex-wrap flex-col md:flex-row gap-4">
          <DeleteGroupModal id={group?._id} />
          <UpdateGroupModal
            group={group}
            id={group?._id}
            OnGroupDataUpdated={OnGroupDataUpdated}
          />
        </div>
      </div>
      <Table
        variant="vertical"
        data={TableData}
        withColumnBorders
        withRowBorders
        striped
        withTableBorder
      />
    </article>
  );
};

export default GroupHeaderDetails;
