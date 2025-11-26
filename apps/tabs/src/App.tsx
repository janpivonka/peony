import { useState, useEffect } from "react";
import { Sidebar } from "./components/Sidebar";
import { TableEditor } from "./components/TableEditor";
import type { TableData } from "./lib/storage";
import { v4 as uuid } from "uuid";

const API_URL = "http://localhost:4000/tables";

export default function App() {
  const [tables, setTables] = useState<TableData[]>([]);
  const [currentId, setCurrentId] = useState<string | null>(null);

  // ===== Načtení tabulek z DB + localStorage =====
    useEffect(() => {
      const local = JSON.parse(localStorage.getItem("peony_tables") || "[]") as TableData[];
      console.log("Local storage při startu:", local);

      fetch(API_URL)
        .then(res => res.json())
        .then((dbTables: any[]) => {
          console.log("Data z backendu:", dbTables);  // ← ZDE SE DÍVÁME
          const converted = dbTables
            .map(d => d.data ? { ...d.data, id: d.id } : null)
            .filter(Boolean) as TableData[];
          console.log("Převedené tabulky:", converted); // ← ZDE SE DÍVÁME

          const merged = [...local];
          converted.forEach(dbT => {
            if (!merged.find(t => t.id === dbT.id)) merged.push(dbT);
          });

          console.log("Tabulky po merge:", merged); // ← ZDE SE DÍVÁME
          setTables(merged);
        })
        .catch(err => {
          console.error("Chyba při fetch:", err);
          setTables(local);
        });
    }, []);

  const saveLocal = (tables: TableData[]) =>
    localStorage.setItem("peony_tables", JSON.stringify(tables));

  const update = (newTables: TableData[]) => {
    setTables(newTables);
    saveLocal(newTables);
  };

  // ===== CREATE =====
  const handleCreate = () => {
    const name = prompt("Název tabulky:");
    if (!name) return;

    const newTable: TableData = {
      id: "tmp_" + uuid(),
      name,
      columns: ["ID", "col1", "col2", "col3"],
      rows: Array(4)
        .fill(null)
        .map((_, r) => ["1", "", "", ""].map((c, i) => (i === 0 ? String(r + 1) : c))),
    };

    update([...tables, newTable]);
    setCurrentId(newTable.id);
  };

  // ===== UPDATE LOCAL =====
  const handleChangeTable = (updated: TableData) =>
    update(tables.map(t => (t.id === updated.id ? updated : t)));

  // ===== SAVE ONE TABLE =====
  const handleSaveTable = (table: TableData) => {
    if (!confirm(`Opravdu uložit tabulku "${table.name}"?`)) return;

    const payload = { name: table.name, data: table };
    const isNew = table.id.startsWith("tmp_");

    fetch(`${API_URL}${isNew ? "" : "/" + table.id}`, {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(res => res.json())
      .then(saved => {
        if (isNew && saved.id) {
          handleChangeTable({ ...table, id: saved.id });
        }
        alert("✅ Tabulka byla uložena");
      })
      .catch(err => alert("❌ Nelze se připojit: " + err.message));
  };

  // ===== SAVE ALL =====
  const handleSaveAll = () => {
    if (!confirm("Opravdu uložit všechny tabulky?")) return;

    Promise.all(
      tables.map(t => {
        const isNew = t.id.startsWith("tmp_");
        return fetch(`${API_URL}${isNew ? "" : "/" + t.id}`, {
          method: isNew ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: t.name, data: t }),
        });
      })
    )
      .then(res => {
        if (res.every(r => r.ok)) alert("✅ Vše uloženo");
        else alert("❌ Některé tabulky se nepodařilo uložit");
      })
      .catch(e => alert("❌ Chyba připojení: " + e.message));
  };

  // ===== DELETE =====
  const handleDelete = (id: string) => {
    if (!confirm("Opravdu smazat tabulku?")) return;

    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => update(tables.filter(t => t.id !== id)))
      .catch(e => alert("❌ Nelze se připojit: " + e.message));
  };

  // ===== RENAME =====
  const handleRename = (id: string, newName: string) =>
    update(tables.map(t => (t.id === id ? { ...t, name: newName } : t)));

  // ===== EXPORT =====
  const handleExport = (table: TableData) => {
    const blob = new Blob([JSON.stringify(table, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = table.name + ".json";
    a.click();
    URL.revokeObjectURL(url);
  };

  // ===== PASTE =====
  const handlePaste = (table: TableData) => {
    table.id = "tmp_" + uuid(); // vždy nové ID
    update([...tables, table]);
    setCurrentId(table.id);
  };

  const currentTable = tables.find(t => t.id === currentId) || null;

  return (
    <div className="flex">
      <Sidebar
        tables={tables}
        currentId={currentId}
        onSelect={setCurrentId}
        onCreate={handleCreate}
        onRename={handleRename}
        onDelete={handleDelete}
        onPaste={handlePaste}
        onSaveAll={handleSaveAll}
        onSaveTable={handleSaveTable}
      />

      {currentTable && (
        <TableEditor
          table={currentTable}
          onUpdate={handleChangeTable}
          onSave={() => handleSaveTable(currentTable)}
          onExport={() => handleExport(currentTable)}
        />
      )}
    </div>
  );
}
