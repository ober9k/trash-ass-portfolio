import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

function DefaultLayout() {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}

export default DefaultLayout;
