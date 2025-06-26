"use client";
import { Group, Text } from "@mantine/core";
import { Dropzone, PDF_MIME_TYPE } from "@mantine/dropzone";
import { IconFile, IconUpload, IconX } from "@tabler/icons-react";
import React from "react";

const HandleUploadedFiles = ({ form, magazine, setMagazine }) => {
  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  const GetSize = (fileSize) => {
    const size = (fileSize / (1024 * 1024)).toPrecision(2);
    return size < 1 ? `${size} KB` : `${size} MB`;
  };
  return (
    <div>
      {!magazine && (
        <Dropzone
          onDrop={(files) => {
            setMagazine(files[0]);
          }}
          onReject={(files) => console.log("rejected files", files)}
          maxSize={MAX_FILE_SIZE}
          accept={PDF_MIME_TYPE}
          multiple={false}
        >
          <Group
            justify="center"
            gap="xl"
            mih={220}
            style={{ pointerEvents: "none" }}
          >
            <Dropzone.Accept>
              <IconUpload
                size={52}
                color="var(--mantine-color-blue-6)"
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                size={52}
                color="var(--mantine-color-red-6)"
                stroke={1.5}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconFile
                size={52}
                color="var(--mantine-color-dimmed)"
                stroke={1.5}
              />
            </Dropzone.Idle>

            <div>
              <Text size="xl" inline>
                اسحب او اضغط لتحميل الملف
              </Text>
              <Text size="sm" c="dimmed" inline mt={7}>
                قم بإسحب الملف الى هنا, بشرط لا يزيد حجمه عن{" "}
                {MAX_FILE_SIZE / 1024 / 1024} MB
              </Text>
            </div>
          </Group>
        </Dropzone>
      )}

      {magazine && (
        <div className="w-full p-2 flex justify-between items-center bordered shadow-lg">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-slate-100 rounded-full">
              <IconFile size={48} />
            </div>
            <div>
              <h1 className="text-xl font-semibold">{magazine?.name}</h1>
              <h4>{GetSize(magazine?.size)}</h4>
            </div>
          </div>
          <IconX className="cursor-pointer" onClick={() => setMagazine(null)} />
        </div>
      )}
    </div>
  );
};

export default HandleUploadedFiles;
