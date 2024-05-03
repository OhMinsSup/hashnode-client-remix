import React from "react";
import styles from "./styles.module.css";
import { AspectRatio } from "~/components/ui/aspect-ratio";

export default function ImageGalleryCard() {
  // <div className={styles.item}></div>
  return (
    <>
      <button
        type="button"
        aria-label="Set unsplash cover image"
        className={styles.item_cover}
      >
        <AspectRatio ratio={16 / 9}>
          <img
            src="/images/placeholder-image.jpg"
            alt="MacBook Pro, white ceramic mug,and black smartphone on table"
            className="size-full"
          />
        </AspectRatio>
      </button>
      <p className={styles.item_label}>
        by{" "}
        <a href="#" className="font-semibold truncate">
          John Doe
        </a>
      </p>
    </>
  );
}
