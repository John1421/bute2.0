import Search from "@/components/Search";
import { oswald } from "@/components/ui/fonts";

import Pagination from "@/components/ui/songs/pagination";
import { SongsTable } from "@/components/ui/songs/table";
import { fetchSongsPages } from "../lib/database/data";
import { isProduction } from "../lib/utils";
import { CreateButton } from "@/components/ui/songs/buttons";
import { ListBulletIcon, PlusCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import ButtonLink from "@/components/ui/button-link";


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

      <div className="flex-row-between w-full"><h1 className={`text-xbold text-large ${oswald.className}`}>Músicas</h1> <Link className="w-10 text-primary-200" href={"/list/create  "}><ListBulletIcon/></Link></div>

      <div className="flex-row-center gap-2 w-full">
        <Search placeholder="Pesquisa..." />
        {isProduction?null:<CreateButton href={"/songs/create"} text={"Adicionar Música"} />}
      </div>

      <SongsTable query={query} currentPage={currentPage} />

      <Pagination totalPages={totalPages} />

      <Link href="/list/create" className={'fixed bottom-5 w-12 md:w-[20rem] h-12'}>
        <button className="flex-row-center w-full h-full btnGlow rounded-full p-2">
            <span className={"hidden md:block"}>{"Criar Lista"}</span>
            <PlusIcon className="md:ml-4" />
        </button>
      </Link>
    </div>
  );
}