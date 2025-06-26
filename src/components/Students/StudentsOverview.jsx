import React from "react";

const StudentsOverview = ({ statics }) => {
  return (
    <div className="w-full grid lg:grid-cols-4 grid-cols-2 gap-4 mb-8">
      {statics?.map((stat, index) => (
        <div key={index} className="p-4 bordered">
          <div className="flex justify-between items-center mb-4">
            <div className="text-2xl">{stat?.value}</div>
          </div>
          <h3 className="text-xl font-semibold">{stat?.label}</h3>
        </div>
      ))}
    </div>
  );
};

export default StudentsOverview;
