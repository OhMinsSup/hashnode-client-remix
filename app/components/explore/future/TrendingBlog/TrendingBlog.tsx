import React from "react";
import styles from "./styles.module.css";

export default function TrendingBlog() {
  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.inner_container}>
          <div className={styles.layout}>
            <div className={styles.rank_title}>#1</div>
            <div className="w-full">
              <div className={styles.title}>
                <div className={styles.title_container}>
                  <div className="mr-2">
                    <a
                      href="https://vinitshahdeo.dev"
                      target="_blank"
                      rel="noopener"
                    >
                      <div className="w-full h-full">
                        <div className={styles.image_container}>
                          <img
                            alt="git [w]init - a dev blog by vinitshahdeo"
                            src="https://cdn.hashnode.com/res/hashnode/image/upload/v1621668723836/QQk0Kfepy.jpeg?w=500&amp;h=500&amp;fit=crop&amp;crop=faces&amp;auto=compress,format&amp;format=webp"
                            decoding="async"
                            data-nimg="fill"
                            className="rounded-full"
                          />
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className={styles.title_wrapper}>
                    <h3 className={styles.title_text}>
                      <a
                        href="https://vinitshahdeo.dev"
                        target="_blank"
                        rel="noopener"
                        aria-label="Blog name"
                      >
                        git [w]init - a dev blog by vinitshahdeo
                      </a>
                    </h3>
                    <a
                      aria-label="vinitshahdeo.dev"
                      href="https://vinitshahdeo.dev"
                      target="_blank"
                      rel="noopener"
                      className={styles.title_desc}
                    >
                      vinitshahdeo.dev
                    </a>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    aria-label="Follow blog"
                    className={styles.btn_follow}
                  >
                    <svg viewBox="0 0 384 512">
                      <path d="M368 224H224V80c0-8.84-7.16-16-16-16h-32c-8.84 0-16 7.16-16 16v144H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h144v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V288h144c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z"></path>
                    </svg>
                    {/* <svg viewBox="0 0 24 24">
                      <path fill="none" d="M0 0h24v24H0V0z"></path>
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path>
                    </svg> */}
                    <span>
                      Follow
                      {/* Following */}
                    </span>
                  </button>
                </div>
              </div>
              <div className={styles.content}>
                <div className={styles.content_container}>
                  <a
                    href="https://vinitshahdeo.dev/saying-goodbye-to-postman"
                    target="_blank"
                    rel="noopener"
                    className={styles.item}
                  >
                    <span className={styles.item_date}>28 Aug, 2023</span>
                    <span className="font-medium">
                      Saying Goodbye to Postman: A Journey of Growth,
                      Innovation, and Friendship
                    </span>
                  </a>
                  <a
                    href="https://vinitshahdeo.dev/saying-goodbye-to-postman"
                    target="_blank"
                    rel="noopener"
                    className={styles.item}
                  >
                    <span className={styles.item_date}>28 Aug, 2023</span>
                    <span className="font-medium">
                      Saying Goodbye to Postman: A Journey of Growth,
                      Innovation, and Friendship
                    </span>
                  </a>
                  <a
                    href="https://vinitshahdeo.dev/saying-goodbye-to-postman"
                    target="_blank"
                    rel="noopener"
                    className={styles.item}
                  >
                    <span className={styles.item_date}>28 Aug, 2023</span>
                    <span className="font-medium">
                      Saying Goodbye to Postman: A Journey of Growth,
                      Innovation, and Friendship
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
