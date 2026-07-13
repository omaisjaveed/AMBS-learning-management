import pool from '../config/db';

export interface Inquiry {
  id?: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  is_read?: boolean;
  created_at?: Date;
}

export const getAll = async (): Promise<Inquiry[]> => {
  const [rows]: any = await pool.execute('SELECT * FROM inquiries ORDER BY created_at DESC');
  return rows as Inquiry[];
};

export const getById = async (id: number): Promise<Inquiry | null> => {
  const [rows]: any = await pool.execute('SELECT * FROM inquiries WHERE id = ?', [id]);
  return rows.length > 0 ? rows[0] : null;
};

export const create = async (inquiry: Partial<Inquiry>): Promise<number> => {
  const { name, email, phone, subject, message } = inquiry;
  const [result]: any = await pool.execute(
    'INSERT INTO inquiries (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)',
    [name, email, phone, subject, message]
  );
  return result.insertId;
};

export const markAsRead = async (id: number): Promise<boolean> => {
  const [result]: any = await pool.execute('UPDATE inquiries SET is_read = TRUE WHERE id = ?', [id]);
  return result.affectedRows > 0;
};

export const remove = async (id: number): Promise<boolean> => {
  const [result]: any = await pool.execute('DELETE FROM inquiries WHERE id = ?', [id]);
  return result.affectedRows > 0;
};
