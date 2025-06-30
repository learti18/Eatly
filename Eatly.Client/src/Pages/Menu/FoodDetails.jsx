import React, { useState } from "react";
import QuantityButton from "../../components/Buttons/QuantityButton";
import IconButton from "../../components/Buttons/IconButton";
import { useFoodByRestaurantId } from "../../Queries/Foods/useFoodByRestaurantId";
import { Link, useParams } from "react-router-dom";
import { useAddToCart } from "../../Queries/Cart/useAddToCart";
import { useAllFoodsById } from "../../Queries/Foods/useAllFoodsById";
import {
  getIngredientEmoji,
  getIngredientBgColor,
} from "../../utils/ingredients/ingredientUtils";
import Badge from "../../components/Badges/Badge";

export default function FoodDetails() {
  const { id, foodId } = useParams();
  const { data: food, isLoading, isError } = useFoodByRestaurantId(foodId, id);
  const { mutate: addToCart, isPending } = useAddToCart();
  const [quantity, setQuantity] = useState(1);
  const {
    data: foods,
    isLoading: foodsLoading,
    isError: foodsError,
  } = useAllFoodsById(id);

  const increment = () => {
    setQuantity((curr) => curr + 1);
  };
  const decrement = () => {
    setQuantity((curr) => (curr > 1 ? curr - 1 : 1));
  };
  const handleAddToCart = () => {
    addToCart({ foodId, quantity });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        {isError?.message}
      </div>
    );
  }

  const [dollars, cents] = food.price.toFixed(2).split(".");

  return (
    <div className="bg-background-main">
      <div className="max-w-7xl mx-auto px-5 py-16">
        <div className="flex flex-col lg:flex-row justify-between gap-10">
          <div className="flex-1">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-bold text-text-dark capitalize">
                {food.name}
              </h1>
              <p className="text-gray-500 font-medium text-xl mt-1">
                Best Chicken Ever
              </p>

              <div className="flex space-x-2 font-medium text-gray-500 mt-3 justify-center lg:justify-start">
                <span>{food.averagePreparationTime}min</span>
                <span>•</span>
                <span className="text-purple">★ 4.5</span>
                <span>•</span>
                <span>🔥 456 Kcal</span>
              </div>

              <div className="mt-2">
                <Badge type={food.type} />
              </div>
            </div>

            <div className="my-10 flex justify-center lg:justify-center">
              <img
                src={food.imageUrl}
                alt={food.name}
                className="r w-[320px] md:w-[400px] object-cover"
              />
            </div>

            <div className="mt-10">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-8">
                <div className="flex-1">
                  <h3 className="text-xl font-medium text-text-dark mb-3">
                    Ingredients:
                  </h3>
                  <div className="flex items-center gap-4 flex-wrap">
                    {food.ingridients && food.ingridients.length > 0 ? (
                      food.ingridients.map((ingredient, index) => (
                        <IconButton
                          key={ingredient.id || index}
                          bgColor={ingredient.backgroundColor}
                          title={ingredient.name}
                          icon={
                            ingredient.imageUrl ? (
                              <img
                                src={ingredient.imageUrl}
                                alt={ingredient.name || ingredient}
                                className="size-6 md:size-8 object-cover rounded-full m-auto"
                              />
                            ) : (
                              <span className="text-3xl">
                                {getIngredientEmoji(
                                  ingredient.name || ingredient
                                )}
                              </span>
                            )
                          }
                        />
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">
                        No ingredients listed
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-center lg:justify-end lg:items-center">
                  <div className="flex items-center gap-4 lg:flex-shrink-0">
                    <QuantityButton text="-" onClick={decrement} />
                    <QuantityButton text={quantity} />
                    <QuantityButton text="+" onClick={increment} />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 lg:pt-6 flex flex-row lg:flex-row items-center justify-between gap-10 mt-4 lg:mt-6">
              <button
                onClick={handleAddToCart}
                className="bg-primary hover:bg-purple cursor-pointer transition-all duration-200 rounded-xl text-white px-14 py-3.5 md:px-20  shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                {isPending ? (
                  <span className="loading loading-spinner loading-sm px-5 py-1"></span>
                ) : (
                  "Add to Cart"
                )}
              </button>
              <div className="text-4xl font-semibold text-text-dark">
                ${dollars}
                <span className="text-sm text-gray-400">.{cents}</span>
              </div>
            </div>
          </div>

          <div className=" hidden lg:block  w-full lg:w-1/3">
            <div className="  rounded-lg">
              <h2 className="text-2xl  font-bold text-text-dark mb-4">
                Recommended
              </h2>
              <div className="flex flex-col gap-5">
                {foodsLoading ? (
                  <span className="loading loading-spinner loading-xl mx-auto"></span>
                ) : foodsError ? (
                  <p className="text-red-500 text-sm">{foodsError.message}</p>
                ) : (
                  foods.map((food) => (
                    <Link
                      to={`/menu/${id}/food/${food.id}`}
                      key={food.id}
                      className="flex justify-between items-center bg-white rounded-xl shadow-sm hover:shadow-md transition duration-200 p-4 border border-gray-200"
                    >
                      <div className="flex gap-4 items-center">
                        <img
                          src={food.imageUrl}
                          alt={food.name}
                          className="w-14 h-14 rounded-full object-cover border border-gray-100"
                        />
                        <div className="flex flex-col">
                          <h3 className="text-base font-semibold text-text-dark truncate">
                            {food.name}
                          </h3>
                          <p className="text-sm text-gray-500">{food.type}</p>
                        </div>
                      </div>
                      <div className="text-sm font-semibold text-gray-700">
                        ${food.price}
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
