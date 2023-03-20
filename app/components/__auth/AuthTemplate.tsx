import React, { useCallback } from "react";
import { Link, useNavigate } from "@remix-run/react";
import { Logo } from "~/components/__ui/logo";
import Button from "~/components/__ui/shared/Button";
import { PAGE_ENDPOINTS } from "~/constants/constant";

interface AuthTemplateProps {
  children: React.ReactNode;
  infoBox: React.ReactNode;
  isSigninPage?: boolean;
}

const AuthTemplate: React.FC<AuthTemplateProps> = ({
  children,
  infoBox,
  isSigninPage,
}) => {
  const navigate = useNavigate();

  const onMoveToPage = useCallback(() => {
    navigate(
      isSigninPage ? PAGE_ENDPOINTS.AUTH.SIGNUP : PAGE_ENDPOINTS.AUTH.SIGNIN
    );
  }, [navigate, isSigninPage]);

  return (
    <div className="auth-template">
      <section>
        <header className="auth-template__header">
          <div className="wrapper">
            <Link to={PAGE_ENDPOINTS.ROOT}>
              <Logo className="w-full" />
            </Link>
          </div>
        </header>
        <main className="auth-template__main">
          <div className="wrapper">
            <div className="auth-form">
              {/* form */}
              <div className="auth-form-container">
                <h1 className="auth-form__title">
                  <span className="auth-form__decoration">
                    {isSigninPage ? "Log in" : "Sign up"}
                  </span>
                </h1>
                {children}
                <div className="form__other-btn-group">
                  <Button
                    type="button"
                    aria-label="Move to other page"
                    className="form__other-btn"
                    onPress={onMoveToPage}
                  >
                    {isSigninPage
                      ? "Don't have an account?"
                      : "Already have an account?"}
                  </Button>
                </div>
              </div>
              {/* form */}
              {/* content */}
              {infoBox}
              {/* content */}
            </div>
          </div>
        </main>
      </section>
    </div>
  );
};

export default AuthTemplate;
