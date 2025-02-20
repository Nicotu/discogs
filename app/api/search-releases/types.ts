export type SearchReleasesSettings = {
  per_page: string;
};

export type SearchReleasesParams = SearchReleasesSettings & {
  page: string;
  id: string;
};
