import { fetchDiscogsData } from "../util/fetch-discogs-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id") || "";

  if (!id) {
    return new Response("Missing required parameter 'id'", {
      status: 400,
    });
  }

  const url = `https://api.discogs.com/releases/${id}`;

  const response = await fetchDiscogsData(url);

  return response;
}
