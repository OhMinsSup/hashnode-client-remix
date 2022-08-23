import { Outlet } from "@remix-run/react";
import { Main } from "~/components/ui/Content";
import { Header } from "~/components/ui/Header";

export default function Stories() {
  return (
    <div className="min-h-screen bg-gray-50 text-zinc-800">
      <Header />
      <main className="2xl:gridcols-12 relative z-40 grid min-h-screen w-full min-w-full gap-4 sm:max-w-[640px] md:max-w-3xl lg:max-w-full lg:grid-cols-12 lg:px-2 xl:mx-auto xl:min-w-0 xl:max-w-full xl:grid-cols-12 xl:px-4 2xl:mx-auto 2xl:min-w-0 2xl:max-w-[1536px] 2xl:px-0">
        <Main>
          <Outlet />
        </Main>
      </main>
    </div>
  );
}
