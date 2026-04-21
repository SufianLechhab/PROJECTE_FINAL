import { useEffect, useState } from "react";

function App() {
  const [viatges, setViatges] = useState([]);
  const [desti, setDesti] = useState("");
  const [dataInici, setDataInici] = useState("");
  const [dataFi, setDataFi] = useState("");
  const [editarId, setEditarId] = useState(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nousParticipants, setNousParticipants] = useState({});
  const [novesActivitats, setNovesActivitats] = useState({});

  const API = "http://127.0.0.1:8000/api";

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
        console.log("LOGIN:", data);

        localStorage.setItem("token", data.token);
        alert("Login correcte");

        carregarViatges();
      });
  }

  function logout() {
    localStorage.removeItem("token");
    setViatges([]);
  }

  function getHeaders() {
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
  }

  // carregar vatges
  function carregarViatges() {
    fetch(`${API}/viatges`, {
      headers: getHeaders(),
    })
      .then(res => res.json())
      .then(data => {
        console.log("VIATGES:", data);
        setViatges([...data]);
      });
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      carregarViatges();
    }
  }, []);

  // Crear / Editar
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

  // Eliminar
  function eliminarViatge(id) {
    fetch(`${API}/viatges/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    }).then(() => carregarViatges());
  }

  // Editar
  function iniciarEdicio(v) {
    setEditarId(v.id);
    setDesti(v.desti);
    setDataInici(v.data_inici);
    setDataFi(v.data_fi);
  }

  // Participants
  function afegirParticipant(tripId) {
    const userId = nousParticipants[tripId];
    if (!userId) return;

    fetch(`${API}/viatges/${tripId}/participants`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        user_id: userId,
        rol: "participant",
      }),
    }).then(() => {
      carregarViatges();
      setNousParticipants({ ...nousParticipants, [tripId]: "" });
    });
  }

  // Activitats
  function afegirActivitat(tripId) {
    const activitat = novesActivitats[tripId];

    if (!activitat?.nom || !activitat?.data || !activitat?.hora || !activitat?.ubicacio) {
      alert("Omple tots els camps");
      return;
    }

    fetch(`${API}/viatges/${tripId}/activitats`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(activitat),
    }).then(() => {
      carregarViatges();
      setNovesActivitats({ ...novesActivitats, [tripId]: {} });
    });
  }

  // SI NO HI A TOKEN → LOGIN
  if (!localStorage.getItem("token")) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Login</h2>
        <form onSubmit={login}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  // APP
  return (
    <div style={{ padding: "20px" }}>
      <h1>Gestor de Viatges</h1>
      <button onClick={logout}>Logout</button>

      <form onSubmit={guardarViatge}>
        <input
          type="text"
          placeholder="Destí"
          value={desti}
          onChange={(e) => setDesti(e.target.value)}
          required
        />
        <input
          type="date"
          value={dataInici}
          onChange={(e) => setDataInici(e.target.value)}
          required
        />
        <input
          type="date"
          value={dataFi}
          onChange={(e) => setDataFi(e.target.value)}
          required
        />
        <button type="submit">{editarId ? "Guardar" : "Crear"}</button>
      </form>

      {viatges.map((v) => (
        <div key={v.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h3>{v.desti} ({v.data_inici} - {v.data_fi})</h3>

          <button onClick={() => iniciarEdicio(v)}>Editar</button>
          <button onClick={() => eliminarViatge(v.id)}>Eliminar</button>

          <div>
            <strong>Participants:</strong>
            {v.participants?.length > 0
              ? v.participants.map(p => <div key={p.id}>Usuari {p.user_id}</div>)
              : <div>Cap participant</div>}
          </div>

          <input
            type="number"
            placeholder="User ID"
            value={nousParticipants[v.id] || ""}
            onChange={(e) =>
              setNousParticipants({ ...nousParticipants, [v.id]: e.target.value })
            }
          />
          <button onClick={() => afegirParticipant(v.id)}>Afegir participant</button>

          <div>
            <strong>Activitats:</strong>
            {v.activitats?.length > 0
              ? v.activitats.map(a => (
                  <div key={a.id}>
                    {a.nom} - {a.data} {a.hora} ({a.ubicacio})
                  </div>
                ))
              : <div>Cap activitat</div>}
          </div>

          <input
            type="text"
            placeholder="Nom"
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