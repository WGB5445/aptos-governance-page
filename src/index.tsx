import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import GovernanceRoutes from "./GovernanceRoutes";
import ReactGA from "react-ga4";

ReactGA.initialize(import.meta.env.VITE_GA_TRACKING_ID || "G-NW8SFC1RKX");

function normalizeRouterBasePath(basePath?: string): string {
  if (!basePath) return "/";
  const trimmed = basePath.trim();
  if (trimmed === "" || trimmed === "/") return "/";
  const withoutEdges = trimmed.replace(/^\/+|\/+$/g, "");
  return `/${withoutEdges}`;
}

const routerBasePath = normalizeRouterBasePath(import.meta.env.VITE_BASE_PATH);

const adobeFontsKey = import.meta.env.VITE_ADOBE_FONTS;
if (adobeFontsKey) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `https://use.typekit.net/${adobeFontsKey}.css`;
  document.head.appendChild(link);
}

// TODO: add Sentry

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes.
      cacheTime: 30 * 60 * 1000, // Keep unused data in cache for 30 minutes.
      refetchOnWindowFocus: false, // Don't refetch when window regains focus.
      retry: 1, // Only retry failed requests once.
    },
  },
});

const root = document.getElementById("root");
if (!root) {
  throw new Error("Missing root element");
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={routerBasePath}>
        <GovernanceRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);
