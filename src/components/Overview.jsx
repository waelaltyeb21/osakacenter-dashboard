import React from "react";

const Overviews = ({ statics }) => {
  console.log("Statics:", statics);
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      {statics?.map((stat, index) => (
        <div key={index} className="p-4 bordered">
          <div className="flex justify-between items-center mb-4">
            <div className="text-2xl">{stat?.name}</div>
            <span>{stat?.icon}</span>
          </div>
          <div className="flex gap-2">
            <span>{stat?.groups_count}</span>
            <span>مجموعات</span>
          </div>
          <div className="flex gap-2">
            <span>{stat?.students_count}</span>
            <span>طلاب</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Overviews;
