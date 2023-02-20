import React, { useCallback } from "react";
import { Link, useNavigate } from "@remix-run/react";
import { Logo } from "~/components/ui/logo";
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
              <Logo />
            </Link>
          </div>
        </header>
        <main className="auth-template__main">
          <div className="wrapper">
            <div className="auth-form">
              {/* form */}
              <div className="auth-form-container">
                <h1 className="flex flex-col text-center font-sans text-4xl font-extrabold text-gray-900">
                  <span className="bg-gradient-to-tr from-[#3466F6] to-[#7c3aed] box-decoration-clone bg-clip-text text-transparent">
                    {isSigninPage ? "Log in" : "Sign up"}
                  </span>
                </h1>
                {children}
                <hr className="mt-2 border-t" />

                <button
                  type="button"
                  onClick={onMoveToPage}
                  className="mt-6 inline-flex flex-row items-center justify-center self-center rounded-full px-3 py-1 text-center text-base font-semibold text-white outline outline-2 outline-offset-2 outline-transparent"
                >
                  <span className="text-blue-600">
                    {isSigninPage ? (
                      <>Continue with Signup -&gt;</>
                    ) : (
                      <>&lt;- More options</>
                    )}
                  </span>
                </button>
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
