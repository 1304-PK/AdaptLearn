import { createBrowserRouter } from "react-router-dom";

// Importing pages
import LandingPage from "./pages/LandingPage";
import SignupForm from "./pages/SignupForm";
import LoginForm from "./pages/LoginForm";
import HrDashboard from "./pages/HrDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import UploadDocuments from "./pages/UploadDocuments";
import EmployeeMetrics from "./pages/EmployeeMetrics";
import EmployeeRoadmap from "./pages/EmployeeRoadmap";
import NodeContent from "./pages/NodeContent";

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
    },
    {
        path: "/admin/dashboard",
        element: (
            <ProtectedRoute>
                <HrDashboard />
            </ProtectedRoute>
        )
    },
    {
        path: "/employee",
        element: (
            <ProtectedRoute>
                <EmployeeDashboard/>
            </ProtectedRoute>
        ),
        children: [
            {
                path: "upload-documents",
                element: <UploadDocuments />
            },
            {
                path: "resume-metrics",
                element: <EmployeeMetrics />
            },
            {
                path: "roadmap",
                element: <EmployeeRoadmap />
            },
            {
                path: "node/:id",
                element: <NodeContent />
            }
        ]
    }
])

export default router