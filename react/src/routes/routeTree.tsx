import { portfolioLoader, rootBeforeLoader, transactionLoader, transactionsLoader } from "@/api/loaders.ts";
import { Urls } from "@/config/urls.ts";
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
  path: Urls.Portfolio,
  component: PortfolioPage,
  loader: portfolioLoader,
  validateSearch: PeriodSearchSchema,
  loaderDeps: ({ search: { period } }) => ({ period }),
});

const holdingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Urls.Holding,
  component: HoldingPage,
  loader: transactionsLoader,
  validateSearch: PeriodSearchSchema,
  loaderDeps: ({ search: { period } }) => ({ period }),
});

const transactionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Urls.Transaction,
  component: TransactionPage,
  loader: transactionLoader,
});

const signInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Urls.AuthSignIn,
  component: SignInPage,
});

export const routeTree = rootRoute.addChildren([portfolioRoute, holdingRoute, signInRoute, transactionRoute]);
