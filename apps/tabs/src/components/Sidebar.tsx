import type { TableData } from "../lib/storage";
import { v4 as uuid } from "uuid";

interface SidebarProps {
  tables: TableData[];
  currentId: string | null;
  onSelect: (id: string) => void;
  onCreate: () => void;
  onRename: (id: string, newName: string) => void;
  onDelete: (id: string) => void;
  onPaste: (table: TableData) => void;
  onSaveAll: () => void;
  onSaveTable: (table: TableData) => void;
}

export function Sidebar({ tables, currentId, onSelect, onCreate, onRename, onDelete, onPaste, onSaveAll, onSaveTable }: SidebarProps) {
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (!text) return;

      // 1️⃣ JSON
      try {
        const parsed = JSON.parse(text);
        if (parsed && Array.isArray(parsed.columns) && Array.isArray(parsed.rows)) {
          parsed.id = "tmp_" + uuid();
          parsed.name = parsed.name || "Imported Table";
          return onPaste(parsed);
        }
      } catch (_) {}

      // 2️⃣ CSV / TSV / pipe
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

  return (
    <aside className="w-64 h-screen bg-gray-100 border-r p-4 flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Tabulky</h2>

      <div className="flex flex-col gap-2 mb-4">
        <button onClick={onCreate} className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700">+ Nová tabulka</button>
        <button onClick={handlePaste} className="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700">Vložit z clipboardu</button>
        <button onClick={onSaveAll} className="bg-purple-600 text-white py-1 px-3 rounded hover:bg-purple-700">💾 Uložit vše</button>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto">
        {tables.map(t => (
          <div key={t.id} className={`p-2 rounded cursor-pointer flex justify-between items-center ${t.id === currentId ? "bg-blue-200" : "bg-white"}`} onClick={() => onSelect(t.id)}>
            <span className="flex-1">{t.name}</span>
            <div className="flex gap-1">
              <button onClick={(e) => { e.stopPropagation(); const newName = prompt("Nový název:", t.name); if (newName) onRename(t.id, newName); }} className="text-xs text-gray-500 hover:underline">edit</button>
              <button onClick={(e) => { e.stopPropagation(); onDelete(t.id); }} className="text-xs text-red-500 hover:underline">delete</button>
              <button onClick={(e) => { e.stopPropagation(); onSaveTable(t); }} className="text-xs text-green-600 hover:underline">💾</button>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
