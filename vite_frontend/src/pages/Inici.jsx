import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

function Inici() {
  const [viatges, setViatges] = useState([]);
  const [desti, setDesti] = useState("");
  const [dataInici, setDataInici] = useState("");
  const [dataFi, setDataFi] = useState("");

  const navigate = useNavigate();
  const { fetchData, loading, error } = useFetch();

  // LOGOUT
  const logout = async () => {
    try {
      await fetchData("/logout", { method: "POST" });
      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      console.error("Error logout:", err);
    }
  };

  // CARREGAR VIATGES
  const carregarViatges = async () => {
    try {
      const data = await fetchData("/viatges");
      setViatges(data);
    } catch (err) {
      console.error("Error carregant viatges:", err);
    }
  };

  useEffect(() => {
    carregarViatges();
  }, []);

  //  CREAR VIATGE
  const guardarViatge = async (e) => {
    e.preventDefault();

    try {
      await fetchData("/viatges", {
        method: "POST",
        body: JSON.stringify({
          desti,
          data_inici: dataInici,
          data_fi: dataFi,
        }),
      });

      // refrescar dades
      await carregarViatges();

      // netejar formulari
      setDesti("");
      setDataInici("");
      setDataFi("");
    } catch (err) {
      console.error("Error creant viatge:", err);
    }
  };

  // ELIMINAR
const eliminarViatge = async (id) => {
  try {
    await fetchData(`/viatges/${id}`, {
      method: "DELETE",
    });

    //  eliminar del state directament
    setViatges(prev => prev.filter(v => v.id !== id));

  } catch (err) {
    console.error("Error eliminant:", err);
  }
};

  return (
    <div className="container mt-4">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Gestor de Viatges</h1>
        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>
      </div>

      {/* HERO */}
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

      {/* FORM */}
      <form onSubmit={guardarViatge} className="card p-3 mb-4">
        <h5>Crear viatge</h5>

        <input
          className="form-control mb-2"
          placeholder="Destí"
          value={desti}
          onChange={(e) => setDesti(e.target.value)}
        />

        <input
          className="form-control mb-2"
          type="date"
          value={dataInici}
          onChange={(e) => setDataInici(e.target.value)}
        />

        <input
          className="form-control mb-2"
          type="date"
          value={dataFi}
          onChange={(e) => setDataFi(e.target.value)}
        />

        <button className="btn btn-success">Crear</button>
      </form>

      {/* LLISTA */}
      {loading && <p>Carregant...</p>}
      {error && <p className="text-danger">Error carregant dades</p>}

      {viatges.map((v) => (
        <div key={v.id} className="card shadow-sm mb-3">

          {/* IMATGE */}
          <div style={{ height: "150px", overflow: "hidden" }}>
            <img
              src={`https://loremflickr.com/600/300/${v.desti || "city"}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

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