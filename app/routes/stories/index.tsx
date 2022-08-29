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
import { PostItem } from "~/components/common";

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
              {Array.from({ length: 10 }, (_, i) => (
                <PostItem key={i} />
              ))}
            </Tab.Panel>
            <Tab.Panel>
              {Array.from({ length: 10 }, (_, i) => (
                <PostItem key={i} />
              ))}
            </Tab.Panel>
            <Tab.Panel>
              {Array.from({ length: 10 }, (_, i) => (
                <PostItem key={i} />
              ))}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default Stories;
