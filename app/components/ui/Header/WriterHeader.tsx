import React from "react";
import { Link } from "@remix-run/react";
import { Logo as RemixLogo } from "~/components/ui/Logo";
import { PublishButton, ToggleMoreOptions } from "./_components";

interface WriterHeaderProps {}

const WriterHeader: React.FC<WriterHeaderProps> = () => {
  return (
    <div className="border-b p-4 2xl:px-5">
      <div className="mx-auto flex w-full flex-row items-center justify-between sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px]">
        <Link to={"/"} className="block w-8 flex-shrink-0 sm:w-10 md:w-40">
          <RemixLogo className="h-5 w-full fill-current" />
        </Link>
        <div className="relative flex flex-row">
          <ToggleMoreOptions />
          <PublishButton />
        </div>
      </div>
    </div>
  );
};

export default WriterHeader;
