import { RequestController } from "@/lib/RequestController";
import { Button, Input, Modal, Select } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconUserPlus } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

const AddStudentsModal = () => {
  const students = useTranslations("students.students-fields");
  const [opened, { open, close }] = useDisclosure();
  const [student, setStudent] = useState({
    name: "",
    phone: "",
    age: "",
    address: "",
    paymentStatus: "",
  });
  const HandleAddStudent = async (event) => {
    event.preventDefault();
    if (
      (student.address === "" || student.paymentStatus === "",
      student.phone.length < 9)
    ) {
      notifications.show({
        color: "red",
        title: "خطأ في البيانات",
        message: "يرجى ملء جميع الحقول المطلوبة.",
        position: "top-center",
      });
      return;
    }
    console.log("Student: ", student);
    return;
    const req = await RequestController(`/students/create`, "POST", student);
    if (req.status === 200 || req.status === 201) {
      console.log("Students Added Successfully");
      await OnGroupDataUpdated();
      close();
    }
  };
  return (
    <article>
      <Button onClick={open}>
        <span>اضافة طالب جديد</span>
        <IconUserPlus />
      </Button>

      <Modal opened={opened} onClose={close} size="xl" title="اضافة طالب جديد">
        <form
          className="grid lg:md:grid-cols-2 gap-4"
          onSubmit={HandleAddStudent}
        >
          <Input.Wrapper id="name" label="الاسم كامل">
            <Input
              required
              type="text"
              onChange={(event) =>
                setStudent({ ...student, name: event.target.value })
              }
            />
          </Input.Wrapper>
          <Input.Wrapper label="الهاتف" id="phone">
            <Input
              required
              minLength={9}
              maxLength={12}
              type="number"
              onChange={(event) =>
                setStudent({ ...student, phone: event.target.value })
              }
            />
          </Input.Wrapper>
          <Input.Wrapper label="العمر" id="age">
            <Input
              required
              type="number"
              onChange={(event) =>
                setStudent({ ...student, age: event.target.value })
              }
            />
          </Input.Wrapper>
          <Select
            label="المدينة"
            required
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
            className="col-span-2"
            label="حالة الدفع"
            required
            data={[
              { value: "Full Paid", label: "مدفوع بالكامل" },
              { value: "Half Paid", label: "مدفوع جزئيا" },
              { value: "Free", label: "منحة مجانية" },
            ]}
            onChange={(val) => setStudent({ ...student, paymentStatus: val })}
          />
          <div className="w-full flex justify-center items-center col-span-2">
            <Button className="block w-4/6 mt-8" type="submit">
              <IconUserPlus />
              اضافة طالب
            </Button>
          </div>
        </form>
      </Modal>
    </article>
  );
};

export default AddStudentsModal;
