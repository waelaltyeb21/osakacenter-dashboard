import { Select, Table } from "@mantine/core";
import React from "react";

const StudentResult = ({
  levels,
  SelectedResult,
  result_transilation,
  data,
}) => {
  const ResultInfo = {
    head: [
      "#",
      result_transilation("name"),
      result_transilation("course"),
      result_transilation("level"),
      result_transilation("supervisor"),
      result_transilation("time"),
    ],
    body: [
      [
        data?.student?.studentId,
        data?.student?.name,
        data?.group?.course,
        data?.student?.level,
        data?.group?.supervisor,
        data?.group?.time,
      ],
    ],
  };

  const ResultData = {
    head: [
      result_transilation("reading"),
      result_transilation("writing"),
      result_transilation("speaking"),
      result_transilation("listening"),
      result_transilation("overall"),
      result_transilation("rating"),
    ],
    body: [
      [
        data?.student?.result?.reading,
        data?.student?.result?.writing,
        data?.student?.result?.speaking,
        data?.student?.result?.listening,
        data?.student.overall,
        data?.student.rating,
      ],
    ],
  };
  return (
    <article className="mt-10 flex flex-col gap-8">
      <div>
        {levels && (
          <Select
            label={result_transilation("level")}
            defaultValue={levels[levels.length - 1]?.value}
            data={levels}
            onChange={(val) => SelectedResult(val)}
          />
        )}
      </div>
      <h1 className="font-bold text-2xl">
        {result_transilation("result-of-level", {
          level: data?.student?.level,
        })}
      </h1>
      <div className="header-info lg:overflow-hidden overflow-x-auto py-4">
        <Table striped withTableBorder withColumnBorders data={ResultInfo} />
      </div>
      <div className="student-result lg:overflow-hidden overflow-x-auto py-4">
        <Table striped withTableBorder withColumnBorders data={ResultData} />
      </div>
    </article>
  );
};

export default StudentResult;
