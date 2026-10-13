import { portfolioLoader, rootBeforeLoader, transactionAddLoader, transactionsLoader, transactionUpdateLoader } from "@/api/loaders.ts";
import { Urls } from "@/config/urls.ts";
import DefaultLayout from "@/layouts/defaultLayout.tsx";
import ProfilePage from "@/pages/auth/profilePage";
import SignInPage from "@/pages/auth/signInPage.tsx";
import SignOutPage from "@/pages/auth/signOutPage";
import HoldingErrorPage from "@/pages/errors/holdings/holdingErrorPage.tsx";
import NotFoundPage from "@/pages/errors/notFoundPage.tsx";
import HoldingPage from "@/pages/holdings/holdingPage.tsx";
import TransactionAddPage from "@/pages/holdings/transactions/transactionAddPage";
import TransactionUpdatePage from "@/pages/holdings/transactions/transactionUpdatePage";
import PortfolioPage from "@/pages/portfolioPage.tsx";
import { PeriodSearchSchema } from "@shared/schemas/search/periodSearchSchema.ts";
import { createRootRoute, createRoute, } from "@tanstack/react-router";

export const rootRoute = createRootRoute({
  component: DefaultLayout,
  beforeLoad: rootBeforeLoader,
  notFoundComponent: NotFoundPage,
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
  errorComponent: HoldingErrorPage,
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


const profilePage = createRoute({
  getParentRoute: () => rootRoute,
  path: Urls.AuthProfile,
  component: ProfilePage,
});

const signInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Urls.AuthSignIn,
  component: SignInPage,
});

const signOutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Urls.AuthSignOut,
  component: SignOutPage,
});

export const routeTree = rootRoute.addChildren([
  portfolioRoute, 
  holdingRoute, 
  transactionAddRoute, 
  transactionUpdateRoute,
  profilePage,
  signInRoute,
  signOutRoute,
]);
