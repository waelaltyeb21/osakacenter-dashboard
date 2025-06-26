"use client";
import React from "react";
import { Button, Modal, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { RequestController } from "@/lib/RequestController";

const UpdateMagazineModal = ({
  MagazinesTransilations,
  magazine: data,
  OnMagazineDataUpdated,
}) => {
  const [opened, { open, close }] = useDisclosure();

  const form = useForm({
    onSubmitPreventDefault: "always",
    initialValues: {
      description: data.description,
      version: data.version,
    },
    validate: {
      description: (val) => (val ? null : "Fill The Filed,"),
      version: (val) => (val ? null : "Fill The Filed,"),
    },
  });

  const HandleUpdate = async () => {
    const response = await RequestController(
      `/magazines/update/${data._id}`,
      "PUT",
      form.values
    );
    if (response?.status === 200) {
      OnMagazineDataUpdated();
      close();
    }
  };
  return (
    <section>
      <Button onClick={open}>
        {MagazinesTransilations("update_magazine")}
      </Button>
      <Modal
        opened={opened}
        onClose={close}
        title={MagazinesTransilations("update_magazine")}
        size="xl"
      >
        <form
          className="grid grid-cols-1 gap-4"
          onSubmit={form.onSubmit(HandleUpdate)}
        >
          <TextInput
            label={MagazinesTransilations("version")}
            key={form.key("version")}
            {...form.getInputProps("version")}
          />
          <Textarea
            label={MagazinesTransilations("description")}
            className=""
            key={form.key("description")}
            {...form.getInputProps("description")}
          />
          <Button type="submit">
            {MagazinesTransilations("update_magazine")}
          </Button>
        </form>
      </Modal>
    </section>
  );
};

export default UpdateMagazineModal;
