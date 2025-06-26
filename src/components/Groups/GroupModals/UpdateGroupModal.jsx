"use client";
import React, { useState } from "react";
import { RequestController } from "@/lib/RequestController";
import { Button, Modal, Select } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";

const UpdateGroupModal = ({ group: data, id, OnGroupDataUpdated }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [group, setGroup] = useState(data);

  const GetGroupDetails = async () => {
    const req = await RequestController(`/groups/${id}`);
    if (req.status === 200) {
      open();
      setGroup({
        level: req?.data?.group?.level,
        course: req?.data?.group?.course,
        time: req?.data?.group?.time,
        status: req?.data?.group?.status,
      });
    }
  };
  const UpdateGroup = async (event) => {
    event.preventDefault();
    console.log("Group: ", group);
    const req = await RequestController(`/groups/update/${id}`, "PUT", group);
    if (req.status === 200) {
      OnGroupDataUpdated();
      close();
      setGroup({
        level: req?.data?.group?.level,
        course: req?.data?.group?.course,
        time: req?.data?.group?.time,
        status: req?.data?.group?.status,
      });
      console.log("Group: ", req.data);
    }
  };
  return (
    <article>
      <Button onClick={open}>تعديل المجموعة</Button>
      <Modal opened={opened} onClose={close} title="تعديل المجموعة" size="xl">
        <form
          className="my-8 grid lg:md:grid-cols-2 gap-4"
          onSubmit={UpdateGroup}
        >
          <Select
            withAsterisk
            label="المستوى"
            id="level"
            placeholder="كل المستويات"
            value={group?.level}
            data={[
              { value: "A1", label: "A1" },
              { value: "A2", label: "A2" },
              { value: "B1", label: "B1" },
              { value: "B2", label: "B2" },
              { value: "C1", label: "C1" },
              { value: "C2", label: "C2" },
            ]}
            withCheckIcon
            onChange={(val) => setGroup({ ...group, level: val })}
          />
          <Select
            withAsterisk
            label="الدورة"
            id="course"
            placeholder="كل الدورات"
            value={group?.course}
            data={[
              { value: "English", label: "English" },
              { value: "Spanish", label: "Spanish" },
              { value: "French", label: "French" },
            ]}
            onChange={(val) => setGroup({ ...group, course: val })}
          />
          <Select
            label="الحالة ( الحالة الافتراضية - تحت التسجيل )"
            defaultChecked="تحت التسجيل"
            id="status"
            value={group?.status}
            data={[
              { value: "Under Registration", label: "تحت التسجيل" },
              { value: "In Progress", label: "قيد التقدم" },
              { value: "Completed", label: "مكتملة" },
            ]}
            onChange={(val) => setGroup({ ...group, status: val })}
          />
          <TimeInput
            id="time"
            label="وقت القروب"
            placeholder="اختر الوقت"
            withAsterisk
            format="12"
            value={group?.time}
            onChange={(val) => setGroup({ ...group, time: val.target.value })}
          />
          <div className="col-span-2">
            <Button type="submit">حفظ</Button>
          </div>
        </form>
      </Modal>
    </article>
  );
};

export default UpdateGroupModal;
