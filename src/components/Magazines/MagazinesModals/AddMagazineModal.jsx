"use client";
import { Button, Modal, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconNews } from "@tabler/icons-react";
import React, { useState } from "react";
import HandleUploadedFiles from "../HandleUploadedFiles";
import { RequestController } from "@/lib/RequestController";

const AddMagazineModal = ({
  MagazinesTransilations,
  OnMagazineDataUpdated,
}) => {
  const [opened, { open, close }] = useDisclosure();
  const [magazine, setMagazine] = useState(null);
  const version = `${new Date().getFullYear()} ${new Date().toLocaleString(
    "en-US",
    { month: "long" }
  )}`;

  const form = useForm({
    onSubmitPreventDefault: "always",
    initialValues: {
      description: "",
      version: version,
    },
    validate: {
      description: (val) => (val ? null : "Fill The Filed,"),
      version: (val) => (val ? null : "Fill The Filed,"),
    },
  });

  const AddNewMagazine = async () => {
    if (!magazine) return alert("Please Upload a File");

    const data = new FormData();
    data.append("magazine", magazine);
    data.append("version", form.values.version);
    data.append("description", form.values.description);

    const response = await RequestController("/magazines/create", "POST", data);
    if (response.status === 201) {
      OnMagazineDataUpdated();
      close();
    }
  };
  return (
    <article>
      <Button onClick={open}>
        <span>{MagazinesTransilations("add_magazine")}</span>
        <IconNews />
      </Button>

      <Modal
        opened={opened}
        onClose={close}
        title={MagazinesTransilations("add_magazine")}
        size="xl"
      >
        <form
          className="flex flex-col gap-4"
          onSubmit={form.onSubmit(AddNewMagazine)}
        >
          <TextInput
            required
            label={MagazinesTransilations("version")}
            key={form.key("version")}
            {...form.getInputProps("version")}
          />
          <Textarea
            required
            label={MagazinesTransilations("description")}
            className="col-span-2"
            key={form.key("description")}
            {...form.getInputProps("description")}
          />
          <HandleUploadedFiles magazine={magazine} setMagazine={setMagazine} />
          <Button type="submit" className="mt-8">
            {MagazinesTransilations("save_magazine")}
          </Button>
        </form>
      </Modal>
    </article>
  );
};

export default AddMagazineModal;
