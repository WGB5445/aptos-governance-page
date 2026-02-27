import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import GovernanceRoutes from "./GovernanceRoutes";
import ReactGA from "react-ga4";

ReactGA.initialize(import.meta.env.VITE_GA_TRACKING_ID || "G-NW8SFC1RKX");

const adobeFontsKey = import.meta.env.VITE_ADOBE_FONTS;
if (adobeFontsKey) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `https://use.typekit.net/${adobeFontsKey}.css`;
  document.head.appendChild(link);
}

// TODO: add Sentry

// inform the compiler of the existence of the window.aptos API
declare global {
  interface Window {
    aptos: any;
  }
}

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

// delay rendering the application until the window.onload event has fired when integrating with the window.aptos API
window.addEventListener("load", () => {
  const root = document.getElementById("root");
  if (!root) {
    throw new Error("Missing root element");
  }

  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <GovernanceRoutes />
        </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>,
  );
});
