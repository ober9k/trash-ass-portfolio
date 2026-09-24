import { portfolioLoader, rootBeforeLoader, transactionsLoader } from "@/api/loaders.ts";
import DefaultLayout from "@/layouts/defaultLayout.tsx";
import SignInPage from "@/pages/auth/signInPage.tsx";
import PortfolioPage from "@/pages/portfolioPage.tsx";
import TransactionsPage from "@/pages/transactionsPage.tsx";
import { createRootRoute, createRoute, } from "@tanstack/react-router";

export const rootRoute = createRootRoute({
  component: DefaultLayout,
  beforeLoad: rootBeforeLoader,
});

const portfolioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: PortfolioPage,
  loader: portfolioLoader,
});

const transactionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/transactions/$tokenId',
  component: TransactionsPage,
  loader: transactionsLoader,
});

const signInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/auth/sign-in',
  component: SignInPage,
});

export const routeTree = rootRoute.addChildren([portfolioRoute, transactionsRoute, signInRoute]);
