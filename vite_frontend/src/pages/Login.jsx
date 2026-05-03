import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mode, setMode] = useState("login");

  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  // LOGIN
  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.token) {
        alert("Credencials incorrectes");
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      console.error("Error login:", err);
      alert("Error al iniciar sessió");
    }
  };

  // REGISTER
  const register = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Error al registrar");
        return;
      }

      alert("Usuari creat!");
      setMode("login");
    } catch (err) {
      console.error("Error register:", err);
      alert("Error al registrar");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow-lg p-4"
        style={{ width: "350px", borderRadius: "15px" }}
      >
        <h2 className="text-center mb-4">
          {mode === "login" ? "Iniciar sessió" : "Registre"}
        </h2>

        <form onSubmit={mode === "login" ? login : register}>
          {mode === "register" && (
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn btn-primary w-100">
            {mode === "login" ? "Entrar" : "Registrar"}
          </button>
        </form>

        <p className="text-center mt-3">
          {mode === "login" ? "No tens compte?" : "Ja tens compte?"}
          <br />
          <button
            className="btn btn-link"
            onClick={() =>
              setMode(mode === "login" ? "register" : "login")
            }
          >
            {mode === "login" ? "Registra't" : "Inicia sessió"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;