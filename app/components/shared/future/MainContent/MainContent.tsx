import styles from "./styles.module.css";
import { cn } from "~/services/libs";

interface MainContentProps {
  children: React.ReactNode;
  aside?: React.ReactNode;
}

export default function MainContent({ children, aside }: MainContentProps) {
  return (
    <>
      <div className={cn(styles.root)}>{children}</div>
      <aside className={cn(styles.aside)}>{aside}</aside>
    </>
  );
}
