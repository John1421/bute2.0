'use client';

import Link from 'next/link';
import {
  MusicalNoteIcon,
} from '@heroicons/react/24/outline';
import { createSong, updateSong } from '@/app/lib/actions'; // Adjust the import according to your setup
import { Button } from '../button';
import { Song } from '@/app/lib/database/definitions';
import Uploader from '@/components/Uploader';
import { useState } from 'react';


export default function Form({ song }: { song?: Song }) {

  const [file, setFile] = useState<File | null>(null);


  const handleSubmit = async (formData: FormData) => {
    if (file) {
      formData.append('file', file);
    }
    if(song){
      await updateSong(song.id, formData);
    }else{
      await createSong(formData);
    }
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      handleSubmit(formData);
    }}>
      <div className="rounded-md bg-surface-400 dark:bg-surface-dark-300 text-text dark:text-text-dark p-4 md:p-6 mt-8">
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-xl font-semibold">
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
                defaultValue={song?.title}
                required
              />
              <MusicalNoteIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 icon" />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="file" className="mb-2 block text-xl font-semibold">
            Upload File
          </label>
          <div className="relative mt-2 rounded-md">
            <Uploader onFileSelect={setFile} />
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
        <Button type="submit">{song ? "Guardar" : "Adicionar"}</Button>
      </div>
    </form>
  );
}
