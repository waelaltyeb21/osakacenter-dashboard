import { Button, Input, Select } from "@mantine/core";

const StudentsFilters = ({ data, filters, HandleChange, Reset }) => {
  const courses = data?.map((course) => {
    return { value: course._id, label: course.name };
  });
  return (
    <article className="w-full">
      <div className="w-full flex justify-between items-center gap-4">
        <Input.Wrapper className="w-full my-4">
          <Input
            type="search"
            placeholder="ابحث عن طالب"
            value={filters.student}
            onChange={(val) => HandleChange("student", val.target.value)}
          />
        </Input.Wrapper>
      </div>
      {/* flex justify-between items-center flex-wrap grow gap-4 */}
      <div className="grid lg:grid-cols-5 grid-cols-2 gap-4 mb-8">
        <Select
          label="الدورة"
          searchable
          onChange={(val) => HandleChange("course", val)}
          defaultValue={filters.course}
          value={filters.course}
          data={[...courses, { value: "", label: "الكل" }]}
        />
        <Select
          label="الترتيب"
          defaultValue="من الاحدث للاقدم"
          value={filters.sort === 1 ? "من الاقدم للاحدث" : "من الاحدث للاقدم"}
          onChange={(val) =>
            HandleChange("sort", (val = val === "من الاحدث للاقدم" ? -1 : 1))
          }
          data={["من الاحدث للاقدم", "من الاقدم للاحدث"]}
        />
        <Select
          label="السكن"
          searchable
          defaultValue="الكل"
          value={filters.address}
          onChange={(val) => HandleChange("address", val)}
          data={[
            { label: "All", value: "" },
            { label: "Riyadh", value: "Riyadh" },
            { label: "London", value: "London" },
            { label: "Doha", value: "Doha" },
            { label: "Cairo", value: "Cairo" },
            { label: "New York", value: "New York" },
          ]}
        />
        <Select
          label="حالة الدفع"
          defaultValue="الكل"
          data={[
            { label: "الكل", value: "" },
            { label: "Full Paid", value: "Full Paid" },
            { label: "Half Paid", value: "Half Paid" },
            { label: "Free", value: "Free" },
          ]}
          value={filters.paymentStatus}
          onChange={(val) =>
            HandleChange("paymentStatus", val === "All" ? "" : val)
          }
        />
        <Button
          className="flex self-end w-full lg:col-span-1 col-span-2"
          variant="outline"
          color="red"
          onClick={Reset}
        >
          حذف الفلترة
        </Button>
      </div>
    </article>
  );
};

export default StudentsFilters;
