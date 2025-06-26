"use client";
import {
  Button,
  FileInput,
  Input,
  Select,
  Switch,
  Textarea,
} from "@mantine/core";
import React from "react";

const UpdateForm = ({ HandleForm, course }) => {
  return (
    <section>
      <h1 className="text-2xl">تحديث بيانات الدورة</h1>
      <form className="my-8 grid lg:md:grid-cols-2 gap-4" onSubmit={HandleForm}>
        <Input.Wrapper label="اسم الدورة" withAsterisk>
          <Input
            type="text"
            id="course"
            value={course?.name}
            placeholder="اسم الدورة"
          />
        </Input.Wrapper>
        <Select
          label="المدة"
          placeholder="مدة الدورة"
          defaultChecked={course?.duration}
          withAsterisk
          data={["شهر", "شهران", "ستة شهور", "سنة", "سنتان"]}
        />
        <Input.Wrapper label="سعر الدورة" withAsterisk>
          <Input
            type="number"
            id="price"
            value={course?.price}
            placeholder="سعر الدورة"
          />
        </Input.Wrapper>
        <FileInput
          label="صورة غلاف الدورة"
          withAsterisk
          placeholder="اضغط لتحميل صورة الغلاف"
        />
        <Textarea
          label="وصف الدورة"
          withAsterisk
          value={course?.description}
          placeholder="وصف الدورة"
          className="col-span-2"
        />
        <Switch
          size="md"
          onLabel="ON"
          offLabel="OFF"
          defaultChecked={course?.isAvailable}
          label="متاح للتسجيل ؟"
        />
        <div className="col-span-2">
          <Button className="" type="submit">
            تحديث
          </Button>
        </div>
      </form>
    </section>
  );
};

const CreateForm = ({ HandleForm }) => {
  return (
    <section>
      <h1 className="text-2xl">اضافة دورة جديدة</h1>
      <form className="my-8 grid lg:md:grid-cols-2 gap-4" onSubmit={HandleForm}>
        <Input.Wrapper label="اسم الدورة" id="course" withAsterisk required>
          <Input type="text" placeholder="اسم الدورة" />
        </Input.Wrapper>
        <Select
          label="المدة"
          placeholder="مدة الدورة"
          withAsterisk
          required
          id="duration"
          data={["شهر", "شهران", "ستة شهور", "سنة", "سنتان"]}
        />
        <Input.Wrapper label="سعر الدورة" id="price" withAsterisk required>
          <Input type="number" placeholder="سعر الدورة" />
        </Input.Wrapper>
        <FileInput
          label="صورة غلاف الدورة"
          withAsterisk
          required
          id="cover"
          placeholder="اضغط لتحميل صورة الغلاف"
        />
        <Textarea
          label="وصف الدورة"
          withAsterisk
          required
          id="description"
          placeholder="وصف الدورة"
          className="col-span-2"
        />
        <Switch
          size="md"
          onLabel="ON"
          offLabel="OFF"
          defaultChecked
          id="isAvailable"
          label="متاح للتسجيل ؟"
        />
        <div className="col-span-2">
          <Button className="" type="submit">
            حفظ
          </Button>
        </div>
      </form>
    </section>
  );
};

const CourseForm = ({ course }) => {
  console.log("Course: ", course);
  const HandleForm = (event) => {
    event.preventDefault();
    const course = {
      name: event.target.course.value,
      duration: event.target.duration.value,
      price: event.target.price.value,
      cover: event.target.cover.value,
      description: event.target.description.value,
      isAvailable: event.target.isAvailable.checked,
    };
    console.log("Course: ", course);
  };
  if (!course) return <CreateForm HandleForm={HandleForm} />;
  return <UpdateForm HandleForm={HandleForm} course={course} />;
};

export default CourseForm;
