import React from "react";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { RequestController } from "../../../lib/RequestController";

const DeleteGroupStudents = ({ selectedStudents, OnGroupDataUpdated }) => {
  const [opened, { close, open }] = useDisclosure(false);

  const HandleDeleteStudents = async (event) => {
    event.preventDefault();
    const req = await RequestController(`/students/students`, "DELETE", {
      studentIds: selectedStudents,
    });
    if (req && req.status === 200) {
      console.log("Students deleted successfully");
      OnGroupDataUpdated();
      close();
    }
  };
  return (
    <article>
      <Button
        disabled={selectedStudents.length === 0}
        variant="filled"
        color="red"
        onClick={open}
      >
        حذف الطلاب المحددين
      </Button>

      <Modal opened={opened} onClose={close} title="حذف الطلاب">
        <div className="text-xl my-8">
          <p>هل انت متأكد من حذف الطلاب من هذه المجموعة؟</p>
          <p className="text-red-400">لا يمكن التراجع عن هذه العملية</p>
        </div>
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={close}>
            إلغاء
          </Button>
          <Button color="red" onClick={HandleDeleteStudents}>
            حذف
          </Button>
        </div>
      </Modal>
    </article>
  );
};

export default DeleteGroupStudents;
