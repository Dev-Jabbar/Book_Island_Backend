// db.ts

import { Client } from 'pg';


import dotenv from 'dotenv';
dotenv.config();

const conString =process.env.DB_CONNECTION_STRING

const client = new Client({
  connectionString: conString,
});

// Connect to the PostgreSQL database
client.connect((err) => {
  if (err) {
    return console.error('could not connect to postgres', err);
  }

  console.log('Connected to PostgreSQL database');
});

export default client;
