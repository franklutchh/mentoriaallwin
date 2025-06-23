
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { Students } from "./components/Students";
import { Calls } from "./components/Calls";
import { StudentForm } from "./components/StudentForm";
import { StudentDetails } from "./components/StudentDetails";
import { CallForm } from "./components/CallForm";
import { Calendar } from "./components/Calendar";
import { KnowledgeBase } from "./components/KnowledgeBase";
import { CallsProvider } from "./contexts/CallsContext";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CallsProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/students" element={<Students />} />
              <Route path="/students/new" element={<StudentForm />} />
              <Route path="/students/:id" element={<StudentDetails />} />
              <Route path="/calls" element={<Calls />} />
              <Route path="/calls/new" element={<CallForm />} />
              <Route path="/mentoring/new" element={<CallForm />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/knowledge" element={<KnowledgeBase />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </CallsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
