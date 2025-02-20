import { Card } from "@/components/Card";
import { Search } from "@/components/Search";
import { notFound } from "next/navigation";

type SearchResultsProps = {
  searchParams: Promise<{ q: string }>;
};

type Artist = {
  title: string;
  id: number;
  name: string;
  cover_image: string;
};

type SearchResultsResponse = {
  results: Artist[];
};

const styles = {
  searchContainer: "content mx-auto sticky top-0 z-20 bg-[#6a7dd6]",
  itemsList: "itemsList",
};

export default async function SearchResults({
  searchParams,
}: SearchResultsProps) {
  const { searchContainer, itemsList } = styles;
  const { q } = await searchParams;

  if (!q) notFound();

  const url = q
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/search-artist?q=${q}`
    : `${process.env.NEXT_PUBLIC_API_URL}/api/search-artist`;

  const response = await fetch(url);
  const artists = await response.json();
  const { results }: SearchResultsResponse = artists;

  return (
    <main>
      <div className={searchContainer}>
        <Search initialValue={q} />
      </div>

      <div>
        <ul className={itemsList}>
          {results.map((artist) => (
            <Card
              key={artist.id}
              data={artist}
              ctaText="See all releases"
              link={`/artists/${artist.id}/releases/p/1`}
            />
          ))}
        </ul>
      </div>
    </main>
  );
}
