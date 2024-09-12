import Search from "@/components/Search";
import { oswald } from "@/components/ui/fonts";
import { CreateArtist, CreateSong } from "@/components/ui/songs/buttons";
import Pagination from "@/components/ui/songs/pagination";
import { ArtistsTable } from "@/components/ui/songs/table";
import { fetchArtistsPages } from "../lib/database/data";

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
  const totalPages = await fetchArtistsPages(query);

  return (
    <div className="flex-col-center gap-8">

      <h1 className={`flex-row-between w-full text-xbold text-large ${oswald.className}`}>Autores</h1>

      <div className="flex-row-center gap-2 w-full">
        <Search placeholder="Pesquisa..." />
        <CreateArtist />
      </div>

      <ArtistsTable query={query} currentPage={currentPage} />

      <Pagination totalPages={totalPages} />

    </div>
  );
}