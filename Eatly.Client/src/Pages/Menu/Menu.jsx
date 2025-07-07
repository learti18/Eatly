import React, { useState, useCallback, useEffect } from "react";
import PromoBanner from "../../components/PromoBanner";
import Category from "../../components/Category";
import Accordion from "../../components/Accordion";
import RestaurantCard from "../../components/Cards/RestaurantCard";
import { useAllRestaurants } from "../../Queries/Restaurants/useAllRestaurants";
import { useRestaurantCategories } from "../../Queries/Restaurants/useRestaurantCategories";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../../Hooks/useDebounce";

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") || ""
  );

  const debouncedSearchTerm = useDebounce(searchInput, 500);

  const { data: categoryOptions } = useRestaurantCategories();

  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "",
    searchTerm: searchParams.get("search") || "",
    sortBy: searchParams.get("sortBy") || "name",
    sortOrder: searchParams.get("sortOrder") || "asc",
    pageNumber: parseInt(searchParams.get("page")) || 1,
    pageSize: 20,
  });

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      searchTerm: debouncedSearchTerm,
      pageNumber: 1,
    }));
  }, [debouncedSearchTerm]);

  const {
    data: restaurantsData,
    isLoading,
    isError,
  } = useAllRestaurants(filters);

  const restaurants = Array.isArray(restaurantsData)
    ? restaurantsData
    : restaurantsData?.items || restaurantsData?.data || [];

  const getCategoryName = (categoryId) => {
    if (!categoryId || !categoryOptions) return "";
    const category = categoryOptions.find(
      (cat) => cat.value.toString() === categoryId.toString()
    );
    return category ? category.label : categoryId;
  };

  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.category) params.set("category", filters.category);
    if (filters.searchTerm) params.set("search", filters.searchTerm);
    if (filters.sortBy && filters.sortBy !== "name")
      params.set("sortBy", filters.sortBy);
    if (filters.sortOrder && filters.sortOrder !== "asc")
      params.set("sortOrder", filters.sortOrder);
    if (filters.pageNumber && filters.pageNumber !== 1)
      params.set("page", filters.pageNumber.toString());

    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      pageNumber: 1,
    }));
  }, []);

  const handleSearchChange = useCallback((searchTerm) => {
    setSearchInput(searchTerm);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchInput("");
  }, []);

  return (
    <div className="bg-background-main">
      <div className="max-w-7xl mx-auto py-16 px-6">
        <div className="flex flex-col lg:flex-row gap-10 md:gap-16 bg-background-main">
          <PromoBanner
            searchValue={searchInput}
            onSearchChange={handleSearchChange}
            searchPlaceholder="Search restaurants by name, address, or description..."
          />
          <Category
            onFiltersChange={handleFiltersChange}
            initialFilters={filters}
          />
        </div>

        <div className="pt-20 flex flex-col">
          <h1 className="text-5xl text-gray-900 font-bold text-center">
            Our Top <span className="text-purple">Restaurants</span>
          </h1>

          <div className="grid grid-cols-1 max-md:max-w-2xl max-md:self-center md:grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-12 mt-16">
            {isLoading ? (
              <div className="col-span-full flex justify-center">
                <span className="loading loading-spinner loading-xl"></span>
              </div>
            ) : isError ? (
              <p>{isError?.message}</p>
            ) : restaurants && restaurants.length > 0 ? (
              restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <div className="flex flex-col items-center gap-4">
                  <div className="text-6xl">🔍</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                      No Restaurants Found
                    </h3>
                    <p className="text-gray-500">
                      Try adjusting your filters or search terms.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="pt-32 border-b-2 border-b-gray-200 "></div>
        <div className="mb-32">
          <Accordion />
        </div>
      </div>
    </div>
  );
}
