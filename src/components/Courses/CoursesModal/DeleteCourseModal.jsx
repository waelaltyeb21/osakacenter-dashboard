"use client";
import { RequestController } from "@/lib/RequestController";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";

const DeleteCourseModal = ({
  id,
  OnCourseDataUpdated,
  Courses_Transilations,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const HandleDelete = async () => {
    const response = await RequestController(`/courses/delete/${id}`, "DELETE");
    if (response?.status === 200) {
      close();
      OnCourseDataUpdated();
    }
  };
  return (
    <article>
      <Button onClick={open} variant="outline" color="red">
        {Courses_Transilations("delete_course")}
      </Button>

      <Modal
        opened={opened}
        onClose={close}
        title={Courses_Transilations("delete_course")}
        size="xl"
      >
        <p>{Courses_Transilations("confirm_delete")}</p>

        <div className="flex justify-between items-center gap-4 mt-4">
          <Button onClick={HandleDelete} variant="outline" color="red">
            {Courses_Transilations("delete")}
          </Button>
          <Button onClick={close}>{Courses_Transilations("cancel")}</Button>
        </div>
      </Modal>
    </article>
  );
};

export default DeleteCourseModal;
