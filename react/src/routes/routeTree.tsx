import { handlePeriodSearch, portfolioLoader, rootBeforeLoader, transactionLoader, transactionsLoader, validatePeriodSearch } from "@/api/loaders.ts";
import DefaultLayout from "@/layouts/defaultLayout.tsx";
import SignInPage from "@/pages/auth/signInPage.tsx";
import PortfolioPage from "@/pages/portfolioPage.tsx";
import TransactionPage from "@/pages/transactionPage";
import TransactionsPage from "@/pages/transactionsPage.tsx";
import { Period } from "@shared/types/period";
import { createRootRoute, createRoute, } from "@tanstack/react-router";

export const rootRoute = createRootRoute({
  component: DefaultLayout,
  beforeLoad: rootBeforeLoader,
});

const periodOptions = {
  validateSearch: validatePeriodSearch,
  loaderDeps: handlePeriodSearch,
};

const portfolioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: PortfolioPage,
  loader: portfolioLoader,
  ...periodOptions,
});

const transactionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/transactions/$tokenId',
  component: TransactionsPage,
  loader: transactionsLoader,
  ...periodOptions,
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
