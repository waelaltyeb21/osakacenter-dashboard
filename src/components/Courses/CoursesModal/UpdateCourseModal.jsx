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
import React from "react";

const UpdateCourseModal = ({
  course,
  OnCourseDataUpdated,
  Courses_Transilations,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    onSubmitPreventDefault: "always",
    initialValues: {
      name: course.name,
      price: course.price,
      duration: course.duration,
      cover: course.cover || "",
      description: course.description,
      isAvailable: course?.isAvailable,
    },
    validate: {
      name: (value) => (value.length > 0 ? null : "يجب تعبئة الحقل"),
      price: (value) => (value.length != 0 ? null : "يجب تعبئة الحقل"),
      duration: (value) => (value.length != 0 ? null : "يجب تعبئة الحقل"),
      cover: (value) => (value != null ? null : "يجب تعبئة الحقل"),
      description: (value) => (value.length > 0 ? null : "يجب تعبئة الحقل"),
    },
  });

  const HandleSubmit = async () => {
    const data = new FormData();
    data.append("name", form.values.name);
    data.append("price", form.values.price);
    data.append("duration", form.values.duration);
    data.append("cover", form.values.cover);
    data.append("isAvailable", form.values.isAvailable);
    data.append("description", form.values.description);
    console.log("Values: ", form.values);

    const response = await RequestController(
      `/courses/update/${course._id}`,
      "PUT",
      data
    );

    if (response?.status === 200) {
      close();
      OnCourseDataUpdated();
    }
  };
  return (
    <article>
      <Button onClick={open}>{Courses_Transilations("update_course")}</Button>

      <Modal
        opened={opened}
        onClose={close}
        title={Courses_Transilations("update_course")}
        size="xl"
      >
        <form
          className="my-8 grid lg:md:grid-cols-2 gap-4"
          onSubmit={form.onSubmit(HandleSubmit)}
        >
          <TextInput
            label={Courses_Transilations("course")}
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
            id="isAvailable"
            checked={form.values.isAvailable}
            label={Courses_Transilations("isAvailable")}
            key={form.key("isAvailable")}
            {...form.getInputProps("isAvailable")}
          />
          <div className="col-span-2">
            <Button type="submit">{Courses_Transilations("save")}</Button>
          </div>
        </form>
      </Modal>
    </article>
  );
};

export default UpdateCourseModal;
