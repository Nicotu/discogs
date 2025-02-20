import { fetchDiscogsData } from "../util/fetch-discogs-data";
import { defaultSettings } from "./settings";
import { SearchReleasesParams } from "./types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");
  const page = searchParams.get("page");

  const params = {
    ...defaultSettings,
    page,
  } as SearchReleasesParams;

  const url = `https://api.discogs.com/artists/${id}/releases?${new URLSearchParams(
    params
  )}`;

  const response = await fetchDiscogsData(url);

  return response;
}
