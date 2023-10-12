import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();
  console.log(user);

  if (!user) redirect("/sign-in");

  return (
    <main>
      <h1>Starter</h1>
    </main>
  );
}
