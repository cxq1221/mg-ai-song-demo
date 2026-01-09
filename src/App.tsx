import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import VoiceClone from "./pages/VoiceClone";
import CreateMusic from "./pages/CreateMusic";
import Templates from "./pages/Templates";
import MyWorks from "./pages/MyWorks";
import MyVoices from "./pages/MyVoices";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/voice-clone" element={<VoiceClone />} />
          <Route path="/create" element={<CreateMusic />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/my-voices" element={<MyVoices />} />
          <Route path="/works" element={<MyWorks />} />
          {/* Placeholder routes */}
          <Route path="/synthesize" element={<Index />} />
          <Route path="/merge" element={<Index />} />
          <Route path="/watermark" element={<Index />} />
          <Route path="/apply-bgm" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
