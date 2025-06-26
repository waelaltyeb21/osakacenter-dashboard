"use client";
import { RequestController } from "@/lib/RequestController";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import React from "react";

const DeleteMagazineModal = ({
  id,
  OnMagazineDataUpdated,
  MagazinesTransilations,
}) => {
  const [opened, { open, close }] = useDisclosure();

  const HandleDelete = async () => {
    const response = await RequestController(
      `/magazines/delete/${id}`,
      "DELETE"
    );
    if (response?.status === 200) {
      OnMagazineDataUpdated();
      close();
    }
  };
  return (
    <article>
      <div
        onClick={() => {
          open();
          console.log("Clicked");
        }}
      >
        <IconTrash className="self-end cursor-pointer" color="red" />
      </div>

      <Modal
        opened={opened}
        onClose={close}
        title={MagazinesTransilations("delete_magazine")}
        size="xl"
      >
        <p>{MagazinesTransilations("confirm_delete")}</p>
        <Button onClick={HandleDelete} className="mt-4">
          {MagazinesTransilations("delete")}
        </Button>
      </Modal>
    </article>
  );
};

export default DeleteMagazineModal;
