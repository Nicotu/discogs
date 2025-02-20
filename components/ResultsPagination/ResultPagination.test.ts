/**
 * @jest-environment node
 */

import { getQuickLinkPages } from ".";

describe("getQuickLinkPages", () => {
  test("returns all pages when totalPages is less than or equal to gap", () => {
    // When totalPages is 4 and gap is 5, all pages [1, 2, 3, 4] should be returned.
    expect(getQuickLinkPages(5, 0, 4)).toEqual([1, 2, 3, 4]);
  });

  test("returns correct sliding window when current page is at the beginning", () => {
    // With totalPages = 10 and current page = 1 (pageNumber 0),
    // the sliding window should start at 1.
    expect(getQuickLinkPages(5, 0, 10)).toEqual([1, 2, 3, 4, 5]);
  });

  test("returns correct sliding window when current page is in the middle", () => {
    // For totalPages = 10, gap = 5, and current page = 4 (pageNumber 3),
    // the window should center around 4 when possible.
    expect(getQuickLinkPages(5, 3, 10)).toEqual([2, 3, 4, 5, 6]);
  });

  test("returns correct sliding window when current page is at the end", () => {
    // With totalPages = 10, gap = 5, and current page = 10 (pageNumber 9),
    // the sliding window should shift to end at 10.
    expect(getQuickLinkPages(5, 9, 10)).toEqual([6, 7, 8, 9, 10]);
  });

  test("handles gap of 1 correctly", () => {
    // When the gap is 1, regardless of totalPages,
    // the current page (converted to 1-indexed) should be the only element.
    expect(getQuickLinkPages(1, 5, 10)).toEqual([6]);
  });

  test("handles even gap values correctly", () => {
    // For an even gap, e.g. gap = 4, totalPages = 10, and current page = 6 (pageNumber 5),
    // the sliding window should adjust accordingly.
    // Here, floor(gap/2) = 2, so currentPage (6) - 2 = 4, resulting in [4, 5, 6, 7].
    expect(getQuickLinkPages(4, 5, 10)).toEqual([4, 5, 6, 7]);
  });
});
