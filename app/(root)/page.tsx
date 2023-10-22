import ThemeSwitcher from "@/components/theme/ThemeSwitcher";

export default async function Home() {
  return (
    <main>
      <h1 className="text-green-500 dark:text-red-700">Starter</h1>
      <ThemeSwitcher />
    </main>
  );
}
