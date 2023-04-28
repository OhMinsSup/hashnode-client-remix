import React from "react";
import { useRouteError } from "@remix-run/react";

const NotFoundPage = () => {
  const error = useRouteError();
  return (
    <div className="bg-slate-100">
      <div className="container mx-auto min-h-screen overflow-scroll border-l border-r bg-white">
        <img
          className="mx-auto mb-10 mt-24 block w-2/5"
          src="https://cdn.hashnode.com/res/hashnode/image/upload/v1579118927273/KkrJ9t34H.png?auto=compress&amp;w=1000"
          alt="404"
        />
        <div className="text-center">
          <p className="text-5xl font-extrabold leading-tight text-slate-700">
            404
          </p>
          <h2 className="mb-4 text-2xl font-bold text-black">
            We can’t find the page you’re looking for!
          </h2>
          <a
            href="/"
            className="btn btn-primary btn-lg font-bold text-blue-600"
          >
            Take me home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
