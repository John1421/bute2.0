import { sql } from '@vercel/postgres';
import { Song } from './definitions';

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredSongs(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const songs = await sql<Song>`
      SELECT
        songs.id,
        songs.title,
        songs.file_path,
        ARRAY_AGG(DISTINCT artists.name ORDER BY artists.name) AS artists,
        ARRAY_AGG(DISTINCT tags.name ORDER BY tags.name) AS tags
      FROM songs
      LEFT JOIN songs_artists ON songs.id = songs_artists.songs_id
      LEFT JOIN artists ON songs_artists.artists_id = artists.id
      LEFT JOIN songs_tags ON songs.id = songs_tags.songs_id
      LEFT JOIN tags ON songs_tags.tags_id = tags.id
      WHERE
        songs.title ILIKE ${`%${query}%`} OR
        artists.name ILIKE ${`%${query}%`} OR
        tags.name ILIKE ${`%${query}%`}
      GROUP BY songs.id
      ORDER BY UPPER(songs.title), UPPER(MIN(artists.name))
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset};
    `;

    return songs.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch songs.');
  }
}


export async function fetchSongsPages(query: string) {

  try {
    const count = await sql`SELECT COUNT(*)
    FROM songs
    LEFT JOIN songs_artists ON songs.id = songs_artists.songs_id
    LEFT JOIN artists ON songs_artists.artists_id = artists.id
    LEFT JOIN songs_tags ON songs.id = songs_tags.songs_id
    LEFT JOIN tags ON songs_tags.tags_id = tags.id
    WHERE
      songs.title ILIKE ${`%${query}%`} OR
      artists.name ILIKE ${`%${query}%`} OR
      tags.name ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of songs.');
  }
}