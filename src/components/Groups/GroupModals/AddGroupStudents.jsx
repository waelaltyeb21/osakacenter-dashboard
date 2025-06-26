"use client";
import { RequestController } from "@/lib/RequestController";
import { Button, Input, Modal, Select, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconUserPlus } from "@tabler/icons-react";
import React, { useState } from "react";
// 173 =>
const AddGroupStudents = ({ groupId, OnGroupDataUpdated }) => {
  const [opened, { close, open }] = useDisclosure(false);
  const [student, setStudent] = useState({
    name: "",
    phone: "",
    age: "",
    address: "",
    paymentStatus: "",
    group: groupId,
  });
  const HandleAddStudent = async (event) => {
    event.preventDefault();
    if (
      (student.address === "" || student.status === "",
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
    const req = await RequestController(`/students/create`, "POST", student);
    if (req.status === 200 || req.status === 201) {
      console.log("Students Added Successfully");
      await OnGroupDataUpdated();
      close();
    }
  };
  return (
    <article>
      <Modal opened={opened} onClose={close} title="اضافة طالب جديد" size="">
        <form onSubmit={HandleAddStudent}>
          <Table striped withTableBorder withColumnBorders verticalSpacing="sm">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>الاسم كامل</Table.Th>
                <Table.Th>الهاتف</Table.Th>
                <Table.Th>العمر</Table.Th>
                <Table.Th>السكن</Table.Th>
                <Table.Th>حالة الدفع</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody id="student-rows">
              <Table.Tr>
                <Table.Td>
                  <Input.Wrapper id="name">
                    <Input
                      required
                      type="text"
                      onChange={(event) =>
                        setStudent({ ...student, name: event.target.value })
                      }
                    />
                  </Input.Wrapper>
                </Table.Td>
                <Table.Td>
                  <Input.Wrapper id="phone">
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
                </Table.Td>
                <Table.Td>
                  <Input.Wrapper id="age">
                    <Input
                      required
                      type="number"
                      onChange={(event) =>
                        setStudent({ ...student, age: event.target.value })
                      }
                    />
                  </Input.Wrapper>
                </Table.Td>
                <Table.Td>
                  <Select
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
                </Table.Td>

                <Table.Td>
                  <Select
                    required
                    data={[
                      { value: "Full Paid", label: "مدفوع بالكامل" },
                      { value: "Half Paid", label: "مدفوع جزئيا" },
                      { value: "Free", label: "منحة مجانية" },
                    ]}
                    onChange={(val) =>
                      setStudent({ ...student, paymentStatus: val })
                    }
                  />
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
          <div className="flex justify-center items-center">
            <Button className="block w-4/6 mt-8" type="submit">
              <IconUserPlus />
              اضافة طالب
            </Button>
          </div>
        </form>
      </Modal>

      <Button variant="filled" color="blue" onClick={open}>
        <IconUserPlus size={20} className="ml-2" />
        اضافة طالب
      </Button>
    </article>
  );
};

export default AddGroupStudents;
