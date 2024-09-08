import { db } from "@vercel/postgres";



const client = await db.connect();


async function dropTables() {
    // Drop dependent tables first
    await client.sql`DROP TABLE IF EXISTS songs_artists;`;
    await client.sql`DROP TABLE IF EXISTS songs_tags;`;

    // Then drop the referenced tables
    await client.sql`DROP TABLE IF EXISTS tags;`;
    await client.sql`DROP TABLE IF EXISTS artists;`;
    await client.sql`DROP TABLE IF EXISTS songs;`;

    // Finally, drop the UUID extension if needed
    await client.sql`DROP EXTENSION IF EXISTS "uuid-ossp";`;
}

export async function GET() {
    try {
      await client.sql`BEGIN`;
      await dropTables();
      await client.sql`COMMIT`;
  
      return Response.json({ message: 'Database dropped successfully' });
    } catch (error) {
      await client.sql`ROLLBACK`;
      return Response.json({ error }, { status: 500 });
    }
}
