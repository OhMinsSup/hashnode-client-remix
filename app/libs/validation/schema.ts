import * as yup from "yup";

export const schema = {
  signup: () =>
    yup.object().shape({
      username: yup.string().required(),
      email: yup.string().email().required(),
      password: yup
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
        )
        .required(),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required(),
    }),
  signin: () =>
    yup.object().shape({
      email: yup.string().email().required(),
      password: yup
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
        )
        .required(),
    }),
};
