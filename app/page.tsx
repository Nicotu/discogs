import { Card } from "@/components/Card";
import { Search } from "@/components/Search";
import { Artist } from "../types";
import { Suspense } from "react";
import Image from "next/image";

export const dynamic = "force-dynamic";

type SearchResultsResponse = {
  results: Artist[];
};

const styles = {
  searchContainer: "content mx-auto sticky top-0 z-20 bg-[#6a7dd6]",
  itemsList: "itemsList",
};

async function ArtistList() {
  const { itemsList } = styles;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/search-artist`;

  const response = await fetch(url);
  const artists = await response.json();
  const { results }: SearchResultsResponse = artists;

  return (
    <ul className={itemsList}>
      {results.map((artist) => (
        <Card
          data={artist}
          key={artist.id}
          link={`/artists/${artist.id}/releases/p/1`}
          ctaText="See all releases"
        />
      ))}
    </ul>
  );
}

export default async function Home() {
  const { searchContainer } = styles;

  return (
    <>
      <header className={searchContainer}>
        <Search placeholder="Search for an artist..." />
      </header>

      <main>
        <Suspense
          fallback={
            <div className="content mx-auto min-h-[600px]">
              <div className="spinning-inifinite relative h-[50px] w-[50px]">
                <Image alt="loading" src="/vinyl.svg" fill />
              </div>
            </div>
          }
        >
          <ArtistList />
        </Suspense>
      </main>
    </>
  );
}
