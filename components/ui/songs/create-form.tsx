'use client';

// import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  MusicalNoteIcon,
  ServerStackIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
// import { Button } from '@/app/ui/button';
// import { createInvoice, State } from '@/app/lib/actions';
import { useActionState } from 'react';
import { Button } from '../button';

export default function Form() {
  // const initialState: State = { message: null, errors: {} };
  // const [state, formAction] = useActionState(createInvoice, initialState);
  return (
    <form action={() => {}}>
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
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
              <MusicalNoteIcon  className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required
              />
              <ServerStackIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Customer Name */}
        {/* <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose customer
          </label>
          <div className="relative">
            <select
              id="customer"
              name="customerId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="customer-error"
              required
            >
              <option value="" disabled>
                Select a customer
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.customerId &&
              state.errors.customerId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div> */}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/songs"
          className="flex h-10 items-center rounded-lg bg-surface-500 dark:bg-surface-dark-300 px-4 text-sm font-medium text-text dark:text-text-dark transition-colors hover:bg-surface-600 dark:hover:bg-surface-dark-400"
        >
          Cancel
        </Link>
        <Button type="submit">Create Invoice</Button>
      </div>
    </form>
  );
}
