import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { TransactionProvider } from './context/TransactionContext';
import { BudgetProvider } from './context/BudgetContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { Transactions } from './pages/Transactions';
import { Analytics } from './pages/Analytics';
import { Profile } from './pages/Profile';
import { Budget } from './pages/Budget';
import Footer from './components/Footer';

// Layout that adds Footer below every authenticated page
const AppLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <div className="flex-1">{children}</div>
    <Footer />
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TransactionProvider>
          <BudgetProvider>
            <Router>
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <AppLayout><Dashboard /></AppLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/transactions"
                  element={
                    <ProtectedRoute>
                      <AppLayout><Transactions /></AppLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/analytics"
                  element={
                    <ProtectedRoute>
                      <AppLayout><Analytics /></AppLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <AppLayout><Profile /></AppLayout>
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/budget"
                  element={
                    <ProtectedRoute>
                      <AppLayout><Budget /></AppLayout>
                    </ProtectedRoute>
                  }
                />

                {/* Redirect root to dashboard */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </Router>
          </BudgetProvider>
        </TransactionProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
