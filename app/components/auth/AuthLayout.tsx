import React, { useCallback, useMemo } from "react";
import classNames from "classnames";

// hooks
import { useLocation, useNavigate } from "@remix-run/react";

// constants
import { PAGE_ENDPOINTS } from "~/constants/constant";

// components
import { Icons } from "../shared/Icons";

interface AuthLayoutProps {
  children: React.JSX.Element;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const isSigninPage = useMemo(() => {
    return location.pathname === PAGE_ENDPOINTS.AUTH.SIGNIN;
  }, [location]);

  const onClick = useCallback(() => {
    navigate(PAGE_ENDPOINTS.ROOT);
  }, [navigate]);

  return (
    <div
      className={classNames({
        "signup-page": !isSigninPage,
      })}
    >
      <header
        className={classNames({
          "auth-header__signin": isSigninPage,
          "auth-header__signup": !isSigninPage,
        })}
      >
        <Icons.Logo onClick={onClick} className="h-8 cursor-pointer" />
      </header>
      {children}
    </div>
  );
}
