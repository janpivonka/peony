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
  type: "cell" | "row_add" | "row_delete" | "rename";
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

useEffect(() => {
  const storedHistory = JSON.parse(localStorage.getItem("peony_history") || "[]") as TableAction[];
  setHistory(storedHistory);
  setHistoryIndex(-1); // start na -1 → žádná akce ještě není aplikována
}, []);

  const saveLocal = (tables: TableData[]) => localStorage.setItem("peony_tables", JSON.stringify(tables));

  const updateTables = (newTables: TableData[]) => {
    setTables(newTables);
    saveLocal(newTables);
  };

  const pushHistory = (table: TableData, type: TableAction["type"], description: string) => {
    const snapshot = JSON.parse(JSON.stringify(table)); // deep copy
    const action: TableAction = {
      id: uuid(),
      timestamp: Date.now(),
      tableId: table.id,
      type,
      description,
      snapshot
    };
    const newHistory = [...history.slice(0, historyIndex + 1), action];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    localStorage.setItem("peony_history", JSON.stringify(newHistory));
  };

const undo = () => {
  setHistoryIndex(prevIndex => {
    if (prevIndex < 0) return prevIndex;
    const action = history[prevIndex];
    let newTables = [...tables];

    switch (action.type) {
      case "row_add":
        newTables = newTables.filter(t => t.id !== action.tableId);
        break;
      case "row_delete":
      case "cell":
      case "rename":
        newTables = newTables.map(t => t.id === action.tableId ? action.snapshot : t);
        if (!newTables.find(t => t.id === action.tableId)) {
          newTables = [action.snapshot, ...newTables];
        }
        break;
    }

    setTables(newTables);
    setCurrentId(action.tableId);
    return prevIndex - 1;
  });
};

const redo = () => {
  setHistoryIndex(prevIndex => {
    if (prevIndex + 1 >= history.length) return prevIndex;
    const action = history[prevIndex + 1];
    let newTables = [...tables];

    switch (action.type) {
      case "row_add":
        newTables = [action.snapshot, ...newTables];
        break;
      case "row_delete":
        newTables = newTables.filter(t => t.id !== action.tableId);
        break;
      case "cell":
      case "rename":
        newTables = newTables.map(t => t.id === action.tableId ? action.snapshot : t);
        break;
    }

    setTables(newTables);
    setCurrentId(action.tableId);
    return prevIndex + 1;
  });
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

    pushHistory(newTable, "row_add", `Vytvoření nové tabulky "${name}"`);
    updateTables([newTable, ...tables]);
    setCurrentId(newTable.id);
  };

  const handleChangeTable = (updated: TableData, description?: string) => {
    const original = tables.find(t => t.id === updated.id);
    if (original && description) pushHistory(original, "cell", description);
    updateTables(tables.map(t => (t.id === updated.id ? updated : t)));
  };

  const handleRename = (id: string, newNameInput: string) => {
    const table = tables.find(t => t.id === id);
    if (!table) return;
    pushHistory(table, "rename", `Přejmenování tabulky na "${newNameInput}"`);
    updateTables(tables.map(t => t.id === id ? { ...t, name: newNameInput } : t));
  };

  const currentTable = tables.find(t => t.id === currentId) || null;

  useEffect(() => {
    if (historyVisible && historyContainerRef.current) {
      const container = historyContainerRef.current;
      const children = Array.from(container.children) as HTMLElement[];
      const idx = history.length - 1 - historyIndex;
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
        onDelete={(id) => {
          const tableToDelete = tables.find(t => t.id === id);
          if (!tableToDelete) return;
          pushHistory(tableToDelete, "row_delete", `Smazání tabulky "${tableToDelete.name}"`);
          updateTables(tables.filter(t => t.id !== id));
          if (currentId === id) setCurrentId(null);
        }}
        onPaste={(newTable) => {
          pushHistory(newTable, "row_add", `Vložení tabulky "${newTable.name}" z clipboardu`);
          const newTables = [newTable, ...tables];
          updateTables(newTables);
          setCurrentId(newTable.id);
        }}
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
              const realIdx = history.length - 1 - idx;
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
