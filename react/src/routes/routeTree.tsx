import { portfolioLoader, rootBeforeLoader, transactionAddLoader, transactionsLoader, transactionUpdateLoader } from "@/api/loaders.ts";
import { Urls } from "@/config/urls.ts";
import DefaultLayout from "@/layouts/defaultLayout.tsx";
import SignInPage from "@/pages/auth/signInPage.tsx";
import HoldingPage from "@/pages/holdings/holdingPage.tsx";
import TransactionAddPage from "@/pages/holdings/transactions/transactionAddPage";
import TransactionUpdatePage from "@/pages/holdings/transactions/transactionUpdatePage";
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

const transactionAddRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Urls.TransactionAdd,
  component: TransactionAddPage,
  loader: transactionAddLoader,
})

const transactionUpdateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Urls.TransactionUpdate,
  component: TransactionUpdatePage,
  loader: transactionUpdateLoader,
});

const signInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Urls.AuthSignIn,
  component: SignInPage,
});

export const routeTree = rootRoute.addChildren([portfolioRoute, holdingRoute, signInRoute, transactionAddRoute, transactionUpdateRoute]);
