import prisma from '../config/database';

async function testConnection() {
  try {
    // Test the connection by attempting a simple query
    await prisma.$connect();
    console.log('Database connection test successful!');

    // Perform a simple test query
    const result = await prisma.$queryRaw`SELECT 1`;
    console.log('Test query successful:', result);

    await prisma.$disconnect();
    console.log('Connection closed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Database connection test failed:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

testConnection();