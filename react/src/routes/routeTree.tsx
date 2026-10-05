import { portfolioLoader, rootBeforeLoader, transactionLoader, transactionsLoader } from "@/api/loaders.ts";
import DefaultLayout from "@/layouts/defaultLayout.tsx";
import SignInPage from "@/pages/auth/signInPage.tsx";
import HoldingPage from "@/pages/holdings/holdingPage.tsx";
import TransactionPage from "@/pages/holdings/transactions/transactionPage";
import PortfolioPage from "@/pages/portfolioPage.tsx";
import { PeriodSearchSchema } from "@shared/schemas/search/periodSearchSchema.ts";
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
  validateSearch: PeriodSearchSchema,
  loaderDeps: ({ search: { period } }) => ({ period }),
});

const transactionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/transactions/$tokenId',
  component: HoldingPage,
  loader: transactionsLoader,
  validateSearch: PeriodSearchSchema,
  loaderDeps: ({ search: { period } }) => ({ period }),
});

const signInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/auth/sign-in',
  component: SignInPage,
});

const transactionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/transactions/x/$transactionId',
  component: TransactionPage,
  loader: transactionLoader,
});

export const routeTree = rootRoute.addChildren([portfolioRoute, transactionsRoute, signInRoute, transactionRoute]);
