// src/lib/storage.ts

export interface TableData {
  id: string;
  name: string;
  columns: string[];
  rows: string[][];
}

const STORAGE_KEY = "peony_tables";

export function loadTables(): TableData[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? (JSON.parse(data) as TableData[]) : [];
  } catch (e) {
    console.error("Chyba při načítání tabulek z localStorage:", e);
    return [];
  }
}

export function saveTables(tables: TableData[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tables));
  } catch (e) {
    console.error("Chyba při ukládání tabulek do localStorage:", e);
  }
}
