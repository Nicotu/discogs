import { fetchDiscogsData } from "../util/fetch-discogs-data";
import { defaultSettings } from "./settings";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";

  const params = {
    q,
    ...defaultSettings,
  };

  const url = `https://api.discogs.com/database/search?${new URLSearchParams(
    params
  )}`;

  const response = await fetchDiscogsData(url);

  return response;
}
