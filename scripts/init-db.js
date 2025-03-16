const { Client } = require('pg');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

async function main() {
  console.log('Connecting to PostgreSQL...');
  
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL successfully!');
    
    // Check if the database exists
    const result = await client.query(`
      SELECT datname FROM pg_database WHERE datname = 'postgres';
    `);
    
    if (result.rows.length === 0) {
      console.log('Creating database postgres...');
      await client.query(`CREATE DATABASE postgres;`);
      console.log('Database created successfully!');
    } else {
      console.log('Database postgres already exists.');
    }
    
    // Create the vector extension if it doesn't exist
    try {
      await client.query(`CREATE EXTENSION IF NOT EXISTS vector;`);
      console.log('Vector extension created or already exists.');
    } catch (error) {
      console.error('Error creating vector extension:', error.message);
    }
    
    console.log('Database initialization completed successfully!');
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error.message);
    console.error('Please make sure PostgreSQL is running and the credentials are correct.');
  } finally {
    await client.end();
  }
}

main().catch(console.error); 