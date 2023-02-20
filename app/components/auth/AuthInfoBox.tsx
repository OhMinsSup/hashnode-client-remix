import React from "react";

interface AuthInfoBoxProps {
  content: string;
}

const AuthInfoBox: React.FC<AuthInfoBoxProps> = ({ content }) => {
  return (
    <div className="auth-info-box">
      <div className="auth-info-box__inner">
        <section>
          <p>{content}</p>
        </section>
      </div>
    </div>
  );
};

export default AuthInfoBox;
