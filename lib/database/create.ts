import { db } from '@vercel/postgres';

// IT SHOULD BE INSIDE THE APP DIRECTORY AND IN A ROUTE.TS FILE

const client = await db.connect();

async function createTables() {
	await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; -- Enable UUID generation in PostgreSQL`;

	await client.sql`
		CREATE TABLE IF NOT EXISTS songs (
				id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
				title TEXT NOT NULL,
				file_path TEXT NOT NULL UNIQUE
		);
	`;

	await client.sql`
		CREATE TABLE IF NOT EXISTS artists (
				id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
				name TEXT NOT NULL UNIQUE
		);
	`;
	
	await client.sql`
		CREATE TABLE IF NOT EXISTS tags (
				id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
				name TEXT NOT NULL UNIQUE
		);
	`;

	await client.sql`
		CREATE TABLE IF NOT EXISTS songs_tags (
				songs_id UUID, 
				tags_id UUID,  
				PRIMARY KEY(songs_id, tags_id), 
				FOREIGN KEY (songs_id) REFERENCES songs(id) ON DELETE CASCADE, 
				FOREIGN KEY (tags_id) REFERENCES tags(id) ON DELETE CASCADE
		);
	`;

	await client.sql`
			CREATE TABLE songs_artists (
				songs_id UUID, 
				artists_id UUID, 
				PRIMARY KEY(songs_id, artists_id), 
				FOREIGN KEY (songs_id) REFERENCES songs(id) ON DELETE CASCADE, 
				FOREIGN KEY (artists_id) REFERENCES artists(id) ON DELETE CASCADE
		);
	`;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    await createTables();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}