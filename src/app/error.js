"use client";
const error = ({ error }) => {
  console.error("Error: ", error);
  return (
    <section className="min-h-dvh flex justify-center items-center">
      <h1 className="text-2xl font-semibold text-red-600">
        {error?.message || "Something went wrong"}
      </h1>
    </section>
  );
};

export default error;
