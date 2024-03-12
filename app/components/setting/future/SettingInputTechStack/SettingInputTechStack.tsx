import React, {
  useCallback,
  useMemo,
  useState,
  useTransition,
  useEffect,
} from "react";
import styles from "./styles.module.css";
import { useSettingTagsContext } from "~/components/setting/context/setting-tag";
import { FORM_ID } from "~/components/setting/context/form";
import { Icons } from "~/components/shared/Icons";
import { useTagListQuery } from "~/routes/api.v1.tags[.]json";
import { cn } from "~/utils/util";
import { useFormMetadata } from "@conform-to/react";
import { FormFieldValues } from "~/services/validate/user-update-api.validate";

export default function SettingInputTechStack() {
  return (
    <>
      <label htmlFor="skills" className="input-label">
        Tech Stack
      </label>
      <div className="relative mb-2">
        <SettingInputTechStack.Input
          popover={<SettingInputTechStack.Popover />}
        />
      </div>
      <SettingInputTechStack.Tags />
    </>
  );
}

SettingInputTechStack.Popover = function Item() {
  const { inputValue } = useSettingTagsContext();

  const formMetadata = useFormMetadata<FormFieldValues>(FORM_ID);

  const fields = formMetadata.getFieldset();

  const options = fields.skills.getFieldList();

  const { data, isPending } = useTagListQuery({
    enabled: Boolean(inputValue.length),
    searchParams: {
      name: inputValue,
      limit: "10",
    },
  });

  const _options = useMemo(() => {
    const _array = new Set<string>();
    if (inputValue) {
      _array.add(inputValue);
    }

    if (data) {
      const {
        result: { list },
      } = data;
      for (const tag of list) {
        _array.add(tag.name);
      }
    }

    for (const option of options) {
      if (option.value) {
        _array.add(option.value);
      }
    }

    return [..._array];
  }, [inputValue, data, options]);

  return (
    <div
      className={cn(styles.popover, {
        "opacity-50": isPending,
      })}
    >
      {_options.map((value) => {
        return (
          <label
            key={value}
            htmlFor={`${fields.skills.id}-${value}`}
            className={cn(styles.popover_item, "space-x-3")}
          >
            <input
              type="checkbox"
              key={`${fields.skills.key}-${value}`}
              id={`${fields.skills.id}-${value}`}
              name={fields.skills.name}
              form={fields.skills.formId}
              value={value}
              defaultChecked={fields.skills.value?.includes(value)}
              aria-invalid={!fields.skills.valid || undefined}
              aria-describedby={
                !fields.skills.valid ? fields.skills.errorId : undefined
              }
            />
            <span>{value}</span>
          </label>
        );
      })}
    </div>
  );
};

SettingInputTechStack.Tags = function Item() {
  const formMetadata = useFormMetadata<FormFieldValues>(FORM_ID);

  const fields = formMetadata.getFieldset();

  const form = useFormMetadata(FORM_ID);

  const skillsFieldList = fields.skills.getFieldList();

  return (
    <>
      <div className="flex flex-row flex-wrap">
        {skillsFieldList.map((field) => {
          if (!field.value) {
            return null;
          }
          return (
            <div
              className="button-primary small mr-2 mb-2 flex flex-row items-center"
              key={field.key}
            >
              {/*  eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#" className="mr-2">
                <span>{field.value}</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  const oldList = skillsFieldList.map((field) => field.value);
                  const newList = oldList.filter(
                    (value) => value !== field.value
                  );
                  form.update({
                    name: fields.skills.name,
                    value: newList,
                    validated: false,
                  });
                }}
              >
                <Icons.V2.SettingTagX className="h-4 w-4 fill-current" />
              </button>
              <input
                type="text"
                name={fields.skills.name}
                defaultValue={field.value}
                hidden
              />
            </div>
          );
        })}
      </div>
      {fields.skills.errorId &&
        fields.skills.errors?.map((error, index) => (
          <p
            key={`error-${fields.skills.errorId}-${index}`}
            className={"error-message"}
            id={fields.skills.errorId}
          >
            <Icons.V2.Error />
            {error}
          </p>
        ))}
    </>
  );
};

interface InputProps {
  popover?: React.ReactNode;
}

SettingInputTechStack.Input = function Item({ popover }: InputProps) {
  const [input, setInput] = useState("");
  const [, startTransition] = useTransition();
  const { inputValue, changeInput, reset, taskQueue } = useSettingTagsContext();

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInput(value);
      startTransition(() => {
        taskQueue.enqueue(value, (lastValue) => {
          changeInput(lastValue);
        });
      });
    },
    [changeInput, taskQueue]
  );

  useEffect(() => {
    setInput("");
  }, [reset]);

  return (
    <>
      <input
        type="text"
        className="input-text"
        id="skills"
        data-toggle="dropdown"
        placeholder="Search technologies, topics, more…"
        autoComplete="off"
        value={input}
        onChange={onChange}
      />
      {inputValue.length ? popover : null}
    </>
  );
};
