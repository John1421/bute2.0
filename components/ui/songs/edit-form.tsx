'use client';

import Link from 'next/link';
import {
  MusicalNoteIcon,
  ServerStackIcon,
} from '@heroicons/react/24/outline';
import { updateSong } from '@/app/lib/actions';
import { Button } from '../button';
import { Song } from '@/app/lib/database/definitions';

export default function Form({
    song
}: {song: Song}) {
  const updateSongWithId = updateSong.bind(null, song.id);
  return (
    <form action={updateSongWithId}>
      <div className="rounded-md bg-surface-400 dark:bg-surface-dark-300 text-text dark:text-text-dark p-4 md:p-6 mt-8">
        {/* Song Title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Nome
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Nome da música"
                className="peer block w-full rounded-md border border-surface-200 dark:border-surface-dark-500 bg-surface-600 dark:bg-surface-dark-300 py-2 pl-10 text-sm outline-2 placeholder:text-placeholder dark:placeholder:text-placeholder-dark"
                defaultValue={song.title}
                required
              />
              <MusicalNoteIcon  className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 icon" />
            </div>
          </div>
        </div>

        {/* File Path */}
        <div className="mb-4">
          <label htmlFor="file_path" className="mb-2 block text-sm font-medium">
            File Path
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="file_path"
                name="file_path"
                type="text"
                placeholder="File path"
                className="peer block w-full rounded-md border border-surface-200 dark:border-surface-dark-500 bg-surface-600 dark:bg-surface-dark-300 py-2 pl-10 text-sm outline-2 placeholder:text-placeholder dark:placeholder:text-placeholder-dark"
                defaultValue={song.file_path}
                required
              />
              <ServerStackIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 icon" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/songs"
          className="flex h-10 items-center rounded-lg bg-surface-500 dark:bg-surface-dark-300 px-4 text-sm font-medium text-text dark:text-text-dark transition-colors hover:bg-surface-600 dark:hover:bg-surface-dark-400"
        >
          Cancel
        </Link>
        <Button type="submit">Guardar</Button>
      </div>
    </form>
  );
}
