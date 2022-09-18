import React from "react";
import { Link } from "@remix-run/react";
import { Logo } from "~/components/ui/Logo";

interface AuthTemplateProps {
  children: React.ReactNode;
}

const AuthTemplate: React.FC<AuthTemplateProps> = ({ children }) => {
  return (
    <div className="flex h-screen flex-col justify-between bg-gray-50 lg:block lg:h-auto">
      <section>
        <header className="border-b p-4">
          <div className="mx-auto flex w-full flex-row items-center justify-center sm:max-w-[640px] md:max-w-[768px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px]">
            <Link to={"/"} className="block text-neutral-900">
              <Logo />
            </Link>
          </div>
        </header>
        <main className="bg-gray-50 lg:min-h-[1024px]">
          <div className="mx-auto grid w-full min-w-full grid-cols-12 sm:max-w-[640px] md:max-w-[768px] lg:min-w-0 lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1536px]">
            <div className=" col-span-12 grid grid-cols-12 px-10 py-10 md:p-20">
              {/* form */}
              {children}
              {/* form */}
              {/* content */}
              <div className="hidden p-5 text-gray-900 md:col-[1/-1] md:block lg:col-span-6 lg:mt-16 lg:block">
                <div className="mx-auto w-2/3">
                  <section>
                    <p className="mb-5 text-lg text-gray-700">
                      "It's amazing to see how fast devs go from 0 to Blog under
                      a domain they own on Hashnode 🤯. It reminds me a lot of
                      what Substack did for journalists."
                    </p>
                  </section>
                </div>
              </div>
              {/* content */}
            </div>
          </div>
        </main>
      </section>
    </div>
  );
};

export default AuthTemplate;
