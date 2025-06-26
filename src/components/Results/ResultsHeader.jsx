"use client";
import { RequestController } from "@/lib/RequestController";
import { Button, Select, TextInput } from "@mantine/core";
import { IconReportSearch } from "@tabler/icons-react";
import React, { useState } from "react";
import GroupResults from "./GroupResults";
import StudentResult from "./StudentResult";
import { useTranslations } from "next-intl";

const ContentDisplayer = ({
  result_transilation,
  resultType,
  levels,
  result: data,
}) => {
  const [LevelResult, setLevelResult] = useState(data[data.length - 1]);

  const SelectedResult = (val) => {
    const selectedLevel = data.find((result) => result._id == val);
    setLevelResult(selectedLevel);
  };
  return resultType == "student" ? (
    <StudentResult
      SelectedResult={SelectedResult}
      levels={levels}
      result_transilation={result_transilation}
      data={LevelResult}
    />
  ) : (
    <GroupResults result_transilation={result_transilation} results={data} />
  );
};

const ResultsHeader = ({ data }) => {
  const result_transilation = useTranslations("results");
  const [resultType, setResultType] = useState("student");
  const [id, setId] = useState("");
  const [result, setResult] = useState(null);
  const [levels, setLevels] = useState([]);

  const groups = data?.map((group) => {
    return {
      label: `${group.course} - ${group.supervisor} - ${group.level} - ${group.time}`,
      value: group._id,
    };
  });

  const GetResult = async () => {
    if (id == "") return;
    const response = await RequestController(`/results/${resultType}/${id}`);
    if (response.status === 200) {
      setResult(response.data);

      if (resultType == "student") {
        const studiedLevels = response?.data?.map((studied) => {
          return {
            label: `${studied?.student?.level}`,
            value: studied?._id,
          };
        });
        setLevels(studiedLevels);
      }
    }
  };

  const SelectedResult = (val) => {
    setResult(result.filter((res) => res._id == val));
  };

  return (
    <div>
      <div className="grid lg:grid-cols-3 gap-4 mt-8">
        <Select
          label={result_transilation("result-type")}
          defaultValue={resultType}
          data={[
            { value: "student", label: result_transilation("student") },
            { value: "group", label: result_transilation("group") },
          ]}
          onChange={(val) => {
            setResultType(val);
            setId("");
            setResult(null);
          }}
        />
        {resultType == "student" ? (
          <TextInput
            label={result_transilation("studentId")}
            value={id}
            onChange={(val) => setId(val.target.value)}
            className="w-full"
          />
        ) : (
          <Select
            label={result_transilation("group")}
            data={groups}
            onChange={(val) => setId(val)}
            className="w-full"
          />
        )}
        <Button onClick={GetResult} className="w-full self-end">
          <IconReportSearch size={20} />
          <span className="mx-2">{result_transilation("query")}</span>
        </Button>
      </div>

      <article className="mt-10">
        {result && result.length != 0 && (
          <ContentDisplayer
            result_transilation={result_transilation}
            levels={levels}
            result={result}
            resultType={resultType}
            SelectedResult={SelectedResult}
          />
        )}
        {result && result.length == 0 && (
          <article className="flex justify-center items-center">
            <h1 className="text-2xl font-bold">
              {result_transilation("not-result")}
            </h1>
          </article>
        )}
      </article>
    </div>
  );
};

export default ResultsHeader;
