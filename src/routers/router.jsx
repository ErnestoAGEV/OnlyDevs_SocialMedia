import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { MainLayout } from "../layouts/MainLayout";
import { LoginPage } from "../pages/LoginPage";
import { ProtectedRoute } from "../hooks/ProtectedRoute";
import { MiPerfilPage } from "../pages/MiPerfilPage";

export function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta de login - solo accesible si NO estás autenticado */}
        <Route
          path="/login"
          element={
            <ProtectedRoute authenticated={false}>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        {/* Rutas protegidas - requieren autenticación */}
        <Route
          path="/"
          element={
            <ProtectedRoute authenticated={true}>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="/mi-perfil" element={<MiPerfilPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
