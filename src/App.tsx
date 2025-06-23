
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { StudentForm } from "./components/StudentForm";
import { StudentDetails } from "./components/StudentDetails";
import { MentoringForm } from "./components/MentoringForm";
import { Calendar } from "./components/Calendar";
import { KnowledgeBase } from "./components/KnowledgeBase";
import { MentoringProvider } from "./contexts/MentoringContext";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <MentoringProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/students" element={<Dashboard />} />
              <Route path="/students/new" element={<StudentForm />} />
              <Route path="/students/:id" element={<StudentDetails />} />
              <Route path="/mentoring/new" element={<MentoringForm />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/knowledge" element={<KnowledgeBase />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </MentoringProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
