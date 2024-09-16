import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import MagicButton from '../magic-button';
import ButtonLink from '../button-link';
import { deleteArtist, deleteSong, deleteTag } from '@/app/lib/actions';
import { Artist, Song, Tag } from '@/app/lib/database/definitions';





export function CreateButton({href, text}: {href: string, text: string}){
  return (
    <ButtonLink href={href} text={text} icon={<PlusIcon className="h-5 md:ml-4" />} className='hidden md:block w-12 md:w-[20rem] h-10'/>
  );
}

export function UpdateButton({type, id}: {type: "artists" | "songs" | "tags", id: string}){
  return (
    <ButtonLink href={`/${type}/${id}/edit`} text="" icon={<PencilIcon className="w-5" />} className='w-8 h-8 md:w-10 md:h-10'/>
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

export function DeleteTag({ tag }: { tag: Tag }) {
  const deletTagWithId = deleteTag.bind(null, tag);
  return (
    <form action={deletTagWithId}>
      <button className="rounded-md border p-2 hover:bg-red-400">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
