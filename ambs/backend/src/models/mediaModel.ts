import pool from '../config/db';
import { ResultSetHeader } from 'mysql2';

export interface Media {
  id?: number;
  filename: string;
  url: string;
  alt_text?: string | null;
  mime_type?: string | null;
  file_size?: number | null;
  created_at?: Date;
}

export const getAll = async (): Promise<Media[]> => {
  const [rows]: any = await pool.query('SELECT * FROM media ORDER BY created_at DESC');
  return rows as Media[];
};

export const getById = async (id: number): Promise<Media | null> => {
  const [rows]: any = await pool.query('SELECT * FROM media WHERE id = ?', [id]);
  return rows.length > 0 ? rows[0] : null;
};

export const create = async (media: Partial<Media>): Promise<number> => {
  const { filename, url, alt_text = '', mime_type, file_size } = media;
  const [result]: any = await pool.query(
    'INSERT INTO media (filename, url, alt_text, mime_type, file_size) VALUES (?, ?, ?, ?, ?)',
    [filename, url, alt_text, mime_type, file_size]
  );
  return result.insertId;
};

export const updateAltText = async (id: number, alt_text: string): Promise<boolean> => {
  const [result]: any = await pool.query(
    'UPDATE media SET alt_text = ? WHERE id = ?',
    [alt_text, id]
  );
  return result.affectedRows > 0;
};

export const remove = async (id: number): Promise<boolean> => {
  const [result]: any = await pool.query('DELETE FROM media WHERE id = ?', [id]);
  return result.affectedRows > 0;
};
