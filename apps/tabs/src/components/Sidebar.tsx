import { useState } from "react";
import type { TableData } from "../lib/storage";
import { v4 as uuid } from "uuid";

interface SidebarProps {
  tables: TableData[];
  currentId: string | null;
  onSelect: (id: string) => void;
  onSelectDb: (table: TableData) => void;
  onCreate: () => void;
  onRename: (id: string, newName: string) => void;
  onDelete: (id: string) => void;
  onPaste: (table: TableData) => void;
  onSaveAll: () => void;
  onSaveTable: (table: TableData) => void;
}

export function Sidebar({ tables, currentId, onSelect, onSelectDb, onCreate, onRename, onDelete, onPaste, onSaveAll, onSaveTable }: SidebarProps) {
  const [search, setSearch] = useState("");

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (!text) return;

      try {
        const parsed = JSON.parse(text);
        if (parsed && Array.isArray(parsed.columns) && Array.isArray(parsed.rows)) {
          parsed.id = "tmp_" + uuid();
          parsed.name = parsed.name || "Imported Table";
          return onPaste(parsed);
        }
      } catch (_) {}

      const lines = text.trim().split("\n").filter(l => l.trim().length > 0);
      if (lines.length < 2) throw new Error("Neplatný formát tabulky.");
      const splitRow = (row: string) =>
        row.includes("|") ? row.split("|").map(c => c.trim()) :
        row.includes(",") ? row.split(",").map(c => c.trim()) :
        row.split("\t").map(c => c.trim());
      const columns = splitRow(lines[0]);
      const rows = lines.slice(1).map(splitRow);
      onPaste({ id: "tmp_" + uuid(), name: "Imported Table", columns, rows });
    } catch (e: any) {
      alert("❌ Chyba: Nepodařilo se rozpoznat data. Zkontrolujte formát.");
      console.error(e);
    }
  };

  const dbTables = tables.filter(t => !t.id.startsWith("tmp_") && t.name.toLowerCase().includes(search.toLowerCase()));
  const localTables = tables.filter(t => t.id.startsWith("tmp_") && t.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <aside className="w-64 h-screen bg-gray-100 border-r p-4 flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Tabulky</h2>

      <div className="flex flex-col gap-2 mb-2">
        <button onClick={onCreate} className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700">+ Nová tabulka</button>
        <button onClick={handlePaste} className="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700">Vložit z clipboardu</button>
        <button onClick={onSaveAll} className="bg-purple-600 text-white py-1 px-3 rounded hover:bg-purple-700">💾 Uložit vše</button>
      </div>

        {/* ===== Vyhledávání ===== */}
        <div className="mb-4 relative">
          <input
            type="text"
            placeholder="Hledat tabulku..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-2 py-1 border rounded outline-none focus:ring-1 focus:ring-blue-500"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          )}
        </div>

      <div className="flex-1 space-y-2 overflow-y-auto">
        {/* ===== DB Tabulky ===== */}
        {dbTables.length > 0 && <h3 className="font-semibold mt-2 mb-1">DB Tabulky</h3>}
        {dbTables.map(t => (
          <div key={t.id} className={`p-2 rounded cursor-pointer flex justify-between items-center ${t.id === currentId ? "bg-blue-200" : "bg-white"}`} onClick={() => onSelectDb(t)}>
            <span className="flex-1">{t.name}</span>
            <div className="flex gap-1">
              <button onClick={(e) => { e.stopPropagation(); const newName = prompt("Nový název:", t.name); if (newName) onRename(t.id, newName); }} className="text-xs text-gray-500 hover:underline">edit</button>
              <button onClick={(e) => { e.stopPropagation(); onDelete(t.id); }} className="text-xs text-red-500 hover:underline">delete</button>
            </div>
          </div>
        ))}

        {/* ===== LocalStorage Tabulky ===== */}
        {localTables.length > 0 && <h3 className="font-semibold mt-4 mb-1">LocalStorage Tabulky</h3>}
        {localTables.map(t => (
          <div key={t.id} className={`p-2 rounded cursor-pointer flex justify-between items-center ${t.id === currentId ? "bg-yellow-200" : "bg-white"}`} onClick={() => onSelect(t.id)}>
            <span className="flex-1">{t.name}</span>
            <div className="flex gap-1">
              <button onClick={(e) => { e.stopPropagation(); const newName = prompt("Nový název:", t.name); if (newName) onRename(t.id, newName); }} className="text-xs text-gray-500 hover:underline">edit</button>
              <button onClick={(e) => { e.stopPropagation(); onDelete(t.id); }} className="text-xs text-blue-500 hover:underline">delete</button>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
