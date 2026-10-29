const { Client } = require('pg');

async function testConnection(connectionString) {
  console.log(`Testing connection: ${connectionString}`);
  
  const client = new Client({
    connectionString,
  });

  try {
    await client.connect();
    console.log('✅ Connected successfully!');
    await client.end();
    return true;
  } catch (error) {
    console.error(`❌ Connection failed: ${error.message}`);
    return false;
  }
}

async function main() {
  // Test different connection strings
  const connectionStrings = [
    "postgresql://postgres:postgres@localhost:5432/postgres",
    "postgresql://postgres:@localhost:5432/postgres", // No password
    "postgresql://postgres:admin@localhost:5432/postgres", // Different password
    "postgresql://postgres:password@localhost:5432/postgres", // Different password
  ];

  for (const connectionString of connectionStrings) {
    await testConnection(connectionString);
  }
}

main().catch(console.error); 