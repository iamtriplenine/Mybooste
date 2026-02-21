import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";

export default function App() {
  const [users, setUsers] = useState([]);
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");

  async function fetchUsers() {
    const { data, error } = await supabase.from("utilisateurs").select("*");
    if (error) {
      alert("Erreur SELECT: " + error.message);
      return;
    }
    setUsers(data || []);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function addUser() {
    alert("Je clique sur Ajouter ✅"); // <- pour vérifier que le clic marche

    const { error } = await supabase
      .from("utilisateurs")
      .insert([{ nom: nom.trim(), email: email.trim() }]);

    if (error) {
      alert("Erreur INSERT: " + error.message);
      return;
    }

    setNom("");
    setEmail("");
    fetchUsers();
    alert("Ajouté ✅");
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>Gestion Utilisateurs</h1>

      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <input
          placeholder="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="button" onClick={addUser}>
          Ajouter
        </button>
      </div>

      {users.map((u) => (
        <div key={u.id}>
          {u.nom} — {u.email}
        </div>
      ))}
    </div>
  );
}