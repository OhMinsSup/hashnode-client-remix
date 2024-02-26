import { useRef } from "react";
import styles from "./styles.module.css";
import { cn, optimizeAnimation } from "~/utils/util";
import { useEventListener } from "~/libs/hooks/useEventListener";
import { getTargetElement } from "~/libs/browser-utils";
import { useAsideContext } from "~/components/shared/future/HashnodeAside/provider/aside";

export default function AsideFooter() {
  const $ele = useRef<HTMLDivElement>(null);
  const { changeScrollPosition } = useAsideContext();

  const scrollMethod = optimizeAnimation(() => {
    // 현재 스크롤 위치하고 $ele의 top 위치를 비교해서 $ele의 top이 현재 스크롤 위치보다 작으면 $ele의 top을 현재 스크롤 위치로 설정한다.
    const ele = getTargetElement($ele);
    if (!ele) return;

    const scrollPosition = window.scrollY;
    const $parent_aside = ele.parentElement?.parentElement?.parentElement;
    const parent_aside_height = $parent_aside?.clientHeight || 0;

    if (parent_aside_height < scrollPosition) {
      const ele_height = ele.clientHeight || 0;
      const height = parent_aside_height - ele_height;
      changeScrollPosition(height - 45);
    } else {
      changeScrollPosition(0);
    }
  });

  useEventListener("scroll", scrollMethod);

  return (
    <div className={styles.root} ref={$ele}>
      <div className="grid grid-cols-2 gap-y-2 ">
        <h3 className={styles.title}>External links</h3>
        <a
          className={styles.item_link}
          href="/feature-requests?source=others_feature_request"
          target="_Blank"
          rel="noopener"
        >
          Feature requests
        </a>
        <a
          className={styles.item_link}
          href="/changelog?source=others_changelog"
          target="_Blank"
          rel="noopener"
        >
          Changelog
        </a>
        <a
          className={styles.item_link}
          href="https://api.hashnode.com"
          target="_Blank"
          rel="noopener noreferrer"
        >
          Hashnode APIs
        </a>
        <h3 className={cn(styles.title, "mt-5")}>Company</h3>
        <a className={styles.item_link} href="/about?source=others_about">
          About
        </a>
        <a
          className={styles.item_link}
          href="https://status.hashnode.com"
          target="_Blank"
          rel="noopener noreferrer"
        >
          Service status
        </a>
        <a
          className={styles.item_link}
          href="https://townhall.hashnode.com"
          target="_Blank"
          rel="noopener noreferrer"
        >
          Official blog
        </a>
        <a className={styles.item_link} href="/media?source=others_press_kit">
          Press kit
        </a>
        <a className={styles.item_link} href="/support?source=others_support">
          Support
        </a>
        <a
          className={styles.item_link}
          href="https://careers.hashnode.com/jobs"
          target="_Blank"
          rel="noopener noreferrer"
        >
          Careers
        </a>
        <a
          className={styles.item_link}
          href="/acknowledgements?source=others_oss_ack"
        >
          OSS ACK
        </a>
        <h3 className={cn(styles.title, "mt-5")}>Connect with us</h3>
        <div className={styles.item_social_container}>
          <a
            className={styles.item_social}
            href="https://twitter.com/hashnode"
            target="_blank"
            aria-label="Follow Hashnode on Twitter"
            rel="noreferrer"
          >
            <svg fill="none" viewBox="0 0 20 20" width="20" height="20">
              <path
                fill="currentColor"
                d="M11.964 2.967c1.346-.504 2.898-.538 4.052.497l.304-.084c.609-.166 1.148-.314 1.712-.587a.623.623 0 0 1 .927.548.621.621 0 0 1-.024.17c-.153.598-.564 1.438-.899 2.095l-.235.457-.224.438c-.06.12-.104.21-.132.274l-.001.003a12.158 12.158 0 0 1-.437 3.2l-.001.003c-1.002 3.569-3.624 5.96-6.803 6.883-2.798.812-5.973.244-8.835-1.316a.625.625 0 0 1 .323-1.173c1.342.052 2.513-.326 3.69-.984-1.225-.695-2.076-1.52-2.64-2.41-.709-1.12-.933-2.298-.923-3.352.01-1.05.253-1.987.488-2.655a8.71 8.71 0 0 1 .435-1.025l.033-.062.01-.018.003-.006.001-.002.545.305-.545-.305a.626.626 0 0 1 1.054-.058c1.317 1.84 3.29 2.944 5.533 3.064V6.67c-.02-1.674 1.027-3.118 2.59-3.703Z"
              ></path>
            </svg>
          </a>
          <a
            className={styles.item_social}
            href="https://linkedin.com/company/hashnode"
            target="_blank"
            aria-label="Follow Hashnode on LinkedIn"
            rel="noreferrer"
          >
            <svg fill="none" viewBox="0 0 20 20" width="20" height="20">
              <path
                fill="currentColor"
                d="M1.875 5c0-1.726 1.4-3.125 3.125-3.125h10c1.726 0 3.125 1.4 3.125 3.125v10c0 1.726-1.4 3.125-3.125 3.125H5A3.125 3.125 0 0 1 1.875 15V5Zm4.792.625a.958.958 0 1 0 0 1.917.958.958 0 0 0 0-1.917Zm.625 3.542a.625.625 0 0 0-1.25 0v4.166a.625.625 0 1 0 1.25 0V9.167Zm3.333 4.166v-2.5a1.042 1.042 0 0 1 2.083 0v2.5a.625.625 0 1 0 1.25 0v-2.5a2.292 2.292 0 0 0-3.425-1.992.625.625 0 0 0-1.158.326v4.166a.625.625 0 1 0 1.25 0Z"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
          <a
            className={styles.item_social}
            href="https://instagram.com/hashnode"
            target="_blank"
            aria-label="Follow Hashnode on Instagram"
            rel="noreferrer"
          >
            <svg fill="none" viewBox="0 0 20 20" width="20" height="20">
              <path
                fill="currentColor"
                d="M7.625 10a2.375 2.375 0 1 1 4.75 0 2.375 2.375 0 0 1-4.75 0Z"
              ></path>
              <path
                fill="currentColor"
                d="M9.139 1.875h1.722c1.143 0 2.04 0 2.76.059.733.06 1.34.184 1.888.463a4.792 4.792 0 0 1 2.094 2.094c.28.549.403 1.155.463 1.888.059.72.059 1.617.059 2.76v1.722c0 1.143 0 2.04-.059 2.76-.06.733-.184 1.34-.463 1.888a4.792 4.792 0 0 1-2.094 2.094c-.549.28-1.155.403-1.888.463-.72.059-1.617.059-2.76.059H9.14c-1.143 0-2.04 0-2.76-.059-.733-.06-1.34-.184-1.888-.463a4.792 4.792 0 0 1-2.094-2.094c-.28-.549-.403-1.155-.463-1.888-.059-.72-.059-1.617-.059-2.76V9.14c0-1.143 0-2.04.059-2.76.06-.733.184-1.34.463-1.888a4.792 4.792 0 0 1 2.094-2.094c.549-.28 1.155-.403 1.888-.463.72-.059 1.617-.059 2.76-.059ZM14.125 4.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2ZM10 6.375a3.625 3.625 0 1 0 0 7.25 3.625 3.625 0 0 0 0-7.25Z"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
          <a
            className={styles.item_social}
            href="https://discord.gg/hashnode"
            target="_blank"
            aria-label="Join Hashnode's Discord Community"
            rel="noreferrer"
          >
            <svg fill="none" viewBox="0 0 20 20" width="20" height="20">
              <path
                fill="currentColor"
                d="M7.556 2.819a.52.52 0 0 1 .544.277l.293.57c.091-.01.196-.02.309-.03.382-.037.877-.074 1.295-.074.42 0 .916.037 1.299.073l.31.032.294-.571a.52.52 0 0 1 .544-.277c1.2.188 2.524.605 3.576 1.11a.52.52 0 0 1 .2.17 14.658 14.658 0 0 1 2.558 9.872.52.52 0 0 1-.205.363 14.155 14.155 0 0 1-4.404 2.207.521.521 0 0 1-.578-.234l-.577-.957a.34.34 0 0 1 .211-.503c.51-.13 1.014-.281 1.51-.445a.52.52 0 1 0-.354-.98c-1.409.466-2.89.825-4.381.825s-2.973-.36-4.382-.825a.52.52 0 1 0-.354.98c.497.164 1.001.316 1.512.445a.34.34 0 0 1 .21.504l-.577.956a.52.52 0 0 1-.578.235 14.157 14.157 0 0 1-4.404-2.207.52.52 0 0 1-.205-.364c-.394-3.87.786-7.35 2.557-9.872a.52.52 0 0 1 .201-.17 13.562 13.562 0 0 1 3.576-1.11ZM5.734 10c0 .926.676 1.68 1.498 1.68.835 0 1.498-.754 1.498-1.68.014-.92-.657-1.68-1.498-1.68-.835 0-1.498.754-1.498 1.68Zm7.038 1.68c-.822 0-1.498-.754-1.498-1.68 0-.926.663-1.68 1.498-1.68.841 0 1.511.76 1.498 1.68 0 .926-.657 1.68-1.498 1.68Z"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </div>
        <hr className={styles.divider} />
        <div className={styles.item_terms_container}>
          <a className={styles.item_link} href="/privacy">
            Privacy
          </a>
          <span className="inline-block mx-2 font-bold opacity-50 ">·</span>
          <a className={styles.item_link} href="/terms">
            Terms
          </a>
          <span className="inline-block mx-2 font-bold opacity-50 ">·</span>
          <span className={styles.copy_right}>© 2023 Hashnode</span>
        </div>
      </div>
    </div>
  );
}
