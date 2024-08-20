import { DeleteSong, UpdateSong } from './buttons';
import { fetchFilteredSongs } from '@/app/lib/database/data';
// import InvoiceStatus from '@/app/ui/invoices/status';
// import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
// import { fetchFilteredInvoices } from '@/app/lib/data';

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const songs = await fetchFilteredSongs(query, currentPage);
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg p-2 bg-surface-400 dark:bg-surface-dark-300 text-text dark:text-text-dark">
          {/* For Mobile */}
          <div className="">
            {songs?.map((song) => (
              <div
                key={song.id}
                className="mb-2 w-full rounded-md bg-surface-600 dark:bg-surface-dark-400 p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center justify-between md:w-[75%]">
                    <div>
                      <div className="mb-2 flex items-center font-bold text-heading dark:text-heading-dark">
                        <h3>{song.title}</h3>
                      </div>
                      <p className="text-xs">{song.file_path}</p>
                    </div>
                    <p className="text-xs hidden md:block">PUT TAGS HERE</p>
                  </div>
                  {/* <PlayIcon className='flex w-8 text-primary-500'/> */}
                  <div className="flex items-center justify-between pt-4">
                    <div className="flex justify-end gap-2">
                      <UpdateSong id={song.id} />
                      <DeleteSong id={song.id} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
