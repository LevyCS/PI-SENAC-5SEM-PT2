// 4. src/App.tsx
import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import RegistroForm from "./pages/RegistroForm";
import Register from "./pages/auth/Register";
import PrivateRoute from "./components/PrivateRoute";
import LandingPage from "./pages/LandingPage";
import AuthRoute from "./components/authRoute"; // Fixed casing issue

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route element={<AuthRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastrar" element={<Register />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/registro" element={<RegistroForm />} />
        <Route path="/registro/:id" element={<RegistroForm />} />
        <Route path="/registro/:id/view" element={<RegistroForm viewOnly />} />
      </Route>
    </Routes>
  );
}
