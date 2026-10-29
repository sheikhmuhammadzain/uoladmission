import { PrismaClient } from '@prisma/client';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function main() {
  console.log('Setting up the database...');

  try {
    // Run Prisma migrations
    console.log('Running Prisma migrations...');
    await execAsync('npx prisma migrate dev --name init');
    
    // Initialize the pgvector extension
    console.log('Initializing pgvector extension...');
    const prisma = new PrismaClient();
    
    try {
      await prisma.$executeRawUnsafe('CREATE EXTENSION IF NOT EXISTS vector;');
      console.log('pgvector extension initialized successfully.');
    } catch (error) {
      console.error('Error initializing pgvector extension:', error);
    } finally {
      await prisma.$disconnect();
    }

    console.log('Database setup completed successfully!');
  } catch (error) {
    console.error('Error setting up the database:', error);
    process.exit(1);
  }
}

main(); 