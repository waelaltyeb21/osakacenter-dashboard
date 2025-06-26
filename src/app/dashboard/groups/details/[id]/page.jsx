"use client";
import GroupStudents from "@/components/Groups/GroupStudents";
import useFetch from "@/Hooks/useFetch";
import { useParams } from "next/navigation";
import Loading from "@/app/Loading";
import GroupHeaderDetails from "@/components/Groups/GroupHeaderDetails";

export default function GroupStudentsDetails() {
  const { id } = useParams();
  const { data, isLoading, error, refresh } = useFetch(`/groups/${id}`);

  if (isLoading) return <Loading />;
  if (error) throw new Error(error);

  return (
    <article>
      <GroupHeaderDetails group={data?.group} OnGroupDataUpdated={refresh} />
      <GroupStudents
        group={data?.group}
        groupId={id}
        OnGroupDataUpdated={refresh}
      />
    </article>
  );
}
