import React from 'react';

import { AspectRatio } from '~/components/ui/aspect-ratio';
import styles from './styles.module.css';

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
        by{' '}
        <a href="#" className="truncate font-semibold">
          John Doe
        </a>
      </p>
    </>
  );
}
