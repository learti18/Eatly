import React, { useEffect, useState, useMemo } from "react";
import FoodCard from "../../components/Cards/FoodCard";
import RestaurantHero from "../../components/Cards/RestaurantHero";
import Accordion from "../../components/Accordion";
import { useParams } from "react-router-dom";
import { useRestaurantById } from "../../Queries/Restaurants/useRestaurantById";
import { useAllFoodsById } from "../../Queries/Foods/useAllFoodsById";
import FloatingChat from "../../components/Chat/FloatingChat";
import FavoriteFilterButton from "../../Components/Buttons/FavoriteFilterButton";
import { useAuth } from "../../Hooks/useAuth";

export default function Menudetails() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  
  const {
    data: restaurant,
    isLoading: restaurantLoading,
    isError: isRestaurantError,
  } = useRestaurantById(id);
  
  const { data: foods, isLoading, isError } = useAllFoodsById(id);

  // Filter foods based on favorites toggle
  const displayedFoods = useMemo(() => {
    if (!foods) return [];
    
    if (showFavoritesOnly) {
      return foods.filter(food => food.isFavorite);
    }
    
    return foods;
  }, [foods, showFavoritesOnly]);

  const favoritesCount = foods ? foods.filter(food => food.isFavorite).length : 0;

  return (
    <div className=" bg-background-main ">
      <div className="max-w-7xl mx-auto px-5 py-20">
        <div className="pb-10  ">
          {restaurantLoading ? (
            <span className="loading loading-spinner loading-xl"></span>
          ) : isRestaurantError ? (
            <p>{isError.message}</p>
          ) : (
            <RestaurantHero restaurant={restaurant} />
          )}
        </div>
        <div className="">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl pt-20 font-semibold ">
              Popular <span role="img">🔥</span>
            </h2>
            
            {isAuthenticated && (
              <div className="pt-20">
                <FavoriteFilterButton
                  showFavoritesOnly={showFavoritesOnly}
                  onToggle={() => setShowFavoritesOnly(!showFavoritesOnly)}
                  favoritesCount={favoritesCount}
                />
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-y-15 gap-5 pb-20">
            {isLoading ? (
              <span className="loading loading-spinner loading-xl"></span>
            ) : isError ? (
              <p>{isError.message}</p>
            ) : displayedFoods.length === 0 && showFavoritesOnly ? (
              <div className="col-span-full text-center py-20">
                <div className="flex flex-col items-center gap-4">
                  <svg
                    width="60"
                    height="54"
                    viewBox="0 0 23 19"
                    fill="#D1D5DB"
                    xmlns="http://www.w3.org/2000/svg"
                    className="opacity-50"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.363281 6.66277C0.363281 3.27527 3.33513 0.666992 6.82344 0.666992C8.62159 0.666992 10.2039 1.51012 11.3393 2.60107C12.4747 1.51012 14.057 0.666992 15.8551 0.666992C19.3434 0.666992 22.3153 3.27527 22.3153 6.66277C22.3153 8.98325 21.3257 11.0239 19.9547 12.7488C18.5861 14.4707 16.7959 15.9322 15.0818 17.1197C14.427 17.5732 13.7647 17.9917 13.1585 18.3004C12.5893 18.5903 11.9348 18.8558 11.3393 18.8558C10.7438 18.8558 10.0893 18.5903 9.52007 18.3004C8.91388 17.9917 8.25153 17.5732 7.59682 17.1197C5.88271 15.9322 4.09245 14.4707 2.72384 12.7488C1.35285 11.0239 0.363281 8.98325 0.363281 6.66277ZM6.82344 2.54859C4.21523 2.54859 2.24488 4.4667 2.24488 6.66277C2.24488 8.42332 2.99224 10.0625 4.19684 11.578C5.40382 13.0966 7.02782 14.4365 8.66835 15.573C9.28912 16.003 9.87382 16.369 10.374 16.6237C10.9111 16.8972 11.2222 16.9742 11.3393 16.9742C11.4564 16.9742 11.7675 16.8972 12.3046 16.6237C12.8048 16.369 13.3895 16.003 14.0102 15.573C15.6508 14.4365 17.2748 13.0966 18.4817 11.578C19.6863 10.0625 20.4337 8.42332 20.4337 6.66277C20.4337 4.4667 18.4633 2.54859 15.8551 2.54859C14.3572 2.54859 12.9585 3.44351 12.0851 4.57937C11.907 4.81098 11.6314 4.94671 11.3393 4.94671C11.0471 4.94671 10.7715 4.81098 10.5935 4.57937C9.72011 3.44351 8.32139 2.54859 6.82344 2.54859Z"
                    />
                  </svg>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No Favorites Yet</h3>
                    <p className="text-gray-500">Start adding foods to your favorites by clicking the heart icon!</p>
                  </div>
                </div>
              </div>
            ) : (
              displayedFoods.map((food) => <FoodCard key={food.id} food={food} />)
            )}
          </div>
        </div>


        <div className="pb-20 ">
          <Accordion />
        </div>
        
        {restaurant && (
          <FloatingChat
            restaurantId={restaurant.id}
            restaurantName={restaurant.name}
          />
        )}
      </div>
    </div>
  );
}
