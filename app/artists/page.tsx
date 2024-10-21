import Search from "@/components/Search";
import { oswald } from "@/components/ui/fonts";
import { CreateButton } from "@/components/ui/songs/buttons";
import Pagination from "@/components/ui/songs/pagination";
import { ArtistsTable } from "@/components/ui/songs/table";
import { fetchArtistsPages } from "../../lib/database/data";
import { isProduction } from "../../lib/utils";
import PageBlueprint from "@/components/ui/PageBlueprint";

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
    <PageBlueprint query={query} currentPage={currentPage} totalPages={totalPages} title={"Autores"} create={false} entityType={"artists"} /> 
  );
}