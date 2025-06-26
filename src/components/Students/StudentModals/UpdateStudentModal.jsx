"use client";
import React, { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Button, Input, Modal, Select } from "@mantine/core";
import { RequestController } from "@/lib/RequestController";
import { IconUserEdit } from "@tabler/icons-react";

const UpdateStudentModal = ({ student: studentData, OnGroupDataUpdated }) => {
  const [opened, { open, close }] = useDisclosure();
  const [groups, setGroups] = useState([]);
  const [student, setStudent] = useState({
    name: "",
    phone: "",
    age: "",
    address: "",
    paymentStatus: "",
    group: "",
  });
  const GetStudent = async () => {
    try {
      const response = await RequestController(
        `/students/${studentData?.studentId}`
      );

      if (response.status === 200) {
        // Set Student Data
        setStudent({
          name: response?.data?.student?.name,
          phone: response?.data?.student?.phone,
          age: response?.data?.student?.age,
          address: response?.data?.student?.address,
          group: response?.data?.student?.group._id,
          paymentStatus: response?.data?.student?.paymentStatus,
        });
        // Set Groups
        const groups = response?.data?.groups.map((group) => {
          return {
            label: `${group.course} - ${group.supervisor} - ${group.level} - ${group.time}`,
            value: group._id,
          };
        });
        setGroups(groups);
        open();
      }
    } catch (error) {
      throw new Error(error?.response?.message || error?.message);
    }
  };
  const HandleUpdateStudent = async (event) => {
    event.preventDefault();

    const req = await RequestController(
      `/students/update/${studentData._id}`,
      "PUT",
      student
    );
    if (req.status === 200) {
      console.log("Student Updated Successfully");
      OnGroupDataUpdated();
      close();
    }
  };
  return (
    <article>
      <Button onClick={GetStudent}>
        <IconUserEdit />
        <span>تحديث بيانات الطالب</span>
      </Button>

      <Modal
        opened={opened}
        onClose={close}
        size="xl"
        title="تحديث بيانات الطالب"
      >
        <form onSubmit={HandleUpdateStudent} className="grid grid-cols-2 gap-4">
          <Input.Wrapper id="name" label="الاسم كامل">
            <Input
              type="text"
              value={student?.name}
              onChange={(event) =>
                setStudent({ ...student, name: event.target.value })
              }
            />
          </Input.Wrapper>

          <Input.Wrapper id="phone" label="الهاتف">
            <Input
              minLength={9}
              maxLength={12}
              type="number"
              value={student?.phone}
              onChange={(event) =>
                setStudent({ ...student, phone: event.target.value })
              }
            />
          </Input.Wrapper>

          <Input.Wrapper id="age" label="العمر">
            <Input
              type="number"
              value={student?.age}
              onChange={(event) =>
                setStudent({ ...student, age: event.target.value })
              }
            />
          </Input.Wrapper>

          <Select
            label="السكن"
            value={student?.address}
            data={[
              { value: "Riyadh", label: "الرياض" },
              { value: "London", label: "لندن" },
              { value: "Doha", label: "الدوحة" },
              { value: "Cairo", label: "القاهرة" },
              { value: "New York", label: "نيويورك" },
            ]}
            onChange={(val) => setStudent({ ...student, address: val })}
          />

          <Select
            label="القروب"
            value={student?.group}
            defaultValue={student?.group}
            data={groups}
            onChange={(val) => setStudent({ ...student, group: val })}
          />

          <Select
            label="حالة الدفع"
            value={student?.paymentStatus}
            data={[
              { value: "Full Paid", label: "مدفوع بالكامل" },
              { value: "Half Paid", label: "مدفوع جزئيا" },
              { value: "Free", label: "منحة مجانية" },
            ]}
            onChange={(val) => setStudent({ ...student, paymentStatus: val })}
          />
          <div className="col-span-2 block w-full">
            <Button className="block w-full" type="submit">
              <IconUserEdit />
              حفظ التعديلات
            </Button>
          </div>
        </form>
      </Modal>
    </article>
  );
};

export default UpdateStudentModal;
