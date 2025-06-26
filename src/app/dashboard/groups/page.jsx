import React from "react";
import GroupList from "@/components/Groups/GroupList";
import GetData from "@/lib/GetData";

export default async function Groups() {
  const groups = await GetData("/groups");
  return (
    <div>
      <GroupList groups={groups} />
    </div>
  );
}
