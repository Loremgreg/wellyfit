import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "@/components/Navigation";
import CookieConsent from "@/components/custom/CookieConsent";
import Footer from "@/components/Footer";
import Homepage from "./pages/Homepage";
import PersonalTraining from "./pages/PersonalTraining";
import WellnessMassage from "./pages/WellnessMassage";
import UberMich from "./pages/UberMich";
import FormPT from "./pages/FormPT";
import FormMassage from "./pages/FormMassage";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CookieConsent />
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/personal-training-murnau" element={<PersonalTraining />} />
              <Route path="/massage-murnau" element={<WellnessMassage />} />
              <Route path="/anfrage-personal-training" element={<FormPT />} />
              <Route path="/anfrage-massage" element={<FormMassage />} />
              <Route path="/personal-trainer-murnau" element={<UberMich />} />
              <Route path="/impressum" element={<Impressum />} />
              <Route path="/datenschutz" element={<Datenschutz />} />
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
