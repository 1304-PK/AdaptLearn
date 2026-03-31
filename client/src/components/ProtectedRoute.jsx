import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { session, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !session) {
      navigate("/auth/login");
    }
  }, [session, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white/50 font-serif italic tracking-widest animate-pulse">
          LOADING...
        </div>
      </div>
    );
  }

  if (!session) {
    return null; 
  }

  return children;
};

export default ProtectedRoute;