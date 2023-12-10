const { Pool } = require('pg');

export const pool = new Pool({
    user: 'andrewwachira1',
    host: 'localhost',
    database: 'decode-tech',
    password: "8080",
    port: 5432, // default PostgreSQL port
  });

