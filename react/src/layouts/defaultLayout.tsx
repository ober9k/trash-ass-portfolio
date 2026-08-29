import { Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

function DefaultLayout() {
  return(
    <>
      <Link to={"/"}>Portfolio</Link> | <Link to={"/transactions"}>Transactions</Link>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}

export default DefaultLayout;
