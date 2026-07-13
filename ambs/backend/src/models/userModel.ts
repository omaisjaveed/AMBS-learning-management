import pool from '../config/db';

export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
  role?: 'admin' | 'user';
  created_at?: Date;
}

export const findByEmail = async (email: string): Promise<User | null> => {
  const [rows]: any = await pool.execute(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  return rows.length > 0 ? rows[0] : null;
};

export const findById = async (id: number): Promise<User | null> => {
  const [rows]: any = await pool.execute(
    'SELECT * FROM users WHERE id = ?',
    [id]
  );
  return rows.length > 0 ? rows[0] : null;
};

export const create = async (user: Partial<User>): Promise<number> => {
  const { username, email, password, role = 'admin' } = user;
  const [result]: any = await pool.execute(
    'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
    [username, email, password, role]
  );
  return result.insertId;
};

export const update = async (id: number, updates: Partial<User>): Promise<void> => {
  const { username, email, password } = updates;
  
  // Build the query dynamically based on which fields are provided
  const fields: string[] = [];
  const values: any[] = [];
  
  if (username) {
    fields.push('username = ?');
    values.push(username);
  }
  
  if (email) {
    fields.push('email = ?');
    values.push(email);
  }
  
  if (password) {
    fields.push('password = ?');
    values.push(password);
  }
  
  if (fields.length > 0) {
    values.push(id);
    const query = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
    await pool.execute(query, values);
  }
};
