import { createBrowserRouter } from "react-router-dom";

// Importing pages
import LandingPage from "./pages/LandingPage";
import SignupForm from "./pages/SignupForm";
import LoginForm from "./pages/LoginForm";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />
    },
    {
        path: "/auth/signup",
        element: <PublicRoute>
            <SignupForm />
        </PublicRoute>
    },
    {
        path: "/auth/login",
        element: <PublicRoute>
            <LoginForm />
        </PublicRoute>
    }
])

export default router