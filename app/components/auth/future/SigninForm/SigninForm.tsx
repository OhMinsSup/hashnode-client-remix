import React, { useCallback, useEffect } from "react";
import styles from "./styles.module.css";
import { cn } from "~/utils/util";
import { useSigninContext } from "~/components/auth/context/signin";
import { Form, useActionData } from "@remix-run/react";
import { Input } from "~/components/auth/future/Input";
import { AuthenticityTokenInput } from "remix-utils/csrf/react";

// types
import type { ActionData } from "~/routes/_auth.signin";
import { HoneypotInputs } from "remix-utils/honeypot/react";

const socials = [
  {
    id: "githubAuth",
    path: "/api/v1/auth/github",
    text: "Continue with GitHub",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12.0001 3C7.03012 3 3 7.12608 3 12.2161C3 16.288 5.5788 19.7426 9.1548 20.9612C9.6046 21.0465 9.76973 20.7613 9.76973 20.5178C9.76973 20.2981 9.76138 19.5721 9.75751 18.802C7.25368 19.3595 6.72534 17.7146 6.72534 17.7146C6.31593 16.6494 5.72604 16.3661 5.72604 16.3661C4.90947 15.7941 5.7876 15.8059 5.7876 15.8059C6.69136 15.8709 7.16724 16.7556 7.16724 16.7556C7.96995 18.1645 9.27269 17.7572 9.78627 17.5217C9.86705 16.9261 10.1003 16.5195 10.3577 16.2894C8.35864 16.0563 6.25721 15.2661 6.25721 11.7347C6.25721 10.7285 6.60879 9.90641 7.18453 9.261C7.09108 9.02888 6.78302 8.09152 7.27171 6.82207C7.27171 6.82207 8.02748 6.57438 9.74737 7.76676C10.4653 7.56256 11.2352 7.46015 12.0001 7.45664C12.7649 7.46015 13.5355 7.56256 14.2547 7.76676C15.9725 6.57438 16.7272 6.82207 16.7272 6.82207C17.2171 8.09152 16.9089 9.02888 16.8155 9.261C17.3925 9.90641 17.7417 10.7285 17.7417 11.7347C17.7417 15.2745 15.6363 16.0539 13.6322 16.282C13.955 16.568 14.2426 17.1289 14.2426 17.9887C14.2426 19.2218 14.2322 20.2143 14.2322 20.5178C14.2322 20.7631 14.3942 21.0505 14.8504 20.96C18.4245 19.74 21 16.2866 21 12.2161C21 7.12608 16.9705 3 12.0001 3ZM6.37082 16.1285C6.351 16.1743 6.28065 16.188 6.21657 16.1566C6.15129 16.1265 6.11463 16.0641 6.13579 16.0182C6.15516 15.971 6.22566 15.9579 6.29079 15.9895C6.35622 16.0195 6.39347 16.0826 6.37082 16.1285ZM6.81352 16.533C6.7706 16.5737 6.68669 16.5548 6.62976 16.4904C6.57089 16.4262 6.55986 16.3402 6.60338 16.2989C6.64765 16.2581 6.72902 16.2772 6.78804 16.3415C6.84691 16.4065 6.85838 16.4918 6.81352 16.533ZM7.11724 17.0505C7.06209 17.0898 6.97192 17.053 6.91618 16.971C6.86104 16.8891 6.86104 16.7908 6.91738 16.7514C6.97327 16.712 7.06209 16.7474 7.11858 16.8288C7.17357 16.9121 7.17357 17.0104 7.11724 17.0505ZM7.63088 17.6499C7.58155 17.7056 7.47647 17.6907 7.39957 17.6147C7.32088 17.5403 7.29897 17.4349 7.34845 17.3792C7.39838 17.3233 7.50405 17.339 7.58155 17.4144C7.65964 17.4886 7.68349 17.5948 7.63088 17.6499ZM8.29471 17.8523C8.27295 17.9245 8.17175 17.9573 8.06981 17.9266C7.96802 17.895 7.9014 17.8105 7.92197 17.7375C7.94313 17.6649 8.04477 17.6307 8.14746 17.6635C8.2491 17.6949 8.31587 17.7789 8.29471 17.8523ZM9.05018 17.9381C9.05271 18.0141 8.96627 18.0771 8.85926 18.0785C8.75165 18.0809 8.66462 18.0194 8.66342 17.9447C8.66342 17.8679 8.74793 17.8055 8.85553 17.8036C8.96254 17.8015 9.05018 17.8626 9.05018 17.9381ZM9.79234 17.909C9.80516 17.9831 9.73079 18.0593 9.62452 18.0796C9.52005 18.0991 9.42332 18.0533 9.41006 17.9798C9.39709 17.9038 9.4728 17.8276 9.57713 17.8079C9.68354 17.789 9.77878 17.8336 9.79234 17.909Z"></path>
      </svg>
    ),
  },
  {
    id: "facebookAuth",
    path: "/api/v1/auth/facebook",
    text: "Continue with Facebook",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12.001 2.002C6.47895 2.002 2.00195 6.479 2.00195 12.001C2.00195 16.991 5.65795 21.127 10.439 21.88V14.892H7.89895V12.001H10.439V9.798C10.439 7.29 11.932 5.907 14.215 5.907C15.309 5.907 16.455 6.102 16.455 6.102V8.561H15.191C13.951 8.561 13.563 9.333 13.563 10.124V11.999H16.334L15.891 14.89H13.563V21.878C18.344 21.129 22 16.992 22 12.001C22 6.479 17.523 2.002 12.001 2.002Z"></path>
      </svg>
    ),
  },
  {
    id: "appleAuth",
    path: "/api/v1/auth/apple",
    text: "Continue with Apple",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 25 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_1249_43)">
          <path d="M17.4673 12.5446C17.4926 15.2634 19.8524 16.1681 19.8786 16.1797C19.8586 16.2435 19.5015 17.469 18.6353 18.7349C17.8865 19.8294 17.1093 20.9198 15.8851 20.9424C14.6821 20.9645 14.2953 20.229 12.92 20.229C11.5451 20.229 11.1153 20.9198 9.97658 20.9645C8.79486 21.0093 7.89499 19.7811 7.13997 18.6906C5.59716 16.4601 4.41814 12.3878 6.00127 9.63888C6.78773 8.27377 8.19321 7.40932 9.71872 7.38715C10.8791 7.36501 11.9744 8.16784 12.6838 8.16784C13.3927 8.16784 14.7238 7.20237 16.123 7.34416C16.7088 7.36854 18.3531 7.58078 19.4089 9.12625C19.3238 9.17899 17.4469 10.2716 17.4673 12.5446V12.5446ZM15.2065 5.8685C15.8339 5.10908 16.2562 4.05189 16.141 3C15.2366 3.03635 14.1431 3.60262 13.4945 4.36162C12.9131 5.03375 12.404 6.10954 12.5414 7.14062C13.5494 7.2186 14.5791 6.6284 15.2065 5.8685"></path>
        </g>
        <defs>
          <clipPath id="clip0_1249_43">
            <rect
              width="14.6286"
              height="18"
              fill="white"
              transform="translate(5.25 3)"
            ></rect>
          </clipPath>
        </defs>
      </svg>
    ),
  },
];

export default function SigninForm() {
  const { step, changeStep } = useSigninContext();

  const actionData = useActionData<ActionData>();

  const gotoNextStep =
    actionData?.data &&
    typeof actionData.data === "boolean" &&
    !!actionData.data;

  const onChangeStep = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const { step } = e.currentTarget.dataset;
      if (step) changeStep(+step);
    },
    [changeStep]
  );

  useEffect(() => {
    if (gotoNextStep) changeStep(3);
  }, [gotoNextStep]);

  return (
    <div className={styles.root}>
      {step === 1 && <SigninForm.Lending onChangeStep={onChangeStep} />}
      {step === 2 && <SigninForm.EmailAuth onChangeStep={onChangeStep} />}
      {step === 3 && <SigninForm.ConfirmText onChangeStep={onChangeStep} />}
      {step === 4 && <SigninForm.Register onChangeStep={onChangeStep} />}
    </div>
  );
}

interface LendingProps {
  onChangeStep: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

SigninForm.Lending = function Item({ onChangeStep }: LendingProps) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.form_title}>Log in or sign up</span>
      <button className={styles.btn_google} data-id="googleAuth">
        <svg className={styles.icon_google} viewBox="0 0 488 512">
          <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
        </svg>
        <span>Continue with Google</span>
      </button>
      <div className={styles.other_social}>
        {socials.map((social) => {
          return (
            <button
              type="button"
              key={social.id}
              className={styles.btn_social}
              data-id={social.id}
            >
              <div>{social.icon}</div>
            </button>
          );
        })}
      </div>
      <button
        type="button"
        onClick={onChangeStep}
        data-step="2"
        className={cn(styles.btn_email, styles.btn_email_signin)}
      >
        Sign in with email address
        <svg fill="none" viewBox="0 0 16 16" width="16" height="16">
          <path
            stroke="currentColor"
            d="m6.667 4 4 4-4 4"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </button>
    </div>
  );
};

interface EmailAuthProps {
  onChangeStep: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

SigninForm.EmailAuth = function Item({ onChangeStep }: EmailAuthProps) {
  return (
    <>
      <div className={styles.email_auth_wrapper}>
        <span className={styles.form_title}>Sign in with email</span>
        <Form
          className={styles.email_form}
          replace
          method="POST"
          action="/signin?type=login"
        >
          <AuthenticityTokenInput />
          <HoneypotInputs />
          <Input
            id="email"
            type="email"
            name="email"
            aria-label="Email address"
            autoComplete="email"
            placeholder="Enter your email address"
          />
          <Input
            type="password"
            name="password"
            id="password"
            autoComplete="current-password"
            aria-label="Password"
            placeholder="Enter your password"
          />
          <button
            type="submit"
            className={styles.btn_google}
            data-id="Continue"
          >
            Continue
          </button>
        </Form>
        <button
          type="button"
          onClick={onChangeStep}
          data-step="1"
          className={cn(styles.btn_email, styles.btn_email_signin)}
        >
          <svg fill="none" viewBox="0 0 16 16" width="16" height="16">
            <path
              stroke="currentColor"
              d="m9.333 4-4 4 4 4"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          Back to login options
        </button>
      </div>
    </>
  );
};

interface ConfirmTextProps {
  onChangeStep: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

SigninForm.ConfirmText = function Item({ onChangeStep }: ConfirmTextProps) {
  return (
    <>
      <div className={styles.wrapper}>
        <span className={styles.form_title}>Log in or sign up</span>
        <div className={styles.other_social}>
          <span>You need to sign up. Do you want to sign up?</span>
        </div>
        <button
          type="button"
          className={styles.btn_google}
          data-id="googleAuth"
          data-step="4"
          onClick={onChangeStep}
        >
          <span>Continue</span>
        </button>
        <button
          type="button"
          onClick={onChangeStep}
          data-step="1"
          className={cn(styles.btn_email, styles.btn_email_signin)}
        >
          <svg fill="none" viewBox="0 0 16 16" width="16" height="16">
            <path
              stroke="currentColor"
              d="m9.333 4-4 4 4 4"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          Back to login options
        </button>
      </div>
    </>
  );
};

interface RegisterProps {
  onChangeStep: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

SigninForm.Register = function Item({ onChangeStep }: RegisterProps) {
  return (
    <>
      <div className={styles.email_auth_wrapper}>
        <span className={styles.form_title}>Sign up with email</span>
        <Form
          className={styles.email_form}
          replace
          method="POST"
          action="/signin?type=register"
        >
          <AuthenticityTokenInput />
          <HoneypotInputs />
          <Input
            id="username"
            type="text"
            name="username"
            autoComplete="username"
            aria-label="Username"
            placeholder="Enter your username."
          />
          <Input
            id="email"
            type="email"
            name="email"
            aria-label="Email address"
            autoComplete="email"
            placeholder="Enter your email address"
          />
          <Input
            type="password"
            name="password"
            id="password"
            autoComplete="current-password"
            aria-label="Password"
            placeholder="Enter your password"
          />
          <Input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            autoComplete="new-password"
            aria-label="confirmPassword"
            placeholder="Confirm your password."
          />
          <button
            type="submit"
            className={styles.btn_google}
            data-id="Continue"
          >
            Continue
          </button>
        </Form>
        <button
          type="button"
          onClick={onChangeStep}
          data-step="1"
          className={cn(styles.btn_email, styles.btn_email_signin)}
        >
          <svg fill="none" viewBox="0 0 16 16" width="16" height="16">
            <path
              stroke="currentColor"
              d="m9.333 4-4 4 4 4"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          Back to login options
        </button>
      </div>
    </>
  );
};
