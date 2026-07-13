import pool from '../config/db';

export interface Testimonial {
  id?: number;
  name: string;
  position: string;
  company: string;
  content: string;
  rating?: number;
  avatar?: string;
  status?: 'active' | 'inactive';
  created_at?: Date;
}

export const getAll = async (): Promise<Testimonial[]> => {
  const [rows]: any = await pool.execute('SELECT * FROM testimonials ORDER BY created_at DESC');
  return rows;
};

export const getById = async (id: number): Promise<Testimonial | null> => {
  const [rows]: any = await pool.execute('SELECT * FROM testimonials WHERE id = ?', [id]);
  return rows.length > 0 ? rows[0] : null;
};

export const create = async (testimonial: Partial<Testimonial>): Promise<number> => {
  const { name, position, company, content, rating = 5, avatar, status = 'active' } = testimonial;
  const [result]: any = await pool.execute(
    'INSERT INTO testimonials (name, position, company, content, rating, avatar, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [name, position, company, content, rating, avatar, status]
  );
  return result.insertId;
};

export const update = async (id: number, testimonial: Partial<Testimonial>): Promise<boolean> => {
  const { name, position, company, content, rating, avatar, status } = testimonial;
  const [result]: any = await pool.execute(
    'UPDATE testimonials SET name = ?, position = ?, company = ?, content = ?, rating = ?, avatar = ?, status = ? WHERE id = ?',
    [name, position, company, content, rating, avatar, status, id]
  );
  return result.affectedRows > 0;
};

export const remove = async (id: number): Promise<boolean> => {
  const [result]: any = await pool.execute('DELETE FROM testimonials WHERE id = ?', [id]);
  return result.affectedRows > 0;
};
