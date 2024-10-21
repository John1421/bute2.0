import Search from "@/components/Search";
import { oswald } from "@/components/ui/fonts";
import Pagination from "@/components/ui/songs/pagination";
import {GenericTable } from "@/components/ui/songs/table";
import { isProduction } from "../../lib/utils";
import { CreateButton } from "@/components/ui/songs/buttons";
import { EntityType } from "@/lib/database/definitions";



export default async function PageBlueprint({
    query,
    currentPage,
    totalPages,
    title,
    entityType,
    create = true,
  }: {
    query: string;
    currentPage: number;
    totalPages: number;
    title: string;
    entityType: EntityType;
    create: boolean;
  }) {

  return (
    <div className="flex-col-center gap-8">
      <div className="flex-row-between w-full">
        <h1 className={`text-xbold text-large ${oswald.className}`}>{title}</h1>
      </div>
      <div className="flex-row-center gap-2 w-full">
        <Search placeholder="Pesquisa..." />
        {(create || !isProduction) && <CreateButton href={entityType + "/create"} text={"Adicionar"} />}
      </div>
      <GenericTable entityType={entityType} query={query} currentPage={currentPage}  />
      <Pagination totalPages={totalPages} />
    </div>
  );
}