import PageBlueprint from "@/components/ui/PageBlueprint";
import { DeleteSong, UpdateButton } from "@/components/ui/songs/buttons";
import { fetchFilteredSongs, fetchSongsPages } from "@/lib/database/data";

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

  const songs = await fetchFilteredSongs(query, currentPage);

  return (
    <PageBlueprint query={query} currentPage={currentPage} totalPages={totalPages} title={"Músicas"} create={false} entityType={"songs"} /> 
  );
}