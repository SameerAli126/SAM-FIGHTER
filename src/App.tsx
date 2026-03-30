import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppErrorBoundary from "@/components/AppErrorBoundary";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const WordWandererPage = lazy(() => import("./pages/projects/WordWanderer"));
const InvoiceGenProPage = lazy(() => import("./pages/projects/InvoiceGenPro"));
const OptiTradePage = lazy(() => import("./pages/projects/OptiTrade"));
const PhotoStreamSnapCloudPage = lazy(() => import("./pages/projects/PhotoStreamSnapCloud"));
const SamioPage = lazy(() => import("./pages/projects/Samio"));
const PeshawarCivicGisAtlasPage = lazy(() => import("./pages/projects/PeshawarCivicGisAtlas"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
      staleTime: 30_000,
    },
    mutations: {
      retry: 0,
    },
  },
});

const App = () => (
  <AppErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Suspense
              fallback={
                <div className="min-h-screen bg-background text-foreground flex items-center justify-center font-heading text-sm uppercase tracking-widest text-muted-foreground">
                  Loading...
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/projects/wordwanderer" element={<WordWandererPage />} />
                <Route path="/projects/invoicegen-pro" element={<InvoiceGenProPage />} />
                <Route path="/projects/optitrade" element={<OptiTradePage />} />
                <Route path="/projects/photostream-snapcloud" element={<PhotoStreamSnapCloudPage />} />
                <Route path="/projects/samio" element={<SamioPage />} />
                <Route path="/projects/peshawar-civic-gis-atlas" element={<PeshawarCivicGisAtlasPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </AppErrorBoundary>
);

export default App;
