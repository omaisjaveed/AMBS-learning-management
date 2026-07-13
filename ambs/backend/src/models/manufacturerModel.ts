import pool from '../config/db';

export interface Manufacturer {
  id?: number;
  name: string;
  slug: string;
  logo: string;
  content: any;
  sort_order?: number;
}

export const getAll = async () => {
  const [rows]: any = await pool.execute('SELECT * FROM manufacturers ORDER BY sort_order ASC, name ASC');
  return rows;
};

export const getBySlug = async (slug: string) => {
  const [rows]: any = await pool.execute('SELECT * FROM manufacturers WHERE slug = ?', [slug]);
  return (rows as any[])[0];
};

export const getById = async (id: number) => {
  const [rows]: any = await pool.execute('SELECT * FROM manufacturers WHERE id = ?', [id]);
  return (rows as any[])[0];
};

export const create = async (data: Manufacturer) => {
  const { name, slug, logo, content, sort_order = 0 } = data;
  const [result] = await pool.execute(
    'INSERT INTO manufacturers (name, slug, logo, content, sort_order) VALUES (?, ?, ?, ?, ?)',
    [name, slug, logo, JSON.stringify(content), sort_order]
  );
  return (result as any).insertId;
};

export const update = async (id: number, data: Partial<Manufacturer>) => {
  const fields: string[] = [];
  const values: any[] = [];

  if (data.name) { fields.push('name = ?'); values.push(data.name); }
  if (data.slug) { fields.push('slug = ?'); values.push(data.slug); }
  if (data.logo) { fields.push('logo = ?'); values.push(data.logo); }
  if (data.content) { fields.push('content = ?'); values.push(JSON.stringify(data.content)); }
  if (data.sort_order !== undefined) { fields.push('sort_order = ?'); values.push(data.sort_order); }

  if (fields.length === 0) return false;

  values.push(id);
  const [result] = await pool.execute(
    `UPDATE manufacturers SET ${fields.join(', ')} WHERE id = ?`,
    values
  );
  return (result as any).affectedRows > 0;
};

export const remove = async (id: number) => {
  const [result] = await pool.execute('DELETE FROM manufacturers WHERE id = ?', [id]);
  return (result as any).affectedRows > 0;
};
