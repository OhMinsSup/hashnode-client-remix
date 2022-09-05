import { useLoaderData } from "@remix-run/react";
import React, { useRef, useState } from "react";
import { useMedia } from "react-use";
import { getTargetElement } from "~/libs/browser-utils";
import { useEventListener } from "~/libs/hooks/useEventListener";
import { optimizeAnimation } from "~/utils/util";
import { MenuLinks, TrendingTags } from "../_components";

const GAP_SIZE = 32;

const LeftSidebar = () => {
  const { trendingTags } = useLoaderData<{ trendingTags: any[] }>();

  const isWide = useMedia("(min-width: 1260px)", false);
  const divRef = useRef<HTMLDivElement | null>(null);

  const [isSticky, setIsSticky] = useState(false);
  const [width, setWidth] = useState<number | null>(null);

  const handleScroll = optimizeAnimation(() => {
    const el = getTargetElement(divRef);
    if (!el) return;

    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;

    // 스크롤이 최상단에서 90px 이하로 내려가면 sticky 처리
    if (scrollTop <= 90) {
      setIsSticky(false);
      setWidth(null);
    } else {
      setIsSticky(true);
      // 현재 화면의 가로 사이즈를 구해서 divRef 사이즈를 조정해준다.
      const $main = document.querySelector("main");
      if (!$main) return;

      const $left = $main.children.item(0) as HTMLElement | null;
      const $content = $main.children.item(1) as HTMLElement | null;
      const $right = $main.children.item(2) as HTMLElement | null;

      if (!$left || !$content || !$right) return;
      // right와 content의 사이즈를 구해서 left의 사이즈를 조정해준다.
      const leftClientRect = $left.getBoundingClientRect();
      const contentClientRect = $content.getBoundingClientRect();
      const rightClientRect = $right.getBoundingClientRect();
      const totalWidth = contentClientRect.width - rightClientRect.width;
      const newLeftWidth = totalWidth - leftClientRect.width - GAP_SIZE;
      setWidth(newLeftWidth);
    }
  });

  useEventListener("scroll", handleScroll, {
    passive: true,
  });

  return (
    <div
      className="relative z-50 col-span-2 hidden lg:block"
      style={{
        minHeight: isWide ? "710px" : "750px",
      }}
    >
      <div
        ref={divRef}
        style={{
          transform: "translateZ(0px)",
          ...(isSticky && {
            position: "fixed",
            top: "0px",
            ...(width && { width: `${width}px` }),
          }),
        }}
      >
        <div className="my-5 flex flex-col overflow-y-auto overflow-x-hidden rounded-lg border bg-white py-2 text-gray-900">
          <div className="mb-10 flex-1">
            <MenuLinks />
            <TrendingTags
              trendingTags={trendingTags.map((tag) => ({
                id: tag.node.id,
                count: tag.count,
                name: tag.node.name,
                slug: tag.node.slug,
              }))}
            />
            <div className="mb-5 flex flex-col items-start px-4 text-center text-sm text-gray-600">
              <hr className="my-5 h-[1px] w-[25%]" />
              <p>© {new Date().getFullYear()} Solid</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
