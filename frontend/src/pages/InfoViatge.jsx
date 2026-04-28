import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function InfoViatge() {
  const { id } = useParams();
  const [viatge, setViatge] = useState(null);
  const [email, setEmail] = useState("");

  const [activitat, setActivitat] = useState({
    nom: "",
    data: "",
    hora: "",
    ubicacio: "",
  });

  const API = "http://127.0.0.1:8000/api";

  function getHeaders() {
    return {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
  }

  function carregarViatge() {
    fetch(`${API}/viatges/${id}`, { headers: getHeaders() })
      .then(res => res.json())
      .then(data => setViatge(data));
  }

  useEffect(() => {
    carregarViatge();
  }, [id]);

  function afegirParticipant() {
    fetch(`${API}/viatges/${id}/participants`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ email }),
    }).then(() => {
      setEmail("");
      carregarViatge();
    });
  }

  function afegirActivitat() {
    fetch(`${API}/viatges/${id}/activitats`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(activitat),
    }).then(() => {
      setActivitat({ nom: "", data: "", hora: "", ubicacio: "" });
      carregarViatge();
    });
  }

  function eliminarActivitat(idAct) {
    fetch(`${API}/activitats/${idAct}`, {
      method: "DELETE",
      headers: getHeaders(),
    }).then(() => carregarViatge());
  }

  if (!viatge) return <p>Carregant...</p>;

  return (
    <div className="container mt-4">
      <h1 className="mb-4">{viatge.desti}</h1>

      {/* PARTICIPANTS */}
      <div className="card p-3 mb-4">
        <h5>Participants</h5>

        {viatge.participants?.map(p => (
          <div key={p.id}>👤 {p.user.name}</div>
        ))}

        <input
          className="form-control mt-2"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <button className="btn btn-primary mt-2" onClick={afegirParticipant}>
          Afegir participant
        </button>
      </div>

      {/* ACTIVITATS */}
      <div className="card p-3">
        <h5>Activitats</h5>

        {viatge.activitats?.map(a => (
          <div key={a.id} className="d-flex justify-content-between">
            <span>
              📅 {a.nom} - {a.data} {a.hora}
            </span>

            <button
              className="btn btn-danger btn-sm"
              onClick={() => eliminarActivitat(a.id)}
            >
              🗑️
            </button>
          </div>
        ))}

        <input
          className="form-control mt-2"
          placeholder="Nom"
          value={activitat.nom}
          onChange={e => setActivitat({ ...activitat, nom: e.target.value })}
        />

        <input
          className="form-control mt-2"
          type="date"
          value={activitat.data}
          onChange={e => setActivitat({ ...activitat, data: e.target.value })}
        />

        <input
          className="form-control mt-2"
          type="time"
          value={activitat.hora}
          onChange={e => setActivitat({ ...activitat, hora: e.target.value })}
        />

        <input
          className="form-control mt-2"
          placeholder="Ubicació"
          value={activitat.ubicacio}
          onChange={e => setActivitat({ ...activitat, ubicacio: e.target.value })}
        />

        <button className="btn btn-success mt-2" onClick={afegirActivitat}>
          Afegir activitat
        </button>
      </div>
    </div>
  );
}

export default InfoViatge;