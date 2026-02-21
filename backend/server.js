require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

// routes
app.get("/api/health", (req, res) => res.json({ ok: true }));
// /api/db : on l’ajoute juste après db.js (ci-dessous)

const { pool } = require("./db");

app.get("/api/db", async (req, res) => {
  try {
    const r = await pool.query("select now() as now");
    res.json({ ok: true, now: r.rows[0].now });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ API on http://localhost:${PORT}`));