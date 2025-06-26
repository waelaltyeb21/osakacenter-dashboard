import Link from "next/link";
import React from "react";

const SupervisorGroups = ({ groups }) => {
  if (!groups) return <div>No groups Supervised Yet</div>;
  return (
    <article>
      <h1 className="text-2xl font-bold my-8">
        المجموعات التي يتم الاشراف عليها
      </h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
        {groups?.map((group) => {
          return (
            <Link
              href={`/dashboard/groups/details/${group._id}`}
              key={group._id}
              className="p-4 bordered"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="font-bold">{group.course}</div>
                <div>{group.level}</div>
              </div>
              <div className="flex justify-between items-center">
                <div>{group.time}</div>
                <div
                  className={`font-bold ${
                    group.status == "Under Registration"
                      ? "text-green-500"
                      : group.status == "Completed"
                      ? "text-blue-500"
                      : "text-red-500"
                  }`}
                >
                  {group.status}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </article>
  );
};

export default SupervisorGroups;
