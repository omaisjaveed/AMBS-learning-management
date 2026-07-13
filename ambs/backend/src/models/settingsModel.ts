import pool from '../config/db';

export interface Setting {
  key: string;
  value: string;
  type: 'text' | 'image' | 'json';
}

export const getAll = async (): Promise<Setting[]> => {
  const [rows]: any = await pool.execute('SELECT * FROM settings');
  return rows;
};

export const getByKey = async (key: string): Promise<Setting | null> => {
  const [rows]: any = await pool.execute('SELECT * FROM settings WHERE `key` = ?', [key]);
  return rows.length > 0 ? rows[0] : null;
};

export const updateBulk = async (settings: { key: string; value: any }[]): Promise<void> => {
  for (const setting of settings) {
    const value = typeof setting.value === 'object' ? JSON.stringify(setting.value) : String(setting.value);
    await pool.execute(
      'INSERT INTO settings (`key`, `value`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `value` = ?',
      [setting.key, value, value]
    );
  }
};
