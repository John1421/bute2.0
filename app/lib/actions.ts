'use server';

import { z } from 'zod'; 
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
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
const UpdateInvoice = FormSchema.omit({ id: true });

// Define the State type
export type State = {
  errors?: {
    title?: string[];
    file_path?: string[];
    artists?: string[];
    tags?: string[];
  };
  message?: string | null;
};



export async function createSong(formData: FormData) {
  // Validate the form data
  const validatedFields = CreateSong.safeParse({
    title: formData.get('title') as string,
    file_path: formData.get('file_path') as string,
    artists: formData.getAll('artists') as string[] | undefined,
    tags: formData.getAll('tags') as string[] | undefined,
  });

  console.log(validatedFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Song.',
    };
  }

  const { title, file_path, artists = [], tags = [] } = validatedFields.data;
  try {
    createSongQueries(title, file_path, artists, tags)
  } catch (error) {
    return { message: 'Database Error: Failed to Create Song.' };
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


// export async function updateInvoice(id: string, formData: FormData) {
//   // Validate the form data
//   const validatedFields = CreateSong.safeParse({
//     title: formData.get('title') as string,
//     file_path: formData.get('file_path') as string,
//     artists: formData.getAll('artists') as string[] | undefined,
//     tags: formData.getAll('tags') as string[] | undefined,
//   });

//   console.log(validatedFields);

//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: 'Missing Fields. Failed to Create Song.',
//     };
//   }
 
//   try {
//     await sql`
//         UPDATE invoices
//         SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
//         WHERE id = ${id}
//       `;
//   } catch (error) {
//     return { message: 'Database Error: Failed to Update Invoice.' };
//   }
 
//   revalidatePath('/dashboard/invoices');
//   redirect('/dashboard/invoices');
// }

// export async function deleteInvoice(id: string) {
//   try {
//     await sql`DELETE FROM invoices WHERE id = ${id}`;
//     revalidatePath('/dashboard/invoices');
//     return { message: 'Deleted Invoice.' };
//   } catch (error) {
//     return { message: 'Database Error: Failed to Delete Invoice.' };
//   }
// }


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