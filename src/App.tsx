import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Homepage from "./pages/Homepage";
import PersonalTraining from "./pages/PersonalTraining";
import WellnessMassage from "./pages/WellnessMassage";
import UberMich from "./pages/UberMich";
import FormPT from "./pages/FormPT";
import FormMassage from "./pages/FormMassage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/personal-training" element={<PersonalTraining />} />
              <Route path="/wellness-massage" element={<WellnessMassage />} />
              <Route path="/uber-mich" element={<UberMich />} />
              <Route path="/form-pt" element={<FormPT />} />
              <Route path="/form-massage" element={<FormMassage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
