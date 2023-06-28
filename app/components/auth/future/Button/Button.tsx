import React from "react";
import styles from "./styles.module.css";
import { Link, useLocation } from "@remix-run/react";
import { PAGE_ENDPOINTS } from "~/constants/constant";

export default function Button() {
  const location = useLocation();

  const isSignin = location.pathname === PAGE_ENDPOINTS.AUTH.SIGNIN;

  return (
    <>
      <button type="submit" className={styles.root}>
        Submit
      </button>
      <div className="flex flex-col items-center justify-center">
        <h1 className="mt-6 text-xl font-bold">
          {isSignin ? "New to Hashnode?" : "Already have an account?"}
        </h1>
        <Link
          className="mt-2 text-sm font-medium underline"
          aria-label={isSignin ? "Signup for hashnode" : "Signin to hashnode"}
          to={
            isSignin ? PAGE_ENDPOINTS.AUTH.SIGNUP : PAGE_ENDPOINTS.AUTH.SIGNIN
          }
        >
          {isSignin ? "Create an account" : "Sign in"}
        </Link>
      </div>
    </>
  );
}
