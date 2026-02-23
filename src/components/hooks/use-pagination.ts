import { useEffect, useMemo, useState } from "react";
import { AppConfig } from "@/data/configs/constants/app-config";

export function usePagination<T>(
  items: T[],
  itemsPerPage: number = AppConfig.item_per_page,
  resetTriggers: unknown[] = [],
) {
  const [currentPage, setCurrentPage] = useState(1);

  const safeItemsPerPage = Math.max(1, Math.floor(itemsPerPage));
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / safeItemsPerPage));

  useEffect(() => {
    setCurrentPage(1);
  }, [items, safeItemsPerPage, ...resetTriggers]);

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * safeItemsPerPage;
    return items.slice(start, start + safeItemsPerPage);
  }, [items, currentPage, safeItemsPerPage]);

  return {
    currentPage,
    setCurrentPage,
    currentItems,
    totalPages,
    totalItems,
  };
}
