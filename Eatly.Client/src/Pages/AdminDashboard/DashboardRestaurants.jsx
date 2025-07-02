import React, { useState, useEffect } from "react";
import Table from "../../components/Table/Table";
import RestaurantTableRow from "../../components/Table/RestaurantTableRow";
import { useAllRestaurants } from "../../Queries/Restaurants/useAllRestaurants";

export default function DashboardRestaurants() {
  const { data: restaurants, isLoading, isError } = useAllRestaurants();

  return (
    <div className="bg-white min-h-screen h-full py-10">
      <h1 className="text-2xl font-bold">Restaurants</h1>
      <p className="text-gray-600 mt-2">
        Manage your restaurant listings and details here.
      </p>

      <div className="mt-6">
        <Table
          columns={[
            { key: "image", label: "Image", width: "120px" },
            { key: "name", label: "Restaurant Name" },
            { key: "address", label: "Address" },
            { key: "category", label: "Category" },
            { key: "verified", label: "Status", width: "100px" },
            { key: "actions", label: "Actions", width: "120px" },
          ]}
          emptyMessage="No restaurants found"
          isLoading={isLoading}
        >
          {!isLoading &&
            restaurants &&
            restaurants.items.map((restaurant) => (
              <RestaurantTableRow key={restaurant.id} restaurant={restaurant} />
            ))}
        </Table>
      </div>
    </div>
  );
}
