'use server';

import { z } from 'zod'; 
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { del, put } from '@vercel/blob';
import { Artist, Song, SongForm, Tag } from './database/definitions';
// import { signIn } from '@/auth';
// import { AuthError } from 'next-auth';
const FormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  file_path: z.string(),
  artists: z.array(z.object({
    id: z.string(),
    name: z.string()
  })).optional(),
  tags: z.array(z.object({
    id: z.string(),
    name: z.string()
  })).optional(),
  file: z.instanceof(Blob),
});
const CreateForm = FormSchema.omit({file_path: true})


const SimpleSchema = z.object({
  id: z.string(),
  name: z.string(),
}).omit({ id: true });


// ARTIST ACTIONS
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
  
  revalidatePath('/songs/create');
  revalidatePath(`/artists/${id}/edit`);
  revalidatePath(`/artists/${id}`);
  revalidatePath('/artists');
  redirect('/artists');
}
export async function deleteArtist(artist: Artist) {
  try {
    await sql`DELETE FROM artists WHERE id = ${artist.id}`;
    revalidatePath('/songs/create');
    revalidatePath('/artists');
    return { message: 'Deleted Artist.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Artist.' };
  }
}

// SONG ACTIONS
export async function createSong(formData: FormData) {
  const title = formData.get('title') as string;
  const file_path = formData.get('file_path') as string;
  const file = formData.get('file') as Blob;

  const artistsJson = formData.get('artists');
  const tagsJson = formData.get('tags');

  const artists : Artist[]= artistsJson ? JSON.parse(artistsJson as string) : undefined;
  const tags : Tag[] = tagsJson ? JSON.parse(tagsJson as string) : undefined;

  const validatedFields = FormSchema.safeParse({
    title,
    file_path,
    artists,
    tags,
    file
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to create Song.',
    };
  }

  const song = validatedFields.data;

  try {
    const blob = await put(song.title, song.file, {
      contentType: song.file.type || 'application/octet-stream',
      access: 'public',
    });

    await createSongQueries({
      title: song.title,
      artists: song.artists,
      tags: song.tags
    }, blob.url);

    revalidatePath('/songs');
    redirect('/songs');
  } catch (error) {
    console.error('Failed to upload file or save song:', error);
    return { success: false, message: 'Failed to upload file or save song' };
  }
}

async function createSongQueries(
  { title, artists, tags }: { title: string; artists?: Artist[]; tags?: Tag[] },
  file_path: string,
) {
  // Insert song into the songs table and get the song ID
  const songResult = await sql`
    INSERT INTO songs (title, file_path)
    VALUES (${title}, ${file_path})
    RETURNING id
  `;
  const song_id = songResult.rows[0].id;

  // Insert artists into the artists table and link them to the song
  if(artists){
    for (const artist of artists) {
      await sql`
        INSERT INTO songs_artists (songs_id, artists_id)
        VALUES (${song_id}, ${artist.id})
      `;
    }
  }

  if(tags){
    // Insert tags into the tags table and link them to the song
    for (const tag of tags) {
      await sql`
        INSERT INTO songs_tags (songs_id, tags_id)
        VALUES (${song_id}, ${tag.id})
      `;
    }
  }

}
export async function updateSong(id: string, formData: FormData) {
  // Validate the form data
  const validatedFields = FormSchema.safeParse({
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

// TAG ACTIONS
export async function createTag(formData: FormData) {
  
  const validatedFields = SimpleSchema.safeParse({
    name: formData.get('name') as string,
  });

  if (!validatedFields.success) {
    return { success: false, message: 'Missing tag name' };
  }

  try {
    const tagResult = await sql`
      INSERT INTO tags (name)
      VALUES (${validatedFields.data.name})
      RETURNING id
    `;

  } catch (error) {
    console.error('Failed to create tag:', error);
    return { success: false, message: 'Failed to create tag' };
  }

  revalidatePath('/songs/create');
  revalidatePath('/tags');
  redirect('/tags');
}
export async function updateTag(id: string, formData: FormData) {
  const validatedFields = SimpleSchema.safeParse({
    name: formData.get('name') as string,
  });

  if (!validatedFields.success) {
    return { success: false, message: 'Missing tag name' };
  }
  
  try {
    await sql`
        UPDATE tags
        SET name = ${validatedFields.data.name}
        WHERE id = ${id}
      `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update tag.' };
  }
  
  revalidatePath('/songs/create');
  revalidatePath(`/tags/${id}/edit`);
  revalidatePath(`/tags/${id}`);
  revalidatePath('/tags');
  redirect('/tags');
}
export async function deleteTag(tag: Tag) {
  try {

    await sql`DELETE FROM tags WHERE id = ${tag.id}`;
    revalidatePath('/tags');
    return { message: 'Deleted tag.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete tag.' };
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