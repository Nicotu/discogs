import { NextResponse } from "next/server";

const key = process.env.DISCOGS_CONSUMER_KEY;
const secret = process.env.DISCOGS_CONSUMER_SECRET;

export async function fetchDiscogsData(url: string): Promise<Response> {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Discogs key=${key}, secret=${secret}`,
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: "Discogs data not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: "Error fetching data from Discogs" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { error: "Error fetching data from Discogs" },
      { status: 500 }
    );
  }
}
