// db.ts

import { Client } from 'pg';

// Replace 'your_postgresql_connection_string' with the actual connection details
const conString ='postgres://zgzgojro:r2JFf16qN6aOtijMq3BdhHtETtYqVijz@flora.db.elephantsql.com/zgzgojro';

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
