import Search from "@/components/Search";
import { oswald } from "@/components/ui/fonts";

import Pagination from "@/components/ui/songs/pagination";
import { SongsTable } from "@/components/ui/songs/table";
import { fetchSongsPages } from "../lib/database/data";
import { isProduction } from "../lib/utils";
import { CreateButton } from "@/components/ui/songs/buttons";


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
    <div className="flex-col-center gap-8">

      <h1 className={`flex-row-between w-full text-xbold text-large ${oswald.className}`}>Músicas</h1>

      <div className="flex-row-center gap-2 w-full">
        <Search placeholder="Pesquisa..." />
        {isProduction?null:<CreateButton href={"/songs/create"} text={"Adicionar Música"} />}
      </div>

      <SongsTable query={query} currentPage={currentPage} />

      <Pagination totalPages={totalPages} />

    </div>
  );
}