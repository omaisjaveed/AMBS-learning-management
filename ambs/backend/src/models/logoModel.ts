import pool from '../config/db';

export interface Logo {
  id?: number;
  name: string;
  image_url: string;
  sort_order?: number;
  created_at?: Date;
}

export const getAll = async (): Promise<Logo[]> => {
  const [rows]: any = await pool.execute('SELECT * FROM logos ORDER BY sort_order ASC');
  return rows as Logo[];
};

export const getById = async (id: number): Promise<Logo | null> => {
  const [rows]: any = await pool.execute('SELECT * FROM logos WHERE id = ?', [id]);
  return rows.length > 0 ? rows[0] : null;
};

export const create = async (logo: Partial<Logo>): Promise<number> => {
  const { name, image_url, sort_order = 0 } = logo;
  const [result]: any = await pool.execute(
    'INSERT INTO logos (name, image_url, sort_order) VALUES (?, ?, ?)',
    [name, image_url, sort_order]
  );
  return result.insertId;
};

export const update = async (id: number, logo: Partial<Logo>): Promise<boolean> => {
  const { name, image_url, sort_order } = logo;
  const [result]: any = await pool.execute(
    'UPDATE logos SET name = ?, image_url = ?, sort_order = ? WHERE id = ?',
    [name, image_url, sort_order, id]
  );
  return result.affectedRows > 0;
};

export const remove = async (id: number): Promise<boolean> => {
  const [result]: any = await pool.execute('DELETE FROM logos WHERE id = ?', [id]);
  return result.affectedRows > 0;
};
