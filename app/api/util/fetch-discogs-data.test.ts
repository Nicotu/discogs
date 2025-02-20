/**
 * @jest-environment node
 */

import { fetchDiscogsData } from "./fetch-discogs-data";

beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

describe("fetchDiscogsData", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return discogs data on a successful fetch", async () => {
    const mockData = { results: [{ id: 1, title: "Test Artist" }] };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      } as Response)
    );

    const url = "https://api.discogs.com/database/search?q=Beatles";

    const response = await fetchDiscogsData(url);
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data).toEqual(mockData);
  });

  it("should return a 404 error when the API returns 404", async () => {
    // Simulate a 404 response from the Discogs API.
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        json: () => Promise.resolve({}),
      } as Response)
    );

    const url = "https://api.discogs.com/database/search?q=nonexistent";

    const response = await fetchDiscogsData(url);
    expect(response.status).toBe(404);

    const json = await response.json();
    expect(json.error).toBe("Discogs data not found");
  });

  it("should return an error for other non-OK statuses", async () => {
    // Simulate a non-OK response (e.g., 400) from the API.
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 400,
        json: () => Promise.resolve({}),
      } as Response)
    );

    const url = "https://api.discogs.com/database/search?q=badquery";

    const response = await fetchDiscogsData(url);
    expect(response.status).toBe(400);

    const json = await response.json();
    expect(json.error).toBe("Error fetching data from Discogs");
  });

  it("should return a 500 error when fetch throws an exception", async () => {
    // Simulate a network error or other exception thrown by fetch.
    global.fetch = jest.fn(() => Promise.reject(new Error("Network error")));

    const url = "https://api.discogs.com/database/search?q=Beatles";

    const response = await fetchDiscogsData(url);
    expect(response.status).toBe(500);

    const json = await response.json();
    expect(json.error).toBe("Error fetching data from Discogs");
  });
});
