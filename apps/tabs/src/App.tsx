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

    fetch(API_URL)
      .then(res => res.json())
      .then((dbTablesRaw: any[]) => {
        const dbTables = dbTablesRaw
          .map(d => d.data ? { ...d.data, id: d.id } : null)
          .filter(Boolean) as TableData[];

        // merge: local tables + DB tables (bez duplikátů podle id)
        const merged = [...local];
        dbTables.forEach(dbT => {
          if (!merged.find(t => t.id === dbT.id)) merged.push(dbT);
        });

        setTables(merged);
      })
      .catch(() => setTables(local));
  }, []);

  const saveLocal = (tables: TableData[]) =>
    localStorage.setItem("peony_tables", JSON.stringify(tables));

  const update = (newTables: TableData[]) => {
    setTables(newTables);
    saveLocal(newTables);
  };

  // ===== CREATE =====
  const handleCreate = () => {
    const baseName = "Nová tabulka";

    // najít první volný název
    let name = baseName;
    let counter = 2;
    while (tables.find(t => t.name.toLowerCase() === name.toLowerCase())) {
      name = `${baseName}_${counter}`;
      counter++;
    }

    const newTable: TableData = {
      id: "tmp_" + uuid(),
      name,
      columns: ["ID", "col1", "col2", "col3"],
      rows: Array(4)
        .fill(null)
        .map((_, r) => ["1", "", "", ""].map((c, i) => (i === 0 ? String(r + 1) : c))),
    };

    // nová tabulka vždy nahoře
    const newTables = [newTable, ...tables];
    update(newTables);
    setCurrentId(newTable.id); // automaticky otevřít
  };

  // ===== UPDATE LOCAL =====
  const handleChangeTable = (updated: TableData) =>
    update(tables.map(t => (t.id === updated.id ? updated : t)));

  const handleSaveTable = async (table: TableData) => {
    if (!confirm(`Opravdu uložit tabulku "${table.name}"?`)) return;

    const isLocal = table.id.startsWith("tmp_");
    const payload = { name: table.name, data: table };

    try {
      const res = await fetch(`${API_URL}${isLocal ? "" : "/" + table.id}`, {
        method: isLocal ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const saved = await res.json();

      if (!res.ok) throw new Error("Chyba při ukládání");

      // ===== Po uložení =====
      // 1) stáhnout aktuální DB tabulky
      const dbRes = await fetch(API_URL);
      const dbData: any[] = await dbRes.json();
      const dbTables: TableData[] = dbData
        .map(d => d.data ? { ...d.data, id: d.id } : null)
        .filter(Boolean) as TableData[];

      // 2) odstranit klon z localStorage
      const remainingLocal = tables.filter(t => !(t.id === table.id && isLocal));

      // 3) sloučit
      const merged = [...remainingLocal.filter(t => t.id.startsWith("tmp_")), ...dbTables];

      setTables(merged);
      saveLocal(merged.filter(t => t.id.startsWith("tmp_"))); // pouze localStorage tabulky

      alert("✅ Tabulka byla uložena a přesunuta do DB");
      setCurrentId(saved.id); // přepnout na novou DB tabulku
    } catch (err: any) {
      alert("❌ Nelze se připojit: " + err.message);
    }
  };

  const handleSaveAll = async () => {
    if (!confirm("Opravdu uložit všechny tabulky?")) return;

    try {
      await Promise.all(
        tables.map(t => {
          const isLocal = t.id.startsWith("tmp_");
          return fetch(`${API_URL}${isLocal ? "" : "/" + t.id}`, {
            method: isLocal ? "POST" : "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: t.name, data: t }),
          });
        })
      );

      const dbRes = await fetch(API_URL);
      const dbData: any[] = await dbRes.json();
      const dbTables: TableData[] = dbData
        .map(d => d.data ? { ...d.data, id: d.id } : null)
        .filter(Boolean) as TableData[];

      const remainingLocal = tables.filter(t => t.id.startsWith("tmp_") && !dbTables.find(db => db.name === t.name));

      const merged = [...remainingLocal, ...dbTables];

      setTables(merged);
      saveLocal(merged.filter(t => t.id.startsWith("tmp_")));

      alert("✅ Všechny tabulky uloženy a přesunuty do DB");
    } catch (err: any) {
      alert("❌ Chyba při ukládání: " + err.message);
    }
  };

  // ===== DELETE =====
  const handleDelete = (id: string) => {
    const isLocal = id.startsWith("tmp_");
    if (!confirm("Opravdu smazat tabulku?")) return;

    if (isLocal) {
      update(tables.filter(t => t.id !== id));
    } else {
      fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(() => update(tables.filter(t => t.id !== id)))
        .catch(e => alert("❌ Nelze se připojit: " + e.message));
    }
  };

  // ===== RENAME =====
  const handleRename = (id: string, newNameInput: string) => {
    const baseName = newNameInput.trim();
    if (!baseName) return;

    const existingNames = tables.filter(t => t.id !== id).map(t => t.name);

    let finalName = baseName;
    let counter = 2;
    while (existingNames.includes(finalName)) {
      finalName = `${baseName}_${counter}`;
      counter++;
    }

    update(tables.map(t => (t.id === id ? { ...t, name: finalName } : t)));
  };

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
    table.id = "tmp_" + uuid();
    const newTables = [table, ...tables];
    update(newTables);
    setCurrentId(table.id);
  };

  // ===== CLICK NA DB TABULKU =====
  const handleSelectDbTable = (table: TableData) => {
    const existingClone = tables.find(t => t.id.startsWith("tmp_") && t.name === table.name);

    if (existingClone) {
      setCurrentId(existingClone.id);
    } else {
      const newClone: TableData = { ...table, id: "tmp_" + uuid() };
      update([newClone, ...tables]);
      setCurrentId(newClone.id);
    }
  };

  const currentTable = tables.find(t => t.id === currentId) || null;

  return (
    <div className="flex">
      <Sidebar
        tables={tables}
        currentId={currentId}
        onSelect={setCurrentId}
        onSelectDb={handleSelectDbTable}
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
