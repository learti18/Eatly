import React, { useEffect } from "react";
import Table from "../../../components/Table/Table";
import FoodTableRow from "../../../components/Table/FoodTableRow";
import { useAllFoods } from "../../../Queries/Foods/useAllFoods";
import { useRestaurant } from "../../../Contexts/RestaurantContext";
import { Link } from "react-router-dom";

export default function FoodsListing() {
  const { data: foods, isLoading, isError } = useAllFoods();

  return (
    <div className="py-10 px-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Food Items</h1>
        <Link to="add">
          <button className="btn btn-primary">Add Food Item</button>
        </Link>
      </div>
      <Table
        columns={[
          { key: "image", label: "Image", width: "120px" },
          { key: "name", label: "Food Name" },
          { key: "category", label: "Type" },
          { key: "price", label: "Price" },
          { key: "prepTime", label: "Prep Time" },
          { key: "actions", label: "Actions", width: "120px" },
        ]}
        isLoading={isLoading}
      >
        {!isLoading && foods && foods.length > 0
          ? foods.map((food) => <FoodTableRow key={food.id} food={food} />)
          : !isLoading && (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No foods found for this restaurant
                </td>
              </tr>
            )}
      </Table>
    </div>
  );
}
