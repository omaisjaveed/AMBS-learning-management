import pool from '../config/db';

export interface Service {
  id?: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  sort_order?: number;
  status?: 'active' | 'inactive';
  created_at?: Date;
}

export const getAll = async (): Promise<Service[]> => {
  const [rows]: any = await pool.execute('SELECT * FROM services ORDER BY sort_order ASC');
  return rows;
};

export const getById = async (id: number): Promise<Service | null> => {
  const [rows]: any = await pool.execute('SELECT * FROM services WHERE id = ?', [id]);
  return rows.length > 0 ? rows[0] : null;
};

export const getBySlug = async (slug: string): Promise<Service | null> => {
  const [rows]: any = await pool.execute('SELECT * FROM services WHERE slug = ?', [slug]);
  return rows.length > 0 ? rows[0] : null;
};

export const create = async (service: Partial<Service>): Promise<number> => {
  const { title, slug, description, content, image, sort_order = 0 } = service;
  const [result]: any = await pool.execute(
    'INSERT INTO services (title, slug, description, content, image, sort_order) VALUES (?, ?, ?, ?, ?, ?)',
    [title, slug, description, content, image, sort_order]
  );
  return result.insertId;
};

export const update = async (id: number, service: Partial<Service>): Promise<boolean> => {
  const { title, slug, description, content, image, sort_order, status } = service;
  const [result]: any = await pool.execute(
    'UPDATE services SET title = ?, slug = ?, description = ?, content = ?, image = ?, sort_order = ?, status = ? WHERE id = ?',
    [title, slug, description, content, image, sort_order, status, id]
  );
  return result.affectedRows > 0;
};

export const remove = async (id: number): Promise<boolean> => {
  const [result]: any = await pool.execute('DELETE FROM services WHERE id = ?', [id]);
  return result.affectedRows > 0;
};
