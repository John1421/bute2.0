import Search from "@/components/Search";
import { oswald } from "@/components/ui/fonts";
import { CreateButton } from "@/components/ui/songs/buttons";
import Pagination from "@/components/ui/songs/pagination";
import { ArtistsTable, TagsTable } from "@/components/ui/songs/table";
import { fetchArtistsPages, fetchTagsPages } from "../lib/database/data";
import { isProduction } from "../lib/utils";

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
  const totalPages = await fetchTagsPages(query);

  return (
    <div className="flex-col-center gap-8">

      <h1 className={`flex-row-between w-full text-xbold text-large ${oswald.className}`}>Tags</h1>

      <div className="flex-row-center gap-2 w-full">
        <Search placeholder="Pesquisa..." />
        {
          isProduction?
          null:
          <CreateButton href="tags/create" text="Adicionar Tag"/>
        }
      </div>

      <TagsTable query={query} currentPage={currentPage} />

      <Pagination totalPages={totalPages} />

    </div>
  );
}