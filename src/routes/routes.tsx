import DefaultLayout from "@/components/default-layout.tsx";
import AboutPage from '@/features/pages/components/about-page.tsx';
import HelpPage from '@/features/pages/components/help-page.tsx';
import Portfolio from "@/features/portfolio/components/portfolio.tsx";
import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';

export const rootRoute = createRootRoute({
  component: DefaultLayout,
});

const portfolioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Portfolio,
});

const aboutPageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/help",
  component: HelpPage,
});

const routes = rootRoute.addChildren([
  portfolioRoute,
  aboutPageRoute,
  aboutRoute,
]);

export const router = createRouter({ routeTree: routes });
