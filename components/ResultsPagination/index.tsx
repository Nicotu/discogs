import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { FC } from "react";

type ResultsPaginationProps = {
  page: string;
  id: string;
  baseUrl: string;
  gap?: number;
  totalPages: number;
};

export const getQuickLinkPages = (
  gap: number,
  pageNumber: number,
  totalPages: number
) => {
  if (totalPages <= gap) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const currentPage = pageNumber + 1;

  const windowStart = Math.max(
    1,
    Math.min(currentPage - Math.floor(gap / 2), totalPages - gap + 1)
  );

  return Array.from({ length: gap }, (_, index) => windowStart + index);
};

export const ResultsPagination: FC<ResultsPaginationProps> = (props) => {
  const { page, baseUrl, gap = 5, totalPages } = props;
  const pageNumber = Number(page);
  const previusPage = pageNumber - 1;
  const nextPage = pageNumber + 1;
  const quickLinkPages = getQuickLinkPages(gap, pageNumber, totalPages);

  return (
    <Pagination className="mb-8">
      <PaginationContent>
        {previusPage > 0 && (
          <PaginationItem>
            <PaginationPrevious href={`${baseUrl}/${previusPage}`} />
          </PaginationItem>
        )}

        {pageNumber > 2 && (
          <>
            <PaginationItem>
              <PaginationLink href={`${baseUrl}/1`} key={`page-item-1`}>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          {quickLinkPages.map((item) => (
            <PaginationLink
              href={`${baseUrl}/${item}`}
              key={`page-item-${item}`}
              isActive={item === pageNumber}
            >
              {item}
            </PaginationLink>
          ))}
        </PaginationItem>
        {pageNumber < totalPages && (
          <PaginationItem>
            <PaginationNext href={`${baseUrl}/${nextPage}`} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
