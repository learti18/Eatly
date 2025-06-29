import React, { useState, useEffect } from "react";
import CategoryButtons from "./CategoryButtons";
import { useRestaurantCategories } from "../Queries/Restaurants/useRestaurantCategories";

export default function Category({ onFiltersChange, initialFilters = {} }) {
  const [selectedCategory, setSelectedCategory] = useState(initialFilters.category || "");
  const [sortBy, setSortBy] = useState(initialFilters.sortBy || "name");
  const [sortOrder, setSortOrder] = useState(initialFilters.sortOrder || "asc");

  const { data: backendCategories, isLoading: categoriesLoading } = useRestaurantCategories();

  const categoryConfig = {
    "Vegan": { 
      icon: "vegan.svg", 
      className: "bg-[#38AD68] text-[#00732F]",
      activeClassName: "border-[#00732F]"
    },
    "FastFood": { 
      icon: "burger.svg", 
      className: "bg-[#F7C5BA] text-[#FB471D]",
      activeClassName: "border-[#FB471D]"
    },
    "Dessert": { 
      icon: "sweet.svg", 
      className: "bg-[#EDB66B] text-[#E28B14]",
      activeClassName: "border-[#E28B14]"
    },
    "Asian": { 
      icon: "sushi.svg", 
      className: "bg-[#5A85FF] text-[#002073]",
      activeClassName: "border-[#002073]"
    }
  };

  const categories = backendCategories?.map(cat => ({
    value: cat.value,
    title: cat.label, 
    ...categoryConfig[cat.label] || {
      icon: "foodicons.svg", 
      className: "bg-gray-200 text-gray-600",
      activeClassName: "border-gray-600"
    }
  })) || [];

  const sortOptions = [
    { value: "name", label: "Recommended" },
    { value: "category", label: "Most Popular" }
  ];

  const handleCategoryChange = (categoryId) => {
    const newCategory = selectedCategory === categoryId ? "" : categoryId;
    setSelectedCategory(newCategory);
    updateFilters({ category: newCategory });
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    updateFilters({ sortBy: newSortBy });
  };

  const handleSortOrderToggle = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    updateFilters({ sortOrder: newSortOrder });
  };

  const updateFilters = (newFilters) => {
    const filters = {
      category: selectedCategory,
      sortBy,
      sortOrder,
      ...newFilters
    };
    onFiltersChange?.(filters);
  };

  const clearAllFilters = () => {
    setSelectedCategory("");
    setSortBy("name");
    setSortOrder("asc");
    onFiltersChange?.({
      category: "",
      sortBy: "name",
      sortOrder: "asc"
    });
  };

  const hasActiveFilters = selectedCategory !== "" || sortBy !== "name" || sortOrder !== "asc";

  if (categoriesLoading) {
    return (
      <div className="flex flex-col rounded-xl border-white p-5 shadow-2xl bg-white max-md:max-w-[350px] lg:w-1/3">
        <div className="flex justify-center items-center h-40">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col rounded-xl border-white p-5 shadow-2xl bg-white max-md:max-w-[350px] lg:w-1/3">
  
      <h1 className="font-semibold text-xl">Category</h1>
      <div className="flex gap-2 md:gap-5 my-5">
        {categories.map((category) => (
          <CategoryButtons
            key={category.value}
            icon={category.icon}
            title={category.title}
            value={category.value}
            className={category.className}
            activeClassName={category.activeClassName}
            onClick={handleCategoryChange}
            isActive={selectedCategory === category.value}
          />
        ))}
      </div>

  
      <h1 className="font-semibold text-xl">Sort by</h1>
      <div className="flex justify-between">
        <div className="flex flex-col items-start mt-5 mb-20">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSortChange(option.value)}
              className={`font-medium mb-5 transition-colors ${
                sortBy === option.value ? "text-purple" : "text-[#ACADB9]"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <button
          onClick={handleSortOrderToggle}
          className="text-[#6C5FBC] mb-auto mt-5 font-medium hover:text-purple transition-colors"
        >
          {sortOrder === "asc" ? "A-Z" : "Z-A"}
        </button>
      </div>
      
      <div className="flex gap-2">
        {hasActiveFilters ? (
          <button 
            onClick={clearAllFilters}
            className="flex-1 bg-gray-200 text-gray-700 rounded-lg py-3 hover:bg-gray-300 transition-colors"
          >
            Clear Filters
          </button>
        ) : (
          <button 
            className="flex-1 bg-purple text-white rounded-lg py-3 hover:bg-purple-dark transition-colors"
          >
            Apply Filters
          </button>
        )}
      </div>
    </div>
  );
}
