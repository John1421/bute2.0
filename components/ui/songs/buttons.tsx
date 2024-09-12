import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import MagicButton from '../magic-button';
import ButtonLink from '../button-link';
import { deleteArtist, deleteSong } from '@/app/lib/actions';
import { Artist, Song } from '@/app/lib/database/definitions';

export function CreateSong() {
  return (
    <ButtonLink href="/songs/create" text="Adicionar Música" icon={<PlusIcon className="h-5 md:ml-4" />} className='hidden md:block w-12 md:w-[20rem] h-10'/>
  );
}

export function UpdateSong({ id }: { id: string }) {
  return (
    <ButtonLink href={`/songs/${id}/edit`} text="" icon={<PencilIcon className="w-5" />} className='w-8 h-8 md:w-10 md:h-10'/>
  );
}

export function DeleteSong({ song }: { song: Song }) {
  const deleteSongWithId = deleteSong.bind(null, song);
  return (
    <form action={deleteSongWithId}>
      <button className="rounded-md border p-2 hover:bg-red-400">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}


export function CreateArtist() {
  return (
    <ButtonLink href="/artists/create" text="Adicionar Autor" icon={<PlusIcon className="h-5 md:ml-4" />} className='hidden md:block w-12 md:w-[20rem] h-10'/>
  );
}
export function UpdateArtist({ id }: { id: string }) {
  return (
    <ButtonLink href={`/artists/${id}/edit`} text="" icon={<PencilIcon className="w-5" />} className='w-8 h-8 md:w-10 md:h-10'/>
  );
}
export function DeleteArtist({ artist }: { artist: Artist }) {
  const deleteSongWithId = deleteArtist.bind(null, artist);
  return (
    <form action={deleteSongWithId}>
      <button className="rounded-md border p-2 hover:bg-red-400">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
