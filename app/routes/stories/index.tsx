import React from "react";
import classnames from "classnames";
import { Tab } from "@headlessui/react";
import { Link } from "@remix-run/react";
import {
  FeaturedIcon,
  FeaturedOutline,
  PersonalizedIcon,
  RecentIcon,
} from "~/components/ui/Icon";

const Stories = () => {
  return (
    <div className="relative col-span-7 min-w-0 pt-5 pb-24">
      <div className="overflow-hidden rounded-lg border bg-white">
        <Tab.Group>
          <div className="relative z-20 flex max-w-[100vw] flex-row justify-between border-b px-5 pt-2 font-medium text-gray-600">
            <Tab.List
              className="flex flex-row items-center overflow-auto"
              // style={{ overflow: "initial" }}
            >
              <Tab
                className={({ selected }) =>
                  classnames(
                    "mr-2 flex flex-row flex-nowrap items-center rounded-t border-b-2 px-2 py-3 font-semibold",
                    {
                      "border-b-blue-500 text-blue-500": selected,
                      "border-transparent": !selected,
                    }
                  )
                }
              >
                <PersonalizedIcon className="mr-2 h-5 w-5 fill-current" />
                <span className="whitespace-nowrap">Personalized</span>
              </Tab>
              <Tab
                className={({ selected }) =>
                  classnames(
                    "mr-2 flex flex-row flex-nowrap items-center rounded-t border-b-2 px-2 py-3 font-semibold",
                    {
                      "border-b-blue-500 text-blue-500": selected,
                      "border-transparent": !selected,
                    }
                  )
                }
              >
                <FeaturedOutline className="mr-2 h-5 w-5 fill-current" />
                <span className="whitespace-nowrap">Featured</span>
              </Tab>
              <Tab
                className={({ selected }) =>
                  classnames(
                    "mr-2 flex flex-row flex-nowrap items-center rounded-t border-b-2 px-2 py-3 font-semibold",
                    {
                      "border-b-blue-500 text-blue-500": selected,
                      "border-transparent": !selected,
                    }
                  )
                }
              >
                <RecentIcon className="mr-2 h-5 w-5 fill-current" />
                <span className="whitespace-nowrap">Recent</span>
              </Tab>
            </Tab.List>
            <div className="flex flex-row items-center"></div>
          </div>
          <Tab.Panels>
            <Tab.Panel>
              <div className="border-b px-5 py-5">
                {/* Header */}
                <div className="relative mb-2" data-header>
                  <div className="flex flex-row items-center break-words">
                    {/* Tumbnail */}
                    <div className="relative mr-3 block rounded-full">
                      <Link
                        to="/"
                        className=" relative z-10 block rounded-full border"
                      >
                        <div className="h-full w-full">
                          <div className="relative z-20 h-10 w-10 rounded-full bg-gray-100 xl:h-12 xl:w-12">
                            <img
                              alt="profile"
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiqSizWZqSm1U1zNtLzzDJa5eHMlM20CS4Rg&usqp=CAU"
                              className="h-full w-full rounded-full"
                            />
                          </div>
                        </div>
                      </Link>
                    </div>
                    {/* user info */}
                    <div className="text-base">
                      <div className="flex flex-row flex-wrap items-center">
                        <Link to="/" className="font-semibold text-gray-900">
                          Developer Avocado
                        </Link>
                      </div>
                      <div className="hidden flex-row flex-wrap items-center text-gray-500 md:flex">
                        <Link to="/">avocadev.hashnode.dev</Link>
                        <span className="mx-2 block font-bold text-gray-400">
                          ·
                        </span>
                        <Link to="/" className="text-gray-500">
                          Aug 24, 2022
                        </Link>
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/"
                    className="text- absolute top-0 right-0 m-0 flex-row items-center rounded-full border bg-emerald-50 px-2 py-1 text-xs font-bold uppercase text-amber-400 md:flex"
                  >
                    <FeaturedIcon className="mr-1 h-4 w-4 fill-current" />
                    <span className="tracking-wide text-emerald-600">
                      Featured
                    </span>
                  </Link>
                </div>
                {/* Header */}
                <div
                  className="flex flex-row flex-wrap items-start md:flex-nowrap"
                  data-content
                >
                  {/* Text Content */}
                  <div className="mb-3 w-full md:mb-0 md:flex-1 md:pr-5">1</div>
                  {/* Image Content */}
                  <div className="w-full flex-shrink-0 md:w-64">2</div>
                </div>
                <div data-footer></div>
              </div>
            </Tab.Panel>
            <Tab.Panel>Content 2</Tab.Panel>
            <Tab.Panel>Content 3</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default Stories;
