import { AnimatePresence } from "framer-motion";
import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "../utils/Hooks";
import AdminDashboard from "./admin/AdminDashboard";
import AdminLogin from "./admin/AdminLogin";
import Contacto from "./Contacto";
import DetalleTratamiento from "./DetalleTratamiento";
import Home from "./Home";
import Nosotros from "./Nosotros";
import Tratamientos from "./Tratamientos";
import Turno from "./Turno";
import Feedback from "./Feedback";

const AnimatedRoutes = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route index element={<Home />}></Route>
        <Route path="*" element={<Home />}></Route>
        <Route path="/tratamientos" element={<Tratamientos />}></Route>
        <Route
          path="/tratamientos/:id"
          element={<DetalleTratamiento />}
        ></Route>
        <Route path="/turnos" element={<Turno />}></Route>
        <Route path="/nosotros" element={<Nosotros />}></Route>
        <Route path="/contacto" element={<Contacto />}></Route>
        <Route path="/admin" element={<AdminLogin />}></Route>
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route path="/feedback" element={<Feedback />}></Route>
      </Routes>
    </AnimatePresence>
  );
};

const PrivateRoute = ({
  children,
  isAuthenticated,
}: {
  children: any;
  isAuthenticated: boolean;
}) => {
  return isAuthenticated ? children : <Navigate to="/admin" replace />;
};

export default AnimatedRoutes;
