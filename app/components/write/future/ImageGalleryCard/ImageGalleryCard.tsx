import { AspectRatio } from '~/components/ui/aspect-ratio';
import { useWriteFormContext } from '~/components/write/context/useWriteFormContext';
import styles from './styles.module.css';

interface ImageGalleryCardProps {
  data: SerializeSchema.SerializeFile;
}

export default function ImageGalleryCard({ data }: ImageGalleryCardProps) {
  const { setValue } = useWriteFormContext();
  return (
    <>
      <button
        type="button"
        aria-label="Set unsplash cover image"
        className={styles.item_cover}
        onClick={() => {
          setValue('image', data.publicUrl);
        }}
      >
        <AspectRatio ratio={16 / 9}>
          <img
            src={data.publicUrl}
            alt="MacBook Pro, white ceramic mug,and black smartphone on table"
            className="size-full"
          />
        </AspectRatio>
      </button>
      <p className={styles.item_label}>
        by{' '}
        <a
          href={data.publicUrl}
          rel="noopener nofollow noreferrer"
          target="_blank"
          className="truncate font-semibold"
        >
          {data.filename}
        </a>
      </p>
    </>
  );
}
