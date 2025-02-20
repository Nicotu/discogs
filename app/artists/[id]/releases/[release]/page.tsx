import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

type SearchResultsProps = {
  params: Promise<{
    id: string;
    release: string;
  }>;
};

type ReleaseType = {
  id: number;
  title: string;
  thumb: string;
  artists: {
    name: string;
  }[];
  images: {
    uri: string;
  }[];
  released: string;
  labels: {
    name: string;
  }[];
  tracklist: {
    position: string;
    title: string;
  }[];
  community: {
    have: number;
  };
};

const style = {
  header: "content mx-auto bg-[#6a7dd6] flex items-center justify-between py-4",
  main: "content mx-auto bg-slate-200 p-4 md:p-6 md:flex md:gap-8",
  pageTitle: "text-xl md:text-2xl",
  imageGrid: "grid grid-cols-3 gap-4 md:w-[30%] mb-4 md:mb-0 content-start",
  mainImage: "col-span-3 w-full block",
  secondaryImage: "hidden md:block",
  detailsContainer: "flex flex-col",
  detailsHeader: "text-xl md:text-2xl",
  detailtTitle: "text-lg md:text-xl",
  detailLink: "text-xs mt-4 underline",
};

export default async function Release({ params }: SearchResultsProps) {
  const {
    header,
    main,
    pageTitle,
    imageGrid,
    mainImage,
    secondaryImage,
    detailsContainer,
    detailsHeader,
    detailtTitle,
    detailLink,
  } = style;

  const { release, id } = await params;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/releases?id=${release}`;

  const response = await fetch(url);
  const releaseResponse = await response.json();
  console.log(releaseResponse);
  const {
    title,
    artists,
    images,
    released,
    labels,
    tracklist,
    community,
  }: ReleaseType = releaseResponse;
  const artistsNames = artists?.map((artist) => artist.name).join(", ");
  const labelsNames = labels?.map((label) => label.name).join(", ");

  return (
    <div className="min-h-[500px]">
      <header className={header}>
        <Link href="/" className="relative h-[30px] w-[30px] inline-block">
          <Image alt="loading" src="/note.svg" fill />
        </Link>
        <h1 className={pageTitle}>Release Details</h1>
      </header>
      <main className={main}>
        {images?.length > 0 && (
          <div className={imageGrid}>
            {images.map((image, index) => (
              <img
                key={image.uri}
                src={image.uri}
                alt={title}
                className={twMerge(index === 0 ? mainImage : secondaryImage)}
              />
            ))}
          </div>
        )}

        <div className={detailsContainer}>
          <h2 className={detailsHeader}>{artistsNames}</h2>
          <h3 className={detailtTitle}>{title}</h3>

          <dl>
            <dd className="flex gap-1">
              <em className="font-semibold">Released:</em>
              <span>{released}</span>
            </dd>
            <dd className="flex gap-1">
              <em className="font-semibold">Labels:</em>
              <span>{labelsNames}</span>
            </dd>
            <dd className="flex gap-1">
              Appears in <em className="font-semibold"> {community.have}</em>
              user collections
            </dd>
            <dd>
              <em className="font-semibold">Tracklist:</em>
              <ul>
                {tracklist.map((track) => (
                  <li key={track.title}>
                    {track.position} - {track.title}
                  </li>
                ))}
              </ul>
            </dd>
          </dl>
          <Link className={detailLink} href={`/artists/${id}/releases/p/1`}>
            See all releases
          </Link>
          <Link className={detailLink} href={`/artists/${id}/releases/p/1`}>
            See all releases
          </Link>
        </div>
      </main>
    </div>
  );
}
