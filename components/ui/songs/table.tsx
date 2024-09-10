import { fetchFilteredSongs } from '@/app/lib/database/data';
import React from 'react';
import Link from 'next/link';
import { DeleteSong, UpdateSong } from './buttons';

export default async function SongsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const songs = await fetchFilteredSongs(query, currentPage);
  return (
    <div className="w-full flex flex-col gap-2 rounded-lg p-2 bg-surface-400 dark:bg-surface-dark-300 text-text dark:text-text-dark">
      {songs?.map((song) => (
        <div key={song.id}>
          <div
            className="w-full rounded-md bg-surface-600 dark:bg-surface-dark-400 p-4"
            >
              <Link href={`/songs/${song.id}`}>
                <h3 className='text-bold'>{song.title}</h3>
              </Link>

              <div className=" hidden md:flex justify-end gap-2">
              <UpdateSong id={song.id} />
              <DeleteSong song={song} />  
              </div>
{/*                 
              <div className="flex items-center justify-between gap-2">
                
                <div className="flex items-center justify-between pt-4">
                  <div className="flex justify-end gap-2">
                    <UpdateSong id={song.id} />
                    <DeleteSong song={song} />
                  </div>
                </div>
              </div> */}

          </div>
        </div>
        ))}
    </div>
  );
}
