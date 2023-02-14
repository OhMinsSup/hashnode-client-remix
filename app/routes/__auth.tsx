import { Outlet } from "@remix-run/react";
import { AuthTemplate } from "~/components/auth";

export default function Auth() {
  return (
    <AuthTemplate>
      <Outlet />
    </AuthTemplate>
  );
}
