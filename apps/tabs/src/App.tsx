// src/App.tsx
import { useState, useEffect, useRef } from "react";
import { Sidebar } from "./components/Sidebar";
import { TableEditor } from "./components/TableEditor";
import type { TableData } from "./lib/storage";
import { v4 as uuid } from "uuid";

const API_URL = "http://localhost:4000/tables";

interface TableAction {
  id: string;
  timestamp: number;
  tableId: string;
  type: "cell" | "row_add" | "row_delete" | "col_add" | "col_delete" | "rename";
  description: string;
  snapshot: TableData;
}

export default function App() {
  const [tables, setTables] = useState<TableData[]>([]);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [history, setHistory] = useState<TableAction[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [historyVisible, setHistoryVisible] = useState(false);

  const historyContainerRef = useRef<HTMLDivElement | null>(null);

  // Načtení tabulek z DB + localStorage
  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("peony_tables") || "[]") as TableData[];
    fetch(API_URL)
      .then(res => res.json())
      .then((dbTablesRaw: any[]) => {
        const dbTables = dbTablesRaw
          .map(d => d.data ? { ...d.data, id: d.id } : null)
          .filter(Boolean) as TableData[];
        const merged = [...local];
        dbTables.forEach(dbT => {
          if (!merged.find(t => t.id === dbT.id)) merged.push(dbT);
        });
        setTables(merged);
      })
      .catch(() => setTables(local));
  }, []);

  // Načtení historie z localStorage
  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("peony_history") || "[]") as TableAction[];
    setHistory(storedHistory);
    setHistoryIndex(storedHistory.length - 1);
  }, []);

  const saveLocal = (tables: TableData[]) =>
    localStorage.setItem("peony_tables", JSON.stringify(tables));

  const updateTables = (newTables: TableData[]) => {
    setTables(newTables);
    saveLocal(newTables);
  };

  // Přidání akce do historie
  const pushHistory = (table: TableData, type: TableAction["type"], description: string) => {
    const action: TableAction = {
      id: uuid(),
      timestamp: Date.now(),
      tableId: table.id,
      type,
      description,
      snapshot: JSON.parse(JSON.stringify(table)),
    };

    // Odstranit budoucí redo kroky, pokud nejsme na konci
    const newHistory = [...history.slice(0, historyIndex + 1), action];

    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    localStorage.setItem("peony_history", JSON.stringify(newHistory));
  };

const undo = () => {
  if (historyIndex < 0) return;
  const prevIndex = historyIndex - 1;
  const actionToApply = prevIndex >= 0 ? history[prevIndex] : null;

  if (actionToApply) {
    setTables(tables.map(t => t.id === actionToApply.tableId ? actionToApply.snapshot : t));
  } else {
    // žádný předchozí krok, můžeme nechat tabulku nezměněnou
  }

  setHistoryIndex(prevIndex);
};

const redo = () => {
  if (historyIndex + 1 >= history.length) return;
  const nextIndex = historyIndex + 1;
  const actionToApply = history[nextIndex];

  if (actionToApply) {
    setTables(tables.map(t => t.id === actionToApply.tableId ? actionToApply.snapshot : t));
  }

  setHistoryIndex(nextIndex);
};

  const handleCreate = () => {
    const baseName = "Nová tabulka";
    let name = baseName;
    let counter = 2;
    while (tables.find(t => t.name.toLowerCase() === name.toLowerCase())) {
      name = `${baseName}_${counter}`;
      counter++;
    }

    const newTable: TableData = {
      id: "tmp_" + uuid(),
      name,
      columns: ["ID", "name", "col2", "col3"],
      rows: Array(4)
        .fill(null)
        .map((_, r) => ["1", "", "", ""].map((c, i) => (i === 0 ? String(r + 1) : c))),
    };

    const newTables = [newTable, ...tables];
    updateTables(newTables);
    setCurrentId(newTable.id);
    pushHistory(newTable, "row_add", `Vytvoření nové tabulky "${name}"`);
  };

  const handleChangeTable = (updated: TableData, description?: string) => {
    if (description) pushHistory(updated, "cell", description);
    updateTables(tables.map(t => (t.id === updated.id ? updated : t)));
  };

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
    const updatedTables = tables.map(t => t.id === id ? { ...t, name: finalName } : t);
    updateTables(updatedTables);
    const table = updatedTables.find(t => t.id === id);
    if (table) pushHistory(table, "rename", `Přejmenování tabulky na "${finalName}"`);
  };

  const currentTable = tables.find(t => t.id === currentId) || null;

  // Scroll na aktuální krok historie
  useEffect(() => {
    if (historyVisible && historyContainerRef.current) {
      const container = historyContainerRef.current;
      const children = Array.from(container.children) as HTMLElement[];
      const idx = history.length - 1 - historyIndex; // reverzní pořadí
      const el = children[idx];
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [historyIndex, historyVisible, history.length]);

  return (
    <div className="flex w-full h-screen">
      <Sidebar
        tables={tables}
        currentId={currentId}
        onSelect={setCurrentId}
        onCreate={handleCreate}
        onRename={handleRename}
        onDelete={(id) => updateTables(tables.filter(t => t.id !== id))}
      />

      <div className="flex-1 flex flex-col">
        <div className="p-2 flex gap-2 border-b">
          <button onClick={undo} className="px-3 py-1 bg-gray-200 rounded">↩ Undo</button>
          <button onClick={redo} className="px-3 py-1 bg-gray-200 rounded">↪ Redo</button>
          <button onClick={() => setHistoryVisible(!historyVisible)} className="px-3 py-1 bg-gray-300 rounded">📜 Historie</button>
        </div>

        {historyVisible && (
          <div
            ref={historyContainerRef}
            className="p-2 border-b max-h-40 overflow-y-auto text-sm flex flex-col"
          >
            {[...history].reverse().map((h, idx) => {
              const realIdx = history.length - 1 - idx; // odpovídá historyIndex
              const isCurrent = realIdx === historyIndex;
              return (
                <div
                  key={h.id}
                  className={`border-b py-1 ${isCurrent ? "bg-yellow-100" : ""}`}
                  ref={isCurrent ? (el) => el && el.scrollIntoView({ behavior: "smooth", block: "center" }) : null}
                >
                  {new Date(h.timestamp).toLocaleTimeString()} - {h.description}
                </div>
              );
            })}
          </div>
        )}

        {currentTable && (
          <TableEditor
            table={currentTable}
            onUpdate={handleChangeTable}
            onSave={() => alert("Ukládání zatím deaktivováno")}
            onExport={() => alert("Export zatím deaktivováno")}
          />
        )}
      </div>
    </div>
  );
}
