import pkg from "express";
const express = pkg;
import cors from "cors";
import tablesRoutes from "./routes/tables.ts";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;

// Připojení routes
app.use("/tables", tablesRoutes);

// Test endpoint
app.get("/", (_req, res) => res.send("Backend běží 👍"));

// Healthcheck
app.get("/health", (_req, res) => res.json({ ok: true, ts: new Date().toISOString() }));

app.listen(PORT, () => console.log(`Backend běží na http://localhost:${PORT}`));
