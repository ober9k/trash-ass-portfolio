import DefaultLayout from "@/layouts/defaultLayout.tsx";
import Portfolio from "@/pages/portfolio.tsx";
import Transactions from "@/pages/transactions.tsx";
import { createRootRoute, createRoute, } from "@tanstack/react-router";

const rootBeforeLoader = async ({ context }) => {
  console.log("rootBeforeLoader");
}

export const rootRoute = createRootRoute({
  component: DefaultLayout,
  beforeLoad: rootBeforeLoader,
});

const portfolioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Portfolio,
})

const transactionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/transactions',
  component: Transactions,
})

export const routeTree = rootRoute.addChildren([portfolioRoute, transactionsRoute]);
