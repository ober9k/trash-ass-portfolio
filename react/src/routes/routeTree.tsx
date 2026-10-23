import { portfolioLoader, rootBeforeLoader, transactionCreateLoader, transactionsLoader, transactionUpdateLoader } from "@/api/loaders.ts";
import { Urls } from "@/config/urls.ts";
import DefaultLayout from "@/layouts/defaultLayout.tsx";
import ProfilePage from "@/pages/auth/profilePage";
import SignInPage from "@/pages/auth/signInPage.tsx";
import SignOutPage from "@/pages/auth/signOutPage";
import HoldingErrorPage from "@/pages/errors/holdings/holdingErrorPage.tsx";
import NotFoundPage from "@/pages/errors/notFoundPage.tsx";
import HoldingPage from "@/pages/holdings/holdingPage.tsx";
import CreatePage from "@/pages/holdings/transactions/createPage.tsx";
import UpdatePage from "@/pages/holdings/transactions/updatePage.tsx";
import AboutPage from "@/pages/aboutPage.tsx";
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

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Urls.About,
  component: AboutPage,
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

const transactionCreateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Urls.TransactionCreate,
  component: CreatePage,
  loader: transactionCreateLoader,
})

const transactionUpdateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: Urls.TransactionUpdate,
  component: UpdatePage,
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
  aboutRoute,
  holdingRoute, 
  transactionCreateRoute,
  transactionUpdateRoute,
  profilePage,
  signInRoute,
  signOutRoute,
]);
