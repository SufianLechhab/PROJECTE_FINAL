import { useEffect, useState } from "react";

function App() {
  const [viatges, setViatges] = useState([]);
  const [user, setUser] = useState(null);

  const [desti, setDesti] = useState("");
  const [dataInici, setDataInici] = useState("");
  const [dataFi, setDataFi] = useState("");
  const [editarId, setEditarId] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mode, setMode] = useState("login");

  const [nousParticipants, setNousParticipants] = useState({});
  const [novesActivitats, setNovesActivitats] = useState({});

  const API = "http://127.0.0.1:8000/api";

  function getHeaders() {
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
  }

  // LOGIN
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
        carregarUser();
        carregarViatges();
      });
  }

  // REGISTER
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
      .then(data => {
        if (data.errors) {
          alert("Error en el registre");
          return;
        }

        alert("Usuari creat!");
        setMode("login");
      });
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    setViatges([]);
  }

  function carregarUser() {
    fetch(`${API}/user`, {
      headers: getHeaders(),
    })
      .then(res => res.json())
      .then(data => setUser(data));
  }

  function carregarViatges() {
    fetch(`${API}/viatges`, {
      headers: getHeaders(),
    })
      .then(res => res.json())
      .then(data => setViatges(Array.isArray(data) ? data : []));
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      carregarUser();
      carregarViatges();
    }
  }, []);

  // CREAR / EDITAR VIATGE
  function guardarViatge(e) {
    e.preventDefault();

    const method = editarId ? "PUT" : "POST";
    const url = editarId
      ? `${API}/viatges/${editarId}`
      : `${API}/viatges`;

    fetch(url, {
      method,
      headers: getHeaders(),
      body: JSON.stringify({
        desti,
        data_inici: dataInici,
        data_fi: dataFi,
      }),
    }).then(() => {
      carregarViatges();
      setDesti("");
      setDataInici("");
      setDataFi("");
      setEditarId(null);
    });
  }

  function eliminarViatge(id) {
    fetch(`${API}/viatges/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    }).then(() => carregarViatges());
  }

  function iniciarEdicio(v) {
    setEditarId(v.id);
    setDesti(v.desti);
    setDataInici(v.data_inici);
    setDataFi(v.data_fi);
  }

  // PARTICIPANTS
  function afegirParticipant(tripId) {
    const email = nousParticipants[tripId];
    if (!email) return;

    fetch(`${API}/viatges/${tripId}/participants`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ email }),
    })
      .then(async res => {
        const data = await res.json();

        if (!res.ok) {
          alert(data.error || "Error afegint participant");
          return;
        }

        carregarViatges();
        setNousParticipants({ ...nousParticipants, [tripId]: "" });
      })
      .catch(() => alert("Error de connexió"));
  }

  // ACTIVITATS
  function afegirActivitat(tripId) {
    const a = novesActivitats[tripId];

    if (!a?.nom || !a?.data || !a?.hora || !a?.ubicacio) {
      alert("Omple tots els camps");
      return;
    }

    fetch(`${API}/viatges/${tripId}/activitats`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(a),
    })
      .then(res => res.json())
      .then(() => {
        carregarViatges();
        setNovesActivitats({ ...novesActivitats, [tripId]: {} });
      });
  }

  // LOGIN / REGISTER
  if (!localStorage.getItem("token")) {
    return (
      <div style={{ padding: "20px" }}>
        {mode === "login" ? (
          <>
            <h2>Login</h2>
            <form onSubmit={login}>
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="submit">Login</button>
            </form>

            <p>
              No tens compte?{" "}
              <button onClick={() => setMode("register")}>Registra't</button>
            </p>
          </>
        ) : (
          <>
            <h2>Register</h2>
            <form onSubmit={register}>
              <input type="text" placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} />
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="submit">Registrar</button>
            </form>

            <p>
              Ja tens compte?{" "}
              <button onClick={() => setMode("login")}>Login</button>
            </p>
          </>
        )}
      </div>
    );
  }

  // APP
  return (
    <div style={{ padding: "20px" }}>
      <h1>Gestor de Viatges</h1>
      {user && <h2>Hola {user.name}</h2>}
      <button onClick={logout}>Logout</button>

      <form onSubmit={guardarViatge}>
        <input type="text" placeholder="Destí" value={desti} onChange={(e) => setDesti(e.target.value)} required />
        <input type="date" value={dataInici} onChange={(e) => setDataInici(e.target.value)} required />
        <input type="date" value={dataFi} onChange={(e) => setDataFi(e.target.value)} required />
        <button type="submit">{editarId ? "Guardar" : "Crear"}</button>
      </form>

      {viatges.map(v => (
        <div key={v.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h3>{v.desti} ({v.data_inici} - {v.data_fi})</h3>

          <button onClick={() => iniciarEdicio(v)}>Editar</button>
          <button onClick={() => eliminarViatge(v.id)}>Eliminar</button>

          <strong>Participants:</strong>
          {v.participants?.length > 0
            ? v.participants.map(p => (
                <div key={p.id}>
                  👤 {p.user?.name} ({p.user?.email})
                </div>
              ))
            : <div>Cap participant</div>}

          <input
            type="email"
            placeholder="Email usuari"
            value={nousParticipants[v.id] || ""}
            onChange={(e) =>
              setNousParticipants({ ...nousParticipants, [v.id]: e.target.value })
            }
          />
          <button onClick={() => afegirParticipant(v.id)}>Afegir participant</button>

          <strong>Activitats:</strong>
          {v.activitats?.length > 0
            ? v.activitats.map(a => (
                <div key={a.id}>
                  📅 {a.nom} - {a.data} {a.hora} ({a.ubicacio})
                </div>
              ))
            : <div>Cap activitat</div>}

          {/* FORMULARI ACTIVITATS */}
          <input
            type="text"
            placeholder="Nom activitat"
            value={novesActivitats[v.id]?.nom || ""}
            onChange={(e) =>
              setNovesActivitats({
                ...novesActivitats,
                [v.id]: { ...novesActivitats[v.id], nom: e.target.value },
              })
            }
          />

          <input
            type="date"
            value={novesActivitats[v.id]?.data || ""}
            onChange={(e) =>
              setNovesActivitats({
                ...novesActivitats,
                [v.id]: { ...novesActivitats[v.id], data: e.target.value },
              })
            }
          />

          <input
            type="time"
            value={novesActivitats[v.id]?.hora || ""}
            onChange={(e) =>
              setNovesActivitats({
                ...novesActivitats,
                [v.id]: { ...novesActivitats[v.id], hora: e.target.value },
              })
            }
          />

          <input
            type="text"
            placeholder="Ubicació"
            value={novesActivitats[v.id]?.ubicacio || ""}
            onChange={(e) =>
              setNovesActivitats({
                ...novesActivitats,
                [v.id]: { ...novesActivitats[v.id], ubicacio: e.target.value },
              })
            }
          />

          <button onClick={() => afegirActivitat(v.id)}>
            Afegir activitat
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;