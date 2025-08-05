
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Students } from './components/Students';
import { StudentDetails } from './components/StudentDetails';
import { StudentForm } from './components/StudentForm';
import { Sessions } from './components/Sessions';
import { MentoringForm } from './components/MentoringForm';
import { Calendar } from './components/Calendar';
import { Calls } from './components/Calls';
import { CallForm } from './components/CallForm';
import { WeeklyPriorities } from './components/WeeklyPriorities';
import { KnowledgeBase } from './components/KnowledgeBase';
import { Auth } from './components/Auth';
import ScaledOffers from './components/ScaledOffers';
import Offers from './pages/Offers';
import OfferDetails from './pages/OfferDetails';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './hooks/useAuth';
import { MentoringProvider } from './contexts/MentoringContext';
import { CallsProvider } from './contexts/CallsContext';
import { Toaster } from './components/ui/toaster';
import { ThemeProvider } from 'next-themes';
import { PWAInstallPrompt } from './components/PWAInstallPrompt';
import './App.css';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/ofertas" element={<Offers />} />
            <Route path="/ofertas/:id" element={<OfferDetails />} />
            <Route path="/*" element={
              <ProtectedRoute>
                <MentoringProvider>
                  <CallsProvider>
                    <Layout>
                      <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/students" element={<Students />} />
                        <Route path="/students/new" element={<StudentForm />} />
                        <Route path="/students/:id" element={<StudentDetails />} />
                        <Route path="/sessions" element={<Sessions />} />
                        <Route path="/sessions/new" element={<MentoringForm />} />
                        <Route path="/calendar" element={<Calendar />} />
                        <Route path="/calls" element={<Calls />} />
                        <Route path="/calls/new" element={<CallForm />} />
                        <Route path="/priorities" element={<WeeklyPriorities />} />
                        <Route path="/knowledge" element={<KnowledgeBase />} />
                        <Route path="/scaled-offers" element={<ScaledOffers />} />
                      </Routes>
                    </Layout>
                  </CallsProvider>
                </MentoringProvider>
              </ProtectedRoute>
            } />
          </Routes>
          <Toaster />
          <PWAInstallPrompt />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
