"use client";
import { Button, Divider } from "@mantine/core";
import { IconPdf } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";
import UpdateMagazineModal from "./MagazinesModals/UpdateMagazineModal";
import useFetch from "@/Hooks/useFetch";
import AddMagazineModal from "./MagazinesModals/AddMagazineModal";
import Loading from "@/app/Loading";
import DeleteMagazineModal from "./MagazinesModals/DeleteMagazineModal";
import { useTranslations } from "next-intl";

const MagazineList = () => {
  const MagazinesTransilations = useTranslations("magazines");
  const { data, isLoading, error, refresh } = useFetch(`/magazines`);
  if (isLoading) return <Loading />;
  if (error) throw new Error(error?.message);

  return (
    <div>
      <article className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">
          {MagazinesTransilations("title")}
        </h1>
        <AddMagazineModal
          MagazinesTransilations={MagazinesTransilations}
          OnMagazineDataUpdated={refresh}
        />
      </article>
      {data.magazines.length != 0 && (
        <div className="grid grid-cols-3 gap-4">
          {data?.magazines?.map((magazine) => (
            <div
              key={magazine._id}
              className="w-fit p-4 flex flex-col gap-4 bordered"
            >
              <div className="flex justify-between items-center">
                <IconPdf />
                <DeleteMagazineModal
                  MagazinesTransilations={MagazinesTransilations}
                  id={magazine._id}
                  OnMagazineDataUpdated={refresh}
                />
              </div>
              <h1 className="text-2xl font-semibold">{magazine.title}</h1>
              <h4>{magazine?.description}</h4>
              <Divider />
              <h5>{magazine?.version}</h5>
              <div className="w-full flex justify-between items-center gap-4">
                <Button
                  variant="outline"
                  color="blue"
                  component={Link}
                  href={`${process.env.NEXT_PUBLIC_SERVER_URL}/magazines/download/${magazine._id}`}
                >
                  <span>{MagazinesTransilations("download")}</span>
                </Button>
                <UpdateMagazineModal
                  MagazinesTransilations={MagazinesTransilations}
                  magazine={magazine}
                  OnMagazineDataUpdated={refresh}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      {data.magazines.length == 0 && (
        <article>
          <h1>{MagazinesTransilations("no_magazines")}</h1>
        </article>
      )}
    </div>
  );
};

export default MagazineList;
