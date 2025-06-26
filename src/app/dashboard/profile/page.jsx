import SupervisorGroups from "@/components/Supervisors/SupervisorGroups";
import SupervisorInfo from "@/components/Supervisors/SupervisorInfo";
import GetData from "@/lib/GetData";
import { cookies } from "next/headers";
import React from "react";

export default async function Profile() {
  const supervisor = (await cookies())?.get("supervisor")?.value;
  if (!supervisor) return null;
  const id = supervisor.split(`"`)[1];
  const GetSupervisor = await GetData(`/supervisors/${id}`);
  console.log("Supervisor: ", GetSupervisor);
  return (
    <div>
      <SupervisorInfo supervisor={GetSupervisor.supervisor} />
      <SupervisorGroups groups={GetSupervisor?.supervisor?.groups} />
    </div>
  );
}
