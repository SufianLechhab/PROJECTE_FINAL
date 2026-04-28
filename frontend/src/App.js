import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import InfoViatge from "./pages/InfoViatge";
import Inici from "./pages/Inici";
import Login from "./pages/Login";

// 🔐 protecció
function RutaProtegida({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;