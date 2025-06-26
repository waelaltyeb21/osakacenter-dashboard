"use client";
import { RequestController } from "@/lib/RequestController";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import React from "react";

const DeleteGroupModal = ({ id }) => {
  const [opened, { close, open }] = useDisclosure(false);
  const { push } = useRouter();
  const DeleteGroup = async (event) => {
    event.preventDefault();
    try {
      const response = await RequestController(
        `/groups/delete/${id}`,
        "DELETE"
      );

      if (response.status === 200) {
        close();
        push("/groups");
      }
    } catch (error) {
      throw new Error("Error adding group");
    }
  };
  return (
    <article>
      <Button variant="outline" color="red" onClick={open}>
        حذف المجموعة
      </Button>
      <Modal opened={opened} onClose={close} title="حذف المجموعة">
        <div className="text-xl my-8">
          <p>هل انت متاكد من حذف المجموعة؟</p>
          <p className="text-red-400">لا يمكن التراجع من هذه العملية</p>
        </div>
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={close}>
            الغاء
          </Button>
          <Button color="red" onClick={DeleteGroup}>
            حذف المجموعة
          </Button>
        </div>
      </Modal>
    </article>
  );
};

export default DeleteGroupModal;
