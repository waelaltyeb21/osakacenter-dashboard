import ResultsHeader from "@/components/Results/ResultsHeader";
import GetData from "@/lib/GetData";
import React from "react";

export default async function Result() {
  const resultForGroups = await GetData("/groups");
  return (
    <div>
      <ResultsHeader data={resultForGroups.groups} />
    </div>
  );
}
