"use client";
import { RequestController } from "@/lib/RequestController";
import { Button, Modal, Select } from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import React from "react";

const AddGroupModal = ({ supervisors, courses, title, onGroupDataUpdated }) => {
  const GroupForm = useForm({
    onSubmitPreventDefault: "always",
    initialValues: {
      course: "",
      level: "A1",
      time: "",
      status: "تحت التسجيل",
      startingDate: new Date(),
      supervisor: "",
    },
    validate: {
      course: (val) => (val ? null : "Fill The Filed,"),
      level: (val) => (val ? null : "Fill The Filed,"),
      time: (val) => (val ? null : "Fill The Filed,"),
      status: (val) => (val ? null : "Fill The Filed,"),
      startingDate: (val) => (val ? null : "Fill The Filed,"),
      supervisor: (val) => (val ? null : "Fill The Filed,"),
    },
  });
  const courseOptions = courses?.map((course) => ({
    value: course._id,
    label: course.name,
  }));

  const supervisorsOptions = supervisors?.map((supervisor) => ({
    value: supervisor._id,
    label: supervisor.name,
  }));
  const [opened, { close, open }] = useDisclosure(false);

  const HandleForm = async () => {
    const req = await RequestController(
      `/groups/create`,
      "POST",
      GroupForm.values
    );
    if (req.status === 200 || req.status === 201) {
      onGroupDataUpdated();
      close();
    }
  };
  return (
    <article>
      <Button onClick={open}>{title}</Button>
      <Modal opened={opened} onClose={close} title="اضافة قروب جديدة" size="xl">
        <form
          className="my-8 grid lg:md:grid-cols-2 gap-4"
          onSubmit={GroupForm.onSubmit(HandleForm)}
        >
          <Select
            withAsterisk
            label="المستوى"
            id="level"
            placeholder="كل المستويات"
            data={[
              { value: "A1", label: "A1" },
              { value: "A2", label: "A2" },
              { value: "B1", label: "B1" },
              { value: "B2", label: "B2" },
              { value: "C1", label: "C1" },
              { value: "C2", label: "C2" },
            ]}
            withCheckIcon
            key={GroupForm.key("level")}
            {...GroupForm.getInputProps("level")}
          />
          <Select
            withAsterisk
            label="الدورة"
            id="course"
            placeholder="كل الدورات"
            data={courseOptions}
            key={GroupForm.key("course")}
            {...GroupForm.getInputProps("course")}
          />
          <Select
            withAsterisk
            label="المشرف"
            id="supervisor"
            placeholder="اختر المشرف"
            data={supervisorsOptions}
            key={GroupForm.key("supervisor")}
            {...GroupForm.getInputProps("supervisor")}
          />
          <Select
            label="الحالة ( الحالة الافتراضية - تحت التسجيل )"
            defaultChecked="تحت التسجيل"
            id="status"
            data={[
              { value: "Under Registration", label: "تحت التسجيل" },
              { value: "In Progress", label: "قيد التقدم" },
              { value: "Completed", label: "مكتملة" },
            ]}
            key={GroupForm.key("status")}
            {...GroupForm.getInputProps("status")}
          />
          <TimeInput
            id="time"
            label="وقت القروب"
            placeholder="اختر الوقت"
            withAsterisk
            format="12"
            key={GroupForm.key("time")}
            {...GroupForm.getInputProps("time")}
          />
          <DatePickerInput
            id="date"
            label="بداية القروب"
            placeholder="اختر التاريخ"
            key={GroupForm.key("startingDate")}
            {...GroupForm.getInputProps("startingDate")}
          />
          <div className="col-span-2">
            <Button type="submit">حفظ</Button>
          </div>
        </form>
      </Modal>
    </article>
  );
};

export default AddGroupModal;
