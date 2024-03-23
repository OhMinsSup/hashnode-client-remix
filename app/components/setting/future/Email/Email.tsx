import styles from "./styles.module.css";
import { Form, useLoaderData } from "@remix-run/react";
import type { RoutesLoaderData } from "~/.server/routes/settings-email/settings-email-loader";

interface CheckboxProps {
  label: string;
  description: string;
  value: string;
  id: string;
  checked?: boolean;
}

function Checkbox({ id, value, label, description, checked }: CheckboxProps) {
  return (
    <div className={styles.ipt_checkbox_container}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="flex flex-row items-start" htmlFor={id}>
        <input
          type="checkbox"
          className="mt-1 mr-4"
          defaultChecked={checked}
          value={value}
          id={id}
        />
        <p>
          <span className={styles.ipt_checkbox_label}>{label}</span>
          <span className={styles.ipt_checkbox_desc}>{description}</span>
        </p>
      </label>
    </div>
  );
}

export default function Email() {
  const data = useLoaderData<RoutesLoaderData>();
  return (
    <Form className={styles.root}>
      {data.items.map((item) => {
        const id = item.id.toString();
        return (
          <Checkbox
            key={`email-${item.id}`}
            id={id}
            value={id}
            label={item.label}
            description={item.description}
            checked={item.checked}
          />
        );
      })}
      <div className="mt-5 pt-4">
        <button className="button-primary big" type="submit">
          Update
        </button>
      </div>
    </Form>
  );
}
