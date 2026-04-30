import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mode, setMode] = useState("login");

  const navigate = useNavigate();

  const API = "http://127.0.0.1:8000/api";

  function login(e) {
    e.preventDefault();

    fetch(`${API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then(res => res.json())
      .then(data => {
        if (!data.token) {
          alert("Credencials incorrectes");
          return;
        }

        localStorage.setItem("token", data.token);
        navigate("/"); // 🔥 anar a inici
      });
  }

  function register(e) {
    e.preventDefault();

    fetch(`${API}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then(res => res.json())
      .then(() => {
        alert("Usuari creat!");
        setMode("login");
      });
  }

  return (
    <div>
      {mode === "login" ? (
        <>
          <h2>Login</h2>
          <form onSubmit={login}>
            <input value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button>Login</button>
          </form>

          <button onClick={() => setMode("register")}>
            Registra't
          </button>
        </>
      ) : (
        <>
          <h2>Register</h2>
          <form onSubmit={register}>
            <input value={name} onChange={e => setName(e.target.value)} />
            <input value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button>Registrar</button>
          </form>

          <button onClick={() => setMode("login")}>
            Tornar a login
          </button>
        </>
      )}
    </div>
  );
}

export default Login;