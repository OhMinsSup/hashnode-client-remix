import { cn } from "~/services/libs";
import styles from "./styles.module.css";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { Button } from "~/components/ui/button";
import { Icons } from "~/components/icons";

export default function WriteEditorHeader() {
  return (
    <div>
      <ScrollArea>
        <div className=" flex flex-row px-4 font-semibold whitespace-nowrap mb-10">
          <Button size="sm" variant="ghost" className="space-x-2">
            <Icons.media className="size-5" />
            <span>Add Cover</span>
          </Button>
          <Button size="sm" variant="ghost" className="space-x-2">
            <Icons.subtitle className="size-5" />
            <span>Add Subtitle</span>
          </Button>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="group relative">
        <textarea
          maxLength={150}
          placeholder="Article Title..."
          id="title-input"
          className={cn(styles.title)}
          style={{ height: "50px" }}
        />
      </div>
      <div className="group relative mt-3">
        <textarea
          maxLength={150}
          placeholder="Article Subtitle..."
          id="subtitle-input"
          className={cn(styles.subtitle)}
          style={{ height: "33px" }}
        />
        <Button
          size="sm"
          variant="ghost"
          className=" inline-flex absolute top-0 right-0"
        >
          <Icons.close />
        </Button>
      </div>
    </div>
  );
}
