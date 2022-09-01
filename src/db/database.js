/* eslint-disable consistent-return */
import Pool from 'pg-pool';
import dotenv from 'dotenv';

dotenv.config();

const db = new Pool({
  max: 10,
  port: 5432,
  user: process.env.PG_USER,
  database: 'horoscope',
  host: process.env.PG_HOST,
  password: process.env.PG_PASSWORD,
  connectionTimeoutMillis: 0,
  idleTimeoutMillis: 0,
});

db.on('error', (err) => { throw err; });

const getDatabase = (name) => {
  if (name === 'db') return db;
};

const query = async (database, query_string, params) => {
  const pool = getDatabase(database);

  try {
    const res = await pool.query(query_string, params);
    if (!res.rows || res.rows.length === 0) {
      if (query_string.includes('DELETE')) {
        return { success: true };
      }

      if (query_string.includes('INSERT')) {
        return { success: true };
      }

      const error = 'No results found.';
      return {
        success: false,
        error: { query_string, params, error },
      };
    }

    return { success: true, data: res.rows };
  } catch (e) {
    return {
      success: false,
      error: {
        error: e?.message,
        detail: e?.detail,
        table: e?.table,
        constraint: e?.constraint,
      },
    };
  }
};

export { query };
