import React, { useRef } from "react";
import { Button, Table } from "@mantine/core";

const GroupResults = ({ result_transilation, results }) => {
  const sectionRef = useRef();
  const handleDownload = async () => {
    const html2pdf = (await import("html2pdf.js")).default;

    const element = sectionRef.current;
    if (!element) return;

    html2pdf()
      .set({
        margin: 0.2,
        filename: "Osaka_Center_Results.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, letterRendering: true },
        jsPDF: {
          unit: "in",
          format: "letter",
          orientation: "portrait",
        },
      })
      .from(element)
      .save();
  };

  const ResultData = {
    head: [
      "#",
      result_transilation("name"),
      result_transilation("reading"),
      result_transilation("writing"),
      result_transilation("speaking"),
      result_transilation("listening"),
      result_transilation("overall"),
      result_transilation("rating"),
    ],
    body: results?.map((res) => [
      res?.student?.studentId,
      res?.student?.name,
      res?.student?.result?.reading,
      res?.student?.result?.writing,
      res?.student?.result?.speaking,
      res?.student?.result?.listening,
      res?.student?.overall,
      res?.student?.rating,
    ]),
  };
  return (
    <div>
      <article>
        <div className="flex justify-center items-center">
          <Button onClick={handleDownload}>
            <span>{result_transilation("download")}</span>
            <span>📄</span>
          </Button>
        </div>
        <section ref={sectionRef}>
          {/* Header */}
          <article className="print:block hidden">
            <div className="w-full mb-8 flex flex-col justify-center items-center gap-0.5">
              <h1 className="text-2xl font-bold">
                Osaka Center For English Language
              </h1>
              <h3 className="text-lg font-semibold">Osaka General English</h3>
              <h6 className="font-semibold">Exam Results</h6>
              <h6 className="font-semibold">
                {new Date().toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </h6>
            </div>
          </article>
          {/* Result Table */}
          <div className="lg:overflow-hidden overflow-x-auto py-4">
            <Table
              striped
              withTableBorder
              withColumnBorders
              data={ResultData}
            />
          </div>
        </section>
      </article>
    </div>
  );
};

export default GroupResults;
