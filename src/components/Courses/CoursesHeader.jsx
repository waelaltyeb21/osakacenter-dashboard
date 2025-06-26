import React from "react";
import AddCourseModal from "./CoursesModal/AddCourseModal";

const CoursesHeader = ({ OnCourseDataUpdated, Courses_Transilations }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-bold">{Courses_Transilations("title")}</h1>
      <AddCourseModal
        OnCourseDataUpdated={OnCourseDataUpdated}
        Courses_Transilations={Courses_Transilations}
      />
    </div>
  );
};

export default CoursesHeader;
