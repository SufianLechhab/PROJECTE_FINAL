import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

function InfoViatge() {
    const navigate = useNavigate(); //  botó
  const { id } = useParams();

  const [viatge, setViatge] = useState(null);
  const [email, setEmail] = useState("");

  const [dataInici, setDataInici] = useState("");
  const [dataFi, setDataFi] = useState("");

  const [activitat, setActivitat] = useState({
    
    nom: "",
    data: "",
    hora: "",
    ubicacio: "",
  });
  const [missatge, setMissatge] = useState("");
const [tipus, setTipus] = useState("success");

  const { fetchData, loading, error } = useFetch();

  // 📥 CARREGAR VIATGE
  const carregarViatge = async () => {
    try {
      const data = await fetchData(`/viatges/${id}`);
      setViatge(data);
    } catch (err) {
      console.error("Error carregant viatge:", err);
    }
  };

  useEffect(() => {
    carregarViatge();
  }, [id]);

  // AFEGIR PARTICIPANT
const afegirParticipant = async () => {
  try {
    const data = await fetchData(`/viatges/${id}/participants`, {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    if (data.creat) {
      setMissatge("Usuari creat i afegit (password: 123456)");
    } else {
      setMissatge("Participant afegit correctament");
    }

    setTipus("success");
    setEmail("");
    await carregarViatge();

    // desaparèixer sol
    setTimeout(() => setMissatge(""), 3000);

  } catch (err) {
    setTipus("danger");
    setMissatge("Error afegint participant");
    setTimeout(() => setMissatge(""), 3000);
  }
};

  // AFEGIR ACTIVITAT
  const afegirActivitat = async () => {
    try {
      await fetchData(`/viatges/${id}/activitats`, {
        method: "POST",
        body: JSON.stringify(activitat),
      });

      setActivitat({ nom: "", data: "", hora: "", ubicacio: "" });
      await carregarViatge();
    } catch (err) {
      console.error("Error creant activitat:", err);
    }
  };

  //  ELIMINAR ACTIVITAT
  const eliminarActivitat = async (idAct) => {
    try {
      await fetchData(`/activitats/${idAct}`, {
        method: "DELETE",
      });

      await carregarViatge();
    } catch (err) {
      console.error("Error eliminant activitat:", err);
    }
  };

const apuntarActivitat = async (idAct) => {
  try {
    const data = await fetchData(`/activitats/${idAct}/apuntar`, {
      method: "POST",
    });

    setMissatge(data.message);
    setTipus("success");

    await carregarViatge();

  } catch (err) {
    setMissatge(err.message || "Error");
    setTipus("warning"); // no error greu
  }
};

  // FILTRAR ACTIVITATS
  const carregarActivitatsFiltrades = async () => {
    try {
      let url = `/viatges/${id}/activitats`;

      if (dataInici && dataFi) {
        url += `?data_inici=${dataInici}&data_fi=${dataFi}`;
      }

      const data = await fetchData(url);

      setViatge(prev => ({
        ...prev,
        activitats: data,
      }));
    } catch (err) {
      console.error("Error filtrant activitats:", err);
    }
  };

  if (!viatge) return <p>Carregant...</p>;

  
return (
  
  <div className="container mt-4">
<button
  className="btn btn-outline-dark mb-3"
  onClick={() => navigate(-1)}
>
  ← Tornar enrere
</button>
    <h1 className="mb-4">{viatge.desti} / {viatge.data_inici} - {viatge.data_fi}</h1>


    {missatge && (
      <div className={`alert alert-${tipus} alert-dismissible fade show`} role="alert">
        {missatge}
        <button
          type="button"
          className="btn-close"
          onClick={() => setMissatge("")}
        ></button>
      </div>
    )}

      {/* PARTICIPANTS */}
      
      <div className="card p-3 mb-4">
        
        <h5>Participants</h5>

        {viatge.participants?.map(p => (
          <div key={p.id}>
            👤 {p.user.name} ({p.user.email})
          </div>
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


        {/* FILTRE */}
        <div className="mb-3">
          <input
            type="date"
            className="form-control mb-2"
            value={dataInici}
            onChange={(e) => setDataInici(e.target.value)}
          />

          <input
            type="date"
            className="form-control mb-2"
            value={dataFi}
            onChange={(e) => setDataFi(e.target.value)}
          />

          <button
            className="btn btn-primary me-2"
            onClick={carregarActivitatsFiltrades}
          >
            Filtrar
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => {
              setDataInici("");
              setDataFi("");
              carregarViatge();
            }}
          >
            Mostrar totes
          </button>
        </div>

        {/* LLISA */}
        {viatge.activitats?.map(a => (
<div key={a.id} className="d-flex justify-content-between align-items-center">
  
  {/* 🔹 ESQUERRA */}
  <div>
    <span>
      📅 {a.nom} - {a.data} {a.hora}
    </span>

    {/*  AQUÍ POSA ELS PARTICIPANTS */}
<div style={{ fontSize: "14px", color: "gray" }}>
  👥 Participants: {a.usuaris?.map(u => u.name).join(", ") || "Cap"}
</div>
  </div>

  {/* DRETA */}
  <div className="d-flex gap-2">
    <button
      className="btn btn-success btn-sm"
      onClick={() => apuntarActivitat(a.id)}
    >
      Apuntar-se
    </button>

    <button
      className="btn btn-danger btn-sm"
      onClick={() => eliminarActivitat(a.id)}
    >
      🗑️
    </button>
  </div>

</div>
        ))}

        {/* FORMULARI */}
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

      {/* ESTATS */}
      {loading && <p>Carregant...</p>}
      {error && <p className="text-danger">Error API</p>}
    </div>
  );
}

export default InfoViatge;