import { Button } from "@mantine/core";
import Link from "next/link";
import React from "react";

const Heading = ({ title1, title2, link, icon }) => {
  return (
    <article className="mb-4 flex justify-between items-center">
      <h1 className="text-2xl font-semibold">{title1}</h1>
      {title2 && (
        <Button>
          {icon && icon}
          <Link href={link}>{title2}</Link>
        </Button>
      )}
    </article>
  );
};

export default Heading;
