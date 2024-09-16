'use server';

import { z } from 'zod'; 
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { del, put } from '@vercel/blob';
import { Artist, Song } from './database/definitions';
// import { signIn } from '@/auth';
// import { AuthError } from 'next-auth';

const FormSchema = z.object({
  id: z.string(),
  title: z.string(),
  file_path: z.string(),
  artists: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
});

const CreateSong = FormSchema.omit({ id: true });
const UpdateSong = FormSchema.omit({ id: true });


export async function createArtist(formData: FormData) {
  const name = formData.get('name') as string;

  if (!name) {
    return { success: false, message: 'Missing name of artist' };
  }

  try {
    const artistResult = await sql`
      INSERT INTO artists (name)
      VALUES (${name})
      RETURNING id
    `;

  } catch (error) {
    console.error('Failed to upload file or save song:', error);
    return { success: false, message: 'Failed to upload file or save song' };
  }

  revalidatePath('/songs/create');
  revalidatePath('/artists');
  redirect('/artists');
}
export async function updateArtist(id: string, formData: FormData) {
  const name = formData.get('name') as string;

  if (!name) {
    return { success: false, message: 'Missing name of artist' };
  }
  
  try {
    await sql`
        UPDATE artists
        SET name = ${name}
        WHERE id = ${id}
      `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Artist.' };
  }
  
  revalidatePath(`/artists/${id}/edit`);
  revalidatePath(`/artists/${id}`);
  revalidatePath('/artists');
  redirect('/artists');
}

export async function deleteArtist(artist: Artist) {
  try {
    await sql`DELETE FROM artists WHERE id = ${artist.id}`;
    revalidatePath('/artists');
    return { message: 'Deleted Artist.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Artist.' };
  }
}

export async function createSong(formData: FormData) {
  const title = formData.get('title') as string;
  const file = formData.get('file') as Blob;

  if (!title || !file) {
    return { success: false, message: 'Missing title or file' };
  }

  const contentType = file.type || 'application/octet-stream';
  const filename = title; // Ensure unique filename generation

  try {
    const blob = await put(filename, file, {
      contentType,
      access: 'public',
    });

    await createSongQueries(title, blob.url);


  } catch (error) {
    console.error('Failed to upload file or save song:', error);
    return { success: false, message: 'Failed to upload file or save song' };
  }

  revalidatePath('/songs');
  redirect('/songs');
}

async function createSongQueries(
  title: string,
  file_path: string,
  artists: string[] = [],
  tags: string[] = []
) {
  // Insert song into the songs table and get the song ID
  const songResult = await sql`
    INSERT INTO songs (title, file_path)
    VALUES (${title}, ${file_path})
    RETURNING id
  `;
  const song_id = songResult.rows[0].id;

  // Insert artists into the artists table and link them to the song
  for (const artist of artists) {
    let artistResult = await sql`
      INSERT INTO artists (name)
      VALUES (${artist})
      ON CONFLICT (name) DO NOTHING
      RETURNING id
    `;

    // If no rows are returned, fetch the artist id
    if (artistResult.rows.length === 0) {
      artistResult = await sql`
        SELECT id FROM artists WHERE name = ${artist}
      `;
    }
    const artist_id = artistResult.rows[0].id;

    await sql`
      INSERT INTO songs_artists (songs_id, artists_id)
      VALUES (${song_id}, ${artist_id})
    `;
  }

  // Insert tags into the tags table and link them to the song
  for (const tag of tags) {
    let tagResult = await sql`
      INSERT INTO tags (name)
      VALUES (${tag})
      ON CONFLICT (name) DO NOTHING
      RETURNING id
    `;

    // If no rows are returned, fetch the tag id
    if (tagResult.rows.length === 0) {
      tagResult = await sql`
        SELECT id FROM tags WHERE name = ${tag}
      `;
    }
    const tag_id = tagResult.rows[0].id;

    await sql`
      INSERT INTO songs_tags (songs_id, tags_id)
      VALUES (${song_id}, ${tag_id})
    `;
  }
}


export async function updateSong(id: string, formData: FormData) {
  // Validate the form data
  const validatedFields = UpdateSong.safeParse({
    title: formData.get('title') as string,
    file_path: formData.get('file_path') as string,
    artists: formData.getAll('artists') as string[] | undefined,
    tags: formData.getAll('tags') as string[] | undefined,
  });

  console.log(validatedFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Song.',
    };
  }
  
  const { title, file_path, artists = [], tags = [] } = validatedFields.data;
  
  try {
    await sql`
        UPDATE songs
        SET title = ${title}, file_path = ${file_path}
        WHERE id = ${id}
      `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Song.' };
  }
  
  revalidatePath(`/songs/${id}/edit`);
  revalidatePath(`/songs/${id}`);
  revalidatePath('/songs');
  redirect('/songs');
}

export async function deleteSong(song: Song) {
  try {
    
    await del(song.file_path);
    await sql`DELETE FROM songs WHERE id = ${song.id}`;
    revalidatePath('/songs');
    return { message: 'Deleted Song.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Song.' };
  }
}


// export async function authenticate(
//   prevState: string | undefined,
//   formData: FormData,
// ) {
//   try {
//     await signIn('credentials', formData);
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case 'CredentialsSignin':
//           return 'Invalid credentials.';
//         default:
//           return 'Something went wrong.';
//       }
//     }
//     throw error;
//   }
// }