import { portfolioLoader, transactionsLoader } from "@/api/loaders.ts";
import DefaultLayout from "@/layouts/defaultLayout.tsx";
import PortfolioPage from "@/pages/portfolioPage.tsx";
import TransactionsPage from "@/pages/transactionsPage.tsx";
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
  component: PortfolioPage,
  loader: portfolioLoader,
})

const transactionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/transactions/$tokenId',
  component: TransactionsPage,
  loader: transactionsLoader,
})

export const routeTree = rootRoute.addChildren([portfolioRoute, transactionsRoute]);
