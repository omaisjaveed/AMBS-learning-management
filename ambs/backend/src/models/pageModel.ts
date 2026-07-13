import pool from '../config/db';

export interface Page {
  id?: number;
  title: string;
  slug: string;
  content: any; // JSON content
  updated_at?: Date;
}

export const getBySlug = async (slug: string): Promise<Page | null> => {
  const [rows]: any = await pool.execute('SELECT * FROM pages WHERE slug = ?', [slug]);
  return rows.length > 0 ? rows[0] : null;
};

export const updateBySlug = async (slug: string, page: Partial<Page>): Promise<boolean> => {
  const { title, content } = page;
  const [result]: any = await pool.execute(
    'UPDATE pages SET title = ?, content = ? WHERE slug = ?',
    [title, JSON.stringify(content), slug]
  );
  return result.affectedRows > 0;
};

export const create = async (page: Partial<Page>): Promise<number> => {
  const { title, slug, content } = page;
  const [result]: any = await pool.execute(
    'INSERT INTO pages (title, slug, content) VALUES (?, ?, ?)',
    [title, slug, JSON.stringify(content)]
  );
  return result.insertId;
};
