import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Inici() {
  const [viatges, setViatges] = useState([]);
  const [desti, setDesti] = useState("");
  const [dataInici, setDataInici] = useState("");
  const [dataFi, setDataFi] = useState("");

  const navigate = useNavigate();
  const API = "http://127.0.0.1:8000/api";

  function getHeaders() {
    return {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
  }

  function logout() {
    fetch(`${API}/logout`, {
      method: "POST",
      headers: getHeaders(),
    });

    localStorage.removeItem("token");
    navigate("/login");
  }

  function carregarViatges() {
    fetch(`${API}/viatges`, { headers: getHeaders() })
      .then(res => res.json())
      .then(data => setViatges(data));
  }

  useEffect(() => {
    carregarViatges();
  }, []);

  function guardarViatge(e) {
    e.preventDefault();

    fetch(`${API}/viatges`, {
      method: "POST",
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
    });
  }

  function eliminarViatge(id) {
    fetch(`${API}/viatges/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    }).then(() => carregarViatges());
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Gestor de Viatges</h1>
        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="mb-4 position-relative">
  <img
    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
    className="img-fluid rounded"
    style={{ height: "250px", width: "100%", objectFit: "cover" }}
  />

  <h2
    className="position-absolute text-white"
    style={{ bottom: "20px", left: "20px" }}
  >
    Planifica els teus viatges ✈️
  </h2>
</div>

      <form onSubmit={guardarViatge} className="card p-3 mb-4">
        <h5>Crear viatge</h5>

        <input
          className="form-control mb-2"
          placeholder="Destí"
          value={desti}
          onChange={e => setDesti(e.target.value)}
        />

        <input
          className="form-control mb-2"
          type="date"
          value={dataInici}
          onChange={e => setDataInici(e.target.value)}
        />

        <input
          className="form-control mb-2"
          type="date"
          value={dataFi}
          onChange={e => setDataFi(e.target.value)}
        />

        <button className="btn btn-success">Crear</button>
      </form>

{viatges.map(v => (
  <div key={v.id} className="card shadow-sm mb-3">
    <img
      src={`https://source.unsplash.com/600x300/?${v.desti || "travel"}`}
      className="card-img-top"
      style={{ height: "150px", objectFit: "cover" }}
    />

    <div className="card-body">
      <h5>{v.desti}</h5>

      <div className="d-flex gap-2">
        <button
          className="btn btn-primary"
          onClick={() => navigate(`/viatge/${v.id}`)}
        >
          Entrar
        </button>

        <button
          className="btn btn-danger"
          onClick={() => eliminarViatge(v.id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  </div>
))}

    </div>   
  );
}

export default Inici;