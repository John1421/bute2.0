import Search from "@/components/Search";
import { oswald } from "@/components/ui/fonts";
import { CreateSong } from "@/components/ui/songs/buttons";
import Pagination from "@/components/ui/songs/pagination";
import Table from "@/components/ui/songs/table";
import { fetchSongsPages } from "../lib/database/data";

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
  const totalPages = await fetchSongsPages(query);

  return (
    <div className="flex-col-center gap-4">

      <h1 className={`flex-row-between w-full text-xbold text-large ${oswald.className}`}>Músicas</h1>

      <div className="flex-row-center gap-2 w-full">
        <Search placeholder="Pesquisa..." />
        <CreateSong />
      </div>

      <Table query={query} currentPage={currentPage} />

      <Pagination totalPages={totalPages} />

    </div>
  );
}