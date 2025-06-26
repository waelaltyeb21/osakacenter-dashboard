"use client";
import { RequestController } from "@/lib/RequestController";
import {
  Button,
  FileInput,
  Modal,
  NumberInput,
  Switch,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconBook } from "@tabler/icons-react";
import React from "react";

const AddCourseModal = ({ OnCourseDataUpdated, Courses_Transilations }) => {
  const form = useForm({
    onSubmitPreventDefault: "always",
    initialValues: {
      name: "",
      price: "",
      duration: "",
      cover: null,
      description: "",
      isAvailables: false,
    },
    validate: {
      name: (value) => (value.length > 0 ? null : "يجب تعبئة الحقل"),
      price: (value) => (value.length != 0 ? null : "يجب تعبئة الحقل"),
      duration: (value) => (value.length != 0 ? null : "يجب تعبئة الحقل"),
      cover: (value) => (value != null ? null : "يجب تعبئة الحقل"),
      description: (value) => (value.length > 0 ? null : "يجب تعبئة الحقل"),
    },
  });
  const [opened, { open, close }] = useDisclosure();
  const HandleSubmit = async () => {
    const data = new FormData();
    data.append("name", form.values.name);
    data.append("price", form.values.price);
    data.append("duration", form.values.duration);
    data.append("cover", form.values.cover);
    data.append("description", form.values.description);

    const response = await RequestController("/courses/create", "POST", data);

    if (response?.status === 201) {
      OnCourseDataUpdated();
      close();
    }
  };
  return (
    <div>
      <Button onClick={open}>
        <IconBook size={20} className="inline ml-2" />
        {Courses_Transilations("add_course")}
      </Button>
      <Modal
        opened={opened}
        onClose={close}
        title={Courses_Transilations("add_course")}
        size="xl"
      >
        <form
          className="my-8 grid lg:md:grid-cols-2 gap-4"
          onSubmit={form.onSubmit(HandleSubmit)}
        >
          <TextInput
            label={Courses_Transilations("course_name")}
            id="name"
            withAsterisk
            key={form.key("name")}
            {...form.getInputProps("name")}
          />
          <TextInput
            label={Courses_Transilations("duration")}
            withAsterisk
            key={form.key("duration")}
            {...form.getInputProps("duration")}
          />

          <NumberInput
            label={Courses_Transilations("price")}
            id="price"
            withAsterisk
            key={form.key("price")}
            {...form.getInputProps("price")}
          />
          <FileInput
            label={Courses_Transilations("cover")}
            withAsterisk
            id="cover"
            key={form.key("cover")}
            {...form.getInputProps("cover")}
          />
          <Textarea
            label={Courses_Transilations("description")}
            withAsterisk
            id="description"
            className="col-span-2"
            key={form.key("description")}
            {...form.getInputProps("description")}
          />
          <Switch
            size="md"
            onLabel="ON"
            offLabel="OFF"
            defaultChecked
            id="isAvailable"
            label={Courses_Transilations("is_available")}
            key={form.key("isAvailable")}
            {...form.getInputProps("isAvailable")}
          />
          <div className="col-span-2">
            <Button type="submit">{Courses_Transilations("save")}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddCourseModal;
