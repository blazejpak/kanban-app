"use client";

import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <section className="min-h-full flex flex-col justify-center items-center gap-4 text-center ">
      <h2 className="text-lg font-bold text-[#828FA3] ">
        You don't have any boards yet. Create a new one to get started.
      </h2>
      <Button onClick={() => {}} text="Create a Board" plus={false} />
    </section>
  );
}
