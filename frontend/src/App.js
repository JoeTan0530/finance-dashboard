import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CustomSystemPopupProvider from "./contexts/CustomSystemPopupContext.jsx";
import CustomConfirmModalProvider from "./contexts/CustomConfirmModalContext.jsx";

// css
import "./assets/css";
import "bootstrap/dist/css/bootstrap.min.css";

// import javascript functions from bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// frame import
import FrameLayout from "./components/FrameLayout.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

// pages import
import LoginPage from "./pages/LoginPage.tsx";
import RegistrationPage from "./pages/RegistrationPage.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import ExpenseForm from "./pages/ExpenseForm.tsx";

function App() {
  return (
    <div className="main-display">
      <CustomSystemPopupProvider>
        <CustomConfirmModalProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/registration" element={<RegistrationPage />} />

              <Route element={<ProtectedRoute />}>
                <Route element={<FrameLayout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/expenses/new" element={<ExpenseForm mode="add" />} />
                  <Route path="/expenses/:expenseID/edit" element={<ExpenseForm mode="edit" />} />
                </Route>
              </Route>

              {/* 404 route */}
              <Route path="*" element={<div>404 - Page Not Found</div>} />
            </Routes>
          </Router>
        </CustomConfirmModalProvider>
      </CustomSystemPopupProvider>
    </div>
  );
}

export default App;
