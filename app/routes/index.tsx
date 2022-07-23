import { Header } from "~/components/ui/Header";

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-50 text-zinc-800">
      <Header />
      <main className="relative z-40 grid min-h-screen w-full">main</main>
    </div>
  );
}
