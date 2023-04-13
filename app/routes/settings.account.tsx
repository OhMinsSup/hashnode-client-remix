import React from "react";

export default function Account() {
  return (
    <>
      <div className="content">
        <h2 className="mb-4 text-xl font-semibold text-red-600">
          Delete account
        </h2>
        <p className="mb-2">
          Your Hashnode account administers these blogs:
          <strong> velos.hashnode.dev</strong>
        </p>
        <p className="mb-10">
          Your personal data will be deleted permanently when you delete your
          account on Hashnode. This action is irreversible.{" "}
        </p>
        <button className="btn-transparent bg-red-600 !text-white hover:bg-red-600">
          Delete your account
        </button>
      </div>
      <div className="h-screen" />
    </>
  );
}
