const { Pool } = require('pg');

export const pool = new Pool({
    user: process.env.NODE_ENV === 'development' ? 'andrewwachira1' : process.env.POSTGRES_USER,
    host: process.env.NODE_ENV === 'development' ? 'localhost' : process.env.POSTGRES_HOST,
    database: process.env.NODE_ENV === 'development' ? 'decode-tech' : process.env.POSTGRES_DATABASE,
    password: process.env.NODE_ENV === 'development' ? "8080" : process.env.POSTGRES_PASSWORD,
    port: 5432, // default PostgreSQL port
    ssl:true
  });

