import { useState } from "react";
import type { TableData } from "../lib/storage";

export function TableEditor({
  table,
  onUpdate,
  onSave,
  onExport,
}: {
  table: TableData;
  onUpdate: (updated: TableData) => void;
  onSave: () => void;
  onExport: () => void;
}) {
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);

  if (!table) return null;

  const applyAutoIds = (rows: string[][]) => rows.map((r, i) => { const row = [...r]; row[0] = String(i + 1); return row; });
  const updateColumnName = (colIndex: number, newName: string) => onUpdate({ ...table, columns: table.columns.map((c, i) => i === colIndex ? newName : c) });
  const updateCell = (row: number, col: number, value: string) => { if (col === 0) return; onUpdate({ ...table, rows: applyAutoIds(table.rows.map((r, ri) => ri === row ? r.map((c, ci) => ci === col ? value : c) : r)) }); };

  const addRow = (position: "above" | "below") => { const idx = selectedCell ? selectedCell.row : table.rows.length; const insertIndex = position === "above" ? idx : idx + 1; const emptyRow = new Array(table.columns.length).fill(""); onUpdate({ ...table, rows: applyAutoIds([...table.rows.slice(0, insertIndex), emptyRow, ...table.rows.slice(insertIndex)]) }); if (selectedCell && position === "above") setSelectedCell({ row: selectedCell.row + 1, col: selectedCell.col }); };
  const deleteRow = () => { if (!selectedCell) return; if (!confirm("Opravdu chcete data smazat?")) return; onUpdate({ ...table, rows: applyAutoIds(table.rows.filter((_, i) => i !== selectedCell.row)) }); setSelectedCell(null); };
  const addColumn = (position: "before" | "after") => { const idx = selectedCell ? selectedCell.col : table.columns.length - 1; const insertIndex = position === "before" ? idx : idx + 1; const newColumns = [...table.columns.slice(0, insertIndex), "col" + table.columns.length, ...table.columns.slice(insertIndex)]; const newRows = table.rows.map(r => [...r.slice(0, insertIndex), "", ...r.slice(insertIndex)]); onUpdate({ ...table, columns: newColumns, rows: applyAutoIds(newRows) }); if (selectedCell && position === "before") setSelectedCell({ row: selectedCell.row, col: selectedCell.col + 1 }); };
  const deleteColumn = () => { if (!selectedCell || selectedCell.col === 0) return alert("Sloupec ID nelze odstranit."); if (!confirm("Opravdu chcete data smazat?")) return; const idx = selectedCell.col; const newColumns = table.columns.filter((_, i) => i !== idx); const newRows = table.rows.map(r => r.filter((_, i) => i !== idx)); onUpdate({ ...table, columns: newColumns, rows: applyAutoIds(newRows) }); setSelectedCell(null); };

  return (
    <div className="p-4 w-full">
      <div className="mb-4 flex gap-2 flex-wrap">
        <button onClick={() => addRow("above")} className="px-3 py-1 bg-gray-200 rounded">+ řádek nad</button>
        <button onClick={() => addRow("below")} className="px-3 py-1 bg-gray-200 rounded">+ řádek pod</button>
        <button onClick={() => addColumn("before")} className="px-3 py-1 bg-gray-200 rounded">+ sloupec před</button>
        <button onClick={() => addColumn("after")} className="px-3 py-1 bg-gray-200 rounded">+ sloupec za</button>
        <button onClick={deleteRow} className="px-3 py-1 bg-red-300 rounded">Smazat řádek</button>
        <button onClick={deleteColumn} className="px-3 py-1 bg-red-300 rounded">Smazat sloupec</button>
        <button onClick={onSave} className="px-3 py-1 bg-green-500 text-white rounded">💾 Uložit tabulku</button>
        <button onClick={onExport} className="px-3 py-1 bg-blue-500 text-white rounded">📤 Export tabulky</button>
      </div>

      <table className="border-collapse">
        <thead>
          <tr>{table.columns.map((col, i) => (
            <th key={i} className="border px-3 py-2 bg-gray-100">
              <input value={col} onChange={e => updateColumnName(i, e.target.value)} className="w-full bg-transparent outline-none" />
            </th>
          ))}</tr>
        </thead>
        <tbody>
          {table.rows.map((row, rIdx) => (
            <tr key={rIdx}>
              {row.map((cell, cIdx) => (
                <td
                  key={cIdx}
                  className={`border px-2 py-1 ${selectedCell?.row === rIdx && selectedCell?.col === cIdx ? "bg-yellow-200" : ""}`}
                  onClick={() => setSelectedCell({ row: rIdx, col: cIdx })}
                >
                  {cIdx === 0 ? <span className="text-gray-600">{cell}</span> :
                    <input value={cell} onChange={e => updateCell(rIdx, cIdx, e.target.value)} className="w-full bg-transparent outline-none" />}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
