import pool from '../config/db';
import { RowDataPacket } from 'mysql2';

export interface FAQ {
  id?: number;
  question: string;
  answer: string;
  status: 'active' | 'inactive';
  created_at?: Date;
}

export const getAll = async (): Promise<FAQ[]> => {
  const [rows]: any = await pool.query('SELECT * FROM faqs ORDER BY created_at DESC');
  return rows;
};

export const getById = async (id: number): Promise<FAQ | null> => {
  const [rows]: any = await pool.query('SELECT * FROM faqs WHERE id = ?', [id]);
  return rows.length > 0 ? rows[0] : null;
};

export const create = async (faq: Partial<FAQ>): Promise<number> => {
  const { question, answer, status = 'active' } = faq;
  const [result]: any = await pool.query(
    'INSERT INTO faqs (question, answer, status) VALUES (?, ?, ?)',
    [question, answer, status]
  );
  return result.insertId;
};

export const update = async (id: number, faq: Partial<FAQ>): Promise<boolean> => {
  const fields: string[] = [];
  const values: any[] = [];

  if (faq.question !== undefined) {
    fields.push('question = ?');
    values.push(faq.question);
  }
  if (faq.answer !== undefined) {
    fields.push('answer = ?');
    values.push(faq.answer);
  }
  if (faq.status !== undefined) {
    fields.push('status = ?');
    values.push(faq.status);
  }

  if (fields.length === 0) return true;

  values.push(id);
  const [result]: any = await pool.query(
    `UPDATE faqs SET ${fields.join(', ')} WHERE id = ?`,
    values
  );
  return result.affectedRows > 0;
};

export const remove = async (id: number): Promise<boolean> => {
  const [result]: any = await pool.query('DELETE FROM faqs WHERE id = ?', [id]);
  return result.affectedRows > 0;
};
