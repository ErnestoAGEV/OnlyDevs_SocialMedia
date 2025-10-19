import { Navigate } from "react-router-dom";
import { useSuscription } from "../store/AuthStore";

export const ProtectedRoute = ({ children, authenticated = true }) => {
    const { user } = useSuscription();
    
    // Para rutas que requieren NO estar autenticado (como login)
    if (authenticated === false) {
        if (!user) {
            return children;
        }
        return <Navigate to="/" replace />;
    }
    
    // Para rutas que requieren estar autenticado
    if (authenticated) {
        if (user) {
            return children;
        }
        return <Navigate to="/login" replace />;
    }

    // Por defecto, redirige a login
    return <Navigate to="/login" replace />;
}