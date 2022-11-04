import * as yup from "yup";
import { isEmpty, isInvalidDate } from "~/utils/assertion";

export const commonSchema = {
  password: () =>
    yup
      .string()
      .test(
        "password",
        "Password must be at least 8 characters long and contain at least one number, one lowercase and one uppercase letter",
        (password) => {
          if (!password) return false;
          const regex =
            /^(?=.*[a-zA-Z])(?=.*[!@#$%&^*+=-\d])(?=.*[0-9]).{8,20}$/;
          if (password.match(regex)) {
            return true;
          }
          return false;
        }
      ),
};

export const schema = {
  signup: () =>
    yup.object().shape({
      username: yup.string().min(2).max(20).required(),
      email: yup.string().email().required(),
      password: commonSchema.password().required(),
      name: yup.string().nullable(true).optional(),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required(),
    }),
  signin: () =>
    yup.object().shape({
      email: yup.string().email().required(),
      password: commonSchema.password().required(),
    }),
  write: () =>
    yup.object().shape({
      title: yup.string().max(1000).required(),
      subTitle: yup.string().max(100).optional().nullable(true),
      description: yup.string().min(140).max(150).required(),
      content: yup.string().required(),
      thumbnail: yup
        .object()
        .shape({
          idx: yup.number().optional().nullable(true),
          url: yup.string().url().required(),
        })
        .optional(),
      tags: yup.array().of(yup.string()).max(5).nullable(true).optional(),
      disabledComment: yup.boolean().optional(),
      isPublic: yup.boolean().optional(),
      hasPublishedTime: yup.boolean().optional(),
      publishingDate: yup.date().min(new Date()).optional().nullable(true),
    }),
};

export const transform = {
  write: (formData: FormData) => {
    const resolveSchema = yup.object().shape({
      title: yup.mixed().transform((value) => {
        if (isEmpty(value)) return null;
        if (value === "null" || value === "undefined") return null;
        return value;
      }),
      subTitle: yup.mixed().transform((value) => {
        if (isEmpty(value)) return null;
        if (value === "null" || value === "undefined") return null;
        return value;
      }),
      description: yup.mixed().transform((value) => {
        if (isEmpty(value)) return null;
        if (value === "null" || value === "undefined") return null;
        return value;
      }),
      content: yup.mixed().transform((value) => {
        if (isEmpty(value)) return null;
        if (value === "null" || value === "undefined") return null;
        return value;
      }),
      thumbnail: yup.mixed().transform((value) => {
        if (isEmpty(value)) return null;
        if (value === "null" || value === "undefined") return null;
        const parsedValue = JSON.parse(value);
        if (isEmpty(parsedValue)) return null;
        return parsedValue.url;
      }),
      tags: yup.mixed().transform((value) => {
        if (isEmpty(value)) return null;
        if (value === "null" || value === "undefined") return null;
        const tags = value.split(",");
        if (isEmpty(tags)) return null;
        return tags;
      }),
      disabledComment: yup
        .mixed()
        .oneOf(["true", "false"])
        .transform((value) => {
          if (isEmpty(value)) return null;
          if (value === "null" || value === "undefined") return null;
          return value === "true";
        }),
      isPublic: yup
        .mixed()
        .oneOf(["true", "false"])
        .transform((value) => {
          if (isEmpty(value)) return null;
          if (value === "null" || value === "undefined") return null;
          return value === "true";
        }),
      hasPublishedTime: yup
        .mixed()
        .oneOf(["true", "false"])
        .transform((value) => {
          if (isEmpty(value)) return null;
          if (value === "null" || value === "undefined") return null;
          return value === "true";
        }),
      publishingDate: yup.mixed().transform((value) => {
        if (isEmpty(value)) return null;
        if (value === "null" || value === "undefined") return null;
        const date = new Date(value);
        if (isInvalidDate(date)) return null;
        return date;
      }),
    });

    const obj = {
      title: formData.get("title"),
      subTitle: formData.get("subTitle"),
      description: formData.get("description"),
      content: formData.get("content"),
      thumbnail: formData.get("thumbnail"),
      tags: formData.get("tags"),
      disabledComment: formData.get("disabledComment"),
      isPublic: formData.get("isPublic"),
      hasPublishedTime: formData.get("hasPublishedTime"),
      publishingDate: formData.get("publishingDate"),
    };

    console.log(obj);

    return resolveSchema.cast(obj);
  },
};
