import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import InfoViatge from "./pages/InfoViatge";
import Inici from "./pages/Inici";
import Login from "./pages/Login";

// protecció
function RutaProtegida({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>

<nav className="navbar navbar-dark bg-dark px-4">
<span className="navbar-brand logo">✈️ GestoViatge</span></nav>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <RutaProtegida>
              <Inici />
            </RutaProtegida>
          }
        />

        <Route
          path="/viatge/:id"
          element={
            <RutaProtegida>
              <InfoViatge />
            </RutaProtegida>
          }
        />
      </Routes>

      <footer className="bg-dark text-white text-center p-3 mt-auto">
  © 2026 GestoViatge Sufian Lechhab
</footer>
    </BrowserRouter>
  );
}

export default App;