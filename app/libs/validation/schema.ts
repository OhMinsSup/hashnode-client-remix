import * as yup from "yup";

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
      subTitle: yup.string().max(100).optional().nullable(true).notRequired(),
      content: yup.string().required(),
      cover: yup
        .object()
        .shape({
          idx: yup.number().optional().nullable(true).notRequired(),
          url: yup.string().url().required(),
        })
        .optional(),
    }),
};
