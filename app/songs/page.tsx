import Search from "@/components/Search";
import { oswald } from "@/components/ui/fonts";
import { InvoicesTableSkeleton } from "@/components/ui/skeletons";
import { CreateSong } from "@/components/ui/songs/buttons";
import Table from "@/components/ui/songs/table";
import { Suspense } from "react";

export default async function Home({
    searchParams,
  }: {
    searchParams?: {
      query?: string;
      page?: string;
    };
  }) {

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  // const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${oswald.className} text-2xl`}>Músicas</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Pesquisa..." />
        <CreateSong />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div>
);
}