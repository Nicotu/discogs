import { Card } from "@/components/Card";
import { ResultsPagination } from "@/components/ResultsPagination";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

type Release = {
  id: number;
  title: string;
  thumb: string;
  main_release: number;
};

type ReleasesResponse = {
  pagination: {
    page: number;
    pages: number;
    per_page: number;
    items: number;
    urls: {
      last: string;
      next: string;
    };
  };
  releases: Release[];
};

const style = {
  header:
    "content mx-auto sticky top-0 z-20 bg-[#6a7dd6] flex items-center justify-between",
  itemsList: "itemsList",
  pageTitle: "text-2xl py-4",
};

async function ReleaseList({
  id,
  page,
  baseUrl,
}: {
  id: string;
  page: string;
  baseUrl: string;
}) {
  const { itemsList } = style;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/search-releases?id=${id}&page=${page}`;
  const response = await fetch(url);
  const { releases, pagination }: ReleasesResponse = await response.json();

  return (
    <>
      <ul className={itemsList}>
        {releases.map((release) => {
          return (
            <Card
              key={release.id}
              data={{ ...release, cover_image: release.thumb }}
              link={`/artists/${id}/releases/${
                release.main_release || release.id
              }`}
              ctaText="View release"
            />
          );
        })}
      </ul>
      <ResultsPagination
        page={page}
        id={id}
        baseUrl={baseUrl}
        totalPages={pagination.pages}
      />
    </>
  );
}

export default async function Releases({
  params,
}: {
  params: Promise<{ id: string; page: string }>;
}) {
  const { header, pageTitle } = style;
  const { id, page } = await params;
  const baseUrl = `/artists/${id}/releases/p`;

  return (
    <main>
      <header className={header}>
        <Link href="/" className="relative h-[30px] w-[30px] inline-block">
          <Image alt="loading" src="/note.svg" fill />
        </Link>
        <h1 className={pageTitle}>Releases</h1>
      </header>

      <Suspense
        fallback={
          <div className="content mx-auto min-h-[600px]">
            <div className="spinning-inifinite relative h-[50px] w-[50px]">
              <Image alt="loading" src="/vinyl.svg" fill />
            </div>
          </div>
        }
      >
        <ReleaseList id={id} page={page} baseUrl={baseUrl} />
      </Suspense>
    </main>
  );
}
