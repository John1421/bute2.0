import Image from 'next/image';
import { UpdateInvoice } from './buttons';
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
  // const invoices = await fetchFilteredInvoices(query, currentPage);
  await new Promise((resolve) => setTimeout(resolve, 2500));
  const songs = [
    {
      id: 1,
      name: "De noche",
      autor: "C"
    },
    {
      id: 2,
      name: "Magnificat",
      autor: "B"
    }
  ]
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* For Mobile */}
          <div className="md:hidden">
            {songs?.map((song) => (
              <div
                key={song.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{song.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{song.autor}</p>
                  </div>
                  {/* <InvoiceStatus status={song.status} /> */}
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  {/* <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(song.amount)}
                    </p>
                    <p>{formatDateToLocal(song.date)}</p>
                  </div> */}
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice id={`${song.id}`} />
                    {/* <DeleteInvoice id={song.id} /> */}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* For Pc */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Nome
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Autor
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Tags
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {songs?.map((song) => (
                <tr
                  key={song.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    {song.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {song.autor}
                  </td>
                  {/* <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(song.date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <InvoiceStatus status={song.status} />
                  </td> */}
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="flex justify-end gap-3">
                      <UpdateInvoice id={`${song.id}`} />
                      {/* <DeleteInvoice id={song.id} /> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
