import React from "react";
import StudentsOverview from "./StudentsOverview";
import AddStudentsModal from "./StudentModals/AddStudentsModal";

const StudentsHeader = ({ statics }) => {
  return (
    <article className="w-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">قائمة الطلاب</h1>
        <AddStudentsModal />
      </div>
      <StudentsOverview statics={statics} />
    </article>
  );
};

export default StudentsHeader;
