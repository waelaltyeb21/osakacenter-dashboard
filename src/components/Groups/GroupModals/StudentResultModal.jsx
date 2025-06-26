import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import React from "react";

const StudentResultModal = ({
  selectedStudents,
  studentsResult,
  setStudentsResult,
}) => {
  const [opened, { open, close }] = useDisclosure();
  return (
    <section>
      <Button
        disabled={selectedStudents.length === 0}
        variant="filled"
        color="blue"
        onClick={open}
      >
        <IconEdit size={20} className="ml-2" />
        نتيجة الطلاب
      </Button>

      <Modal
        opened={opened}
        onClose={close}
        size="xl"
        title="Students Result"
      ></Modal>
    </section>
  );
};

export default StudentResultModal;
