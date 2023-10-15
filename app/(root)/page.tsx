import ThemeSwitcher from "@/components/theme/ThemeSwitcher";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  return (
    <main>
      <h1 className="text-green-500 dark:text-red-700">Starter</h1>
      <ThemeSwitcher />
    </main>
  );
}
