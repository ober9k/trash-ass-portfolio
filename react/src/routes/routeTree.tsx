import { portfolioLoader, rootBeforeLoader, transactionLoader, transactionsLoader } from "@/api/loaders.ts";
import DefaultLayout from "@/layouts/defaultLayout.tsx";
import SignInPage from "@/pages/auth/signInPage.tsx";
import PortfolioPage from "@/pages/portfolioPage.tsx";
import TransactionPage from "@/pages/transactionPage";
import TransactionsPage from "@/pages/transactionsPage.tsx";
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
  component: TransactionsPage,
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
