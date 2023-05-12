import React from "react";
import { useRouteError } from "@remix-run/react";

export default function InternalServerPage() {
  const error = useRouteError();
  return (
    <div className="bg-slate-100">
      <div className="container mx-auto min-h-screen overflow-scroll border-l border-r bg-white">
        <img
          className="mx-auto mb-10 mt-24 block w-2/5"
          src="/images/undraw_server_down.png"
          alt="500"
        />
        <div className="text-center">
          <p className="text-5xl font-extrabold leading-tight text-slate-700">
            500
          </p>
          <h2 className="mb-4 text-2xl font-bold text-black">
            something went wrong!
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
}
