"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition, useState, useEffect } from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { Category } from "@/types";

interface FilterBarProps {
  categories: Category[];
  currentCategory: string;
  initialSearch?: string;
}

export function FilterBar({
  categories,
  currentCategory,
  initialSearch = "",
}: FilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState(initialSearch);

  // Sync internal search state with URL if it changes outside
  useEffect(() => {
    setSearchValue(searchParams.get("search") || "");
  }, [searchParams]);

  const updateFilters = (newCategory?: string, newSearch?: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newCategory !== undefined) {
      if (newCategory.toLowerCase() === "all" || !newCategory) {
        params.delete("category");
      } else {
        params.set("category", newCategory);
      }
    }

    if (newSearch !== undefined) {
      if (newSearch.trim()) {
        params.set("search", newSearch.trim());
      } else {
        params.delete("search");
      }
    }

    startTransition(() => {
      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
    });
  };

  const handleCategoryClick = (categoryName: string) => {
    updateFilters(categoryName, undefined);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters(undefined, searchValue);
  };

  const clearSearch = () => {
    setSearchValue("");
    updateFilters(undefined, "");
  };

  // Prepend "All" category option
  const allCategories = [{ id: "all", name: "All", slug: "all" }, ...categories];

  return (
    <div id="filter-section" className="space-y-4 mb-8">
      {/* Search Input Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brandText-light" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search by client name, industry, or feature..."
              className="w-full pl-10 pr-10 py-2.5 bg-white border border-navy/15 rounded-xl text-sm font-medium text-navy placeholder:text-brandText-light focus:outline-none focus:ring-2 focus:ring-coral/40 focus:border-coral transition-all"
            />
            {searchValue && (
              <button
                type="button"
                onClick={clearSearch}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-brandText-light hover:text-navy"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </form>

        <div className="flex items-center gap-2 text-xs font-semibold text-brandText-muted self-start sm:self-center">
          <SlidersHorizontal className="w-4 h-4 text-coral" />
          <span>Filter by Industry:</span>
        </div>
      </div>

      {/* Horizontal Pill Filters (Scrollable on mobile) */}
      <div className="relative">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none scroll-smooth">
          {allCategories.map((cat) => {
            const isSelected =
              (cat.name === "All" && (!currentCategory || currentCategory.toLowerCase() === "all")) ||
              currentCategory.toLowerCase() === cat.name.toLowerCase();

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryClick(cat.name)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-heading font-bold whitespace-nowrap transition-all duration-200 border ${
                  isSelected
                    ? "bg-navy text-white border-navy shadow-sm"
                    : "bg-white text-navy/80 border-navy/10 hover:border-coral/40 hover:text-coral"
                } ${isPending ? "opacity-70 cursor-wait" : ""}`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

