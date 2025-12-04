import * as tablesService from "../services/tablesService.ts";

export const getAllTables = async (req: any, res: any) => {
  try {
    const tables = await tablesService.getAllTables();
    res.json(tables);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const createTable = async (req: typeof Request, res: typeof Response) => {
  try {
    const table = await tablesService.createNewTable(req.body);
    res.json(table);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const updateTable = async (req: typeof Request, res: typeof Response) => {
  try {
    const { id } = req.params;
    const table = await tablesService.updateExistingTable(id, req.body);
    res.json(table);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const deleteTable = async (req: typeof Request, res: typeof Response) => {
  try {
    const { id } = req.params;
    await tablesService.deleteTableById(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
