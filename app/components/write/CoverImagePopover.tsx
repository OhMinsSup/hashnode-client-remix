import React from "react";
import { Popover, Tab } from "@headlessui/react";
import {
  ImageIcon,
  UnsplashIcon,
  UploadIcon,
  XIcon,
  ArrowPathIcon,
} from "../ui/Icon";
import { ImageGrid, UploadPanel } from "./_components";
import { useWriteStore } from "~/stores/useWriteStore";

interface CoverImagePopoverProps {}

const CoverImagePopover: React.FC<CoverImagePopoverProps> = () => {
  const { upload } = useWriteStore();
  return (
    <Popover>
      <Popover.Button className="mr-2 flex flex-row items-center justify-center rounded-full border border-gray-200 px-3 py-1 text-center text-sm font-medium text-gray-700 outline-none">
        {upload.status === "uploading" ? (
          <ArrowPathIcon className="mr-2 h-5 w-5 animate-spin fill-current" />
        ) : (
          <ImageIcon className="mr-2 h-5 w-5 fill-current" />
        )}
        <span>Add Cover</span>
      </Popover.Button>

      <Popover.Panel
        className=" absolute left-0 top-full z-50 w-full overflow-auto rounded-lg border bg-white p-4 shadow-lg"
        style={{ maxWidth: "725px" }}
      >
        {({ close }) => (
          <>
            <button
              type="button"
              className="absolute top-0 right-0 m-2 inline-flex flex-row items-center justify-center rounded-full border border-transparent text-base font-medium text-gray-700 outline-none"
              onClick={() => {
                close();
              }}
            >
              <XIcon className="h-5 w-5 fill-current" />
            </button>
            <Tab.Group>
              <div className="mb-4 flex w-full flex-row border-b text-sm font-medium text-gray-600">
                <Tab.List className="flex flex-row">
                  <Tab
                    className={({ selected }) =>
                      `mr-2 flex items-center justify-center rounded-tl rounded-tr border-b-2 ${
                        selected
                          ? "border-blue-500 text-blue-500"
                          : "border-transparent"
                      } py-3 px-4 text-center font-semibold outline-none`
                    }
                  >
                    <UploadIcon className="mr-2 h-5 w-5 fill-current" />
                    <span>Upload</span>
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      `mr-2 flex items-center justify-center rounded-tl rounded-tr border-b-2 ${
                        selected
                          ? "border-blue-500 text-blue-500"
                          : "border-transparent"
                      } py-3 px-4 text-center font-semibold outline-none`
                    }
                  >
                    <UnsplashIcon className="mr-2 h-5 w-5 fill-current" />
                    <span>Images</span>
                  </Tab>
                </Tab.List>
              </div>
              <Tab.Panels>
                <Tab.Panel>
                  <UploadPanel />
                </Tab.Panel>
                <Tab.Panel>
                  <React.Suspense fallback={<>....Loading</>}>
                    <ImageGrid />
                  </React.Suspense>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </>
        )}
      </Popover.Panel>
    </Popover>
  );
};

export default CoverImagePopover;
