"use client";
import React, { useState } from "react";
import { Button, Checkbox, NumberInput, Table, TextInput } from "@mantine/core";
import { RequestController } from "@/lib/RequestController";
import { useRouter } from "next/navigation";
import { IconUsersMinus } from "@tabler/icons-react";

const AddGroupResult = ({ info, students: data }) => {
  const router = useRouter();
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [students, setStudents] = useState(
    data.map((student) => ({
      student: student.studentId,
      name: student.name,
      level: student.level,
      result: {
        reading: "",
        writing: "",
        listening: "",
        speaking: "",
      },
      overall: "-",
      rating: "-",
      ...info,
    }))
  );

  const RemoveSomeStudents = () => {
    setStudents((prev) =>
      prev.filter((student) => selectedStudents.includes(student.student))
    );
    selectedStudents.pop();
  };

  const HandleResultChange = (id, field, value) => {
    const CalculateOverall = (data) => {
      const skills = [
        data.reading,
        data.writing,
        data.speaking,
        data.listening,
      ];
      let total = 0;
      skills.map((skill) => {
        return (total += Number(skill));
      });
      return total / skills.length;
    };

    const CalculateRating = (overall) => {
      console.log("Overall: ", overall);
      if (overall > 90) return "Excelent";
      else if (overall > 80) return "Very Good";
      else if (overall > 70) return "Good";
      else if (overall > 60) return "Accepted";
      else if (overall > 50) return "Passed";
      else return "Faild";
    };

    setStudents((prev) => {
      const results = prev.map((result) => {
        if (result.student == id) {
          return {
            ...result,
            result: {
              ...result.result,
              [field]: Number(value),
            },
            overall: CalculateOverall({
              ...result.result,
              [field]: Number(value),
            }),
            rating: CalculateRating(
              CalculateOverall({
                ...result.result,
                [field]: Number(value),
              })
            ),
          };
        }
      });
      return results;
    });
  };

  const AddResults = async (event) => {
    event.preventDefault();
    const response = await RequestController("/results/group-result", "POST", {
      results: students,
      group: info?.group,
      level: info?.level,
    });
    if (response?.status === 201) {
      console.log(response.data.message);
      router.push("/results");
    }
  };
  return (
    <article>
      <Button
        variant="filled"
        color="red"
        className="mb-8"
        disabled={selectedStudents.length === 0}
        onClick={() => RemoveSomeStudents()}
      >
        ازالة الطلاب المحددين
        <IconUsersMinus className="mr-2" />
      </Button>
      {students.length != 0 ? (
        <form onSubmit={AddResults} className="overflow-x-scroll">
          <Table
            striped
            withColumnBorders
            withRowBorders
            withTableBorder
            className="overflow-x-scroll"
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th>#</Table.Th>
                <Table.Th>Full Name</Table.Th>
                <Table.Th>Reading</Table.Th>
                <Table.Th>Writing</Table.Th>
                <Table.Th>Listening</Table.Th>
                <Table.Th>Speaking</Table.Th>
                <Table.Th>Overall</Table.Th>
                <Table.Th>Rating</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {students?.map((std) => (
                <Table.Tr key={std?.student}>
                  {console.log("Std: ", std)}
                  <Table.Td>
                    <div className="flex items-center gap-4" key={std?.student}>
                      <Checkbox
                        aria-label="Select row"
                        className="cursor-pointer"
                        checked={selectedStudents?.find(
                          (std) => std?.student === std?.student
                        )}
                        onChange={(event) => {
                          setSelectedStudents(
                            event.currentTarget.checked
                              ? [...selectedStudents, std]
                              : selectedStudents?.filter(
                                  (stud) => stud?.student !== std?.student
                                )
                          );
                        }}
                      />
                      <span>{std?.student}</span>
                    </div>
                  </Table.Td>
                  <Table.Td>
                    <TextInput
                      className="w-full grow"
                      value={std?.name}
                      readOnly
                      onChange={(val) => {
                        HandleResultChange(
                          std?.student,
                          "name",
                          val.target.value
                        );
                      }}
                    />
                  </Table.Td>
                  <Table.Td>
                    <NumberInput
                      classNames="w-full"
                      maxLength={3}
                      max={100}
                      onChange={(val) =>
                        HandleResultChange(std?.student, "reading", val)
                      }
                    />
                  </Table.Td>
                  <Table.Td>
                    <NumberInput
                      classNames="w-full"
                      maxLength={3}
                      max={100}
                      onChange={(val) =>
                        HandleResultChange(std?.student, "writing", val)
                      }
                    />
                  </Table.Td>
                  <Table.Td>
                    <NumberInput
                      classNames="w-full"
                      maxLength={3}
                      max={100}
                      onChange={(val) =>
                        HandleResultChange(std?.student, "listening", val)
                      }
                    />
                  </Table.Td>
                  <Table.Td>
                    <NumberInput
                      classNames="w-full"
                      maxLength={3}
                      max={100}
                      onChange={(val) =>
                        HandleResultChange(std?.student, "speaking", val)
                      }
                    />
                  </Table.Td>
                  <Table.Td>
                    <span className="font-bold flex justify-center items-center">
                      {std?.overall}
                    </span>
                  </Table.Td>
                  <Table.Td>
                    <span className="font-bold flex justify-center items-center">
                      {std?.rating}
                    </span>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
          <Button type="submit" className="mt-8">
            Save
          </Button>
        </form>
      ) : (
        <article>No Students Found</article>
      )}
    </article>
  );
};

export default AddGroupResult;
