import AddGroupResult from "@/components/Results/AddGroupResult";
import GetData from "@/lib/GetData";
import React from "react";

export default async function GroupResult({ params }) {
  const { id } = await params;
  const data = await GetData(`/groups/group-students/${id}`);
  console.log("groups: ", data);
  const info = {
    level: data?.group?.level,
    course: data?.group?.courseId,
    group: id,
  };
  return (
    <div>
      <h1>Group Result</h1>
      <AddGroupResult info={info} students={data?.group?.students} />
    </div>
  );
}
