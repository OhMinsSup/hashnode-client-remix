import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Icons } from "~/components/icons";
import { ImageGalleryCardList } from "~/components/write/future/ImageGalleryCardList";

const schema = z.object({
  keyword: z.string().optional(),
});

type FormFieldValues = z.infer<typeof schema>;

export default function ImageGallery() {
  const form = useForm<FormFieldValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      keyword: "",
    },
  });

  const onSubmit = (input: FormFieldValues) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(input);
  };

  return (
    <div className="pt-4">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-row w-full space-x-2 mb-5"
      >
        <div className="relative flex-1">
          <Icons.search className="absolute left-2 top-2.5 size-4 text-muted-foreground" />
          <Input
            type="text"
            autoComplete="off"
            className="px-8"
            placeholder="Type something and press enter"
            //   value={query}
            //   onChange={onChange}
            //   onKeyDown={onKeyDown}
          />
          <Icons.close
            className="absolute right-2 top-2.5 size-4 text-muted-foreground"
            onClick={() => {
              //   setQuery('');
            }}
          />
        </div>
        <Button type="submit" className=" inline-flex">
          Search
        </Button>
      </form>
      <ImageGalleryCardList />
    </div>
  );
}
