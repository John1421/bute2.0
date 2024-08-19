import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import MagicButton from '../magic-button';
import ButtonLink from '../button-link';
// import { deleteInvoice } from '@/app/lib/actions';

export function CreateSong() {
  return (
    <ButtonLink href="/songs/create" text="Adicionar Música" icon={<PlusIcon className="h-5 md:ml-4" />} className='w-12 md:w-[20rem] h-10'/>
  );
}

export function UpdateSong({ id }: { id: string }) {
  return (
    <ButtonLink href={`/songs/${id}/edit`} text="" icon={<PencilIcon className="w-5" />} className='w-8 h-8 md:w-10 md:h-10'/>
    // <Link
    //   href={`/songs/${id}/edit`}
    //   className="rounded-md border p-2 hover:bg-gray-100"
    // >
    //   <PencilIcon className="w-5" />
    // </Link>
  );
}


// export function DeleteInvoice({ id }: { id: string }) {
//   const deleteInvoiceWithId = deleteInvoice.bind(null, id);
//   return (
//     <form action={deleteInvoiceWithId}>
//       <button className="rounded-md border p-2 hover:bg-gray-100">
//         <span className="sr-only">Delete</span>
//         <TrashIcon className="w-5" />
//       </button>
//     </form>
//   );
// }
