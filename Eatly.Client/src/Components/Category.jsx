import React from "react";
import CategoryButtons from "./CategoryButtons";

export default function Category(){
    return(
        <div className="flex flex-col rounded-xl border-white p-5 shadow-2xl bg-white max-md:max-w-[350px] lg:w-1/3 ">
            <h1 className="font-semibold text-xl">Category</h1>
            <div className="flex gap-2 md:gap-5 my-5">
                <CategoryButtons icon={"pizza.svg"} title={"Pizza"} bgColor="#FFDE8A" textColor="#D69900" />
                <CategoryButtons icon={"burger.svg"} title={"Burger"} bgColor="#F7C5BA" textColor="#FB471D" />
                <CategoryButtons icon={"sweet.svg"} title={"Sweet"} bgColor="#EDB66B" textColor="#E28B14" />
                <CategoryButtons icon={"sushi.svg"} title={"Asian"} bgColor="#5A85FF" textColor="#002073" />
            </div>
            <h1 className="font-semibold text-xl">Sort by</h1>
            <div className="flex justify-between">
                <div className="flex flex-col items-start mt-5 mb-20">
                    <button className="text-[#ACADB9] font-medium mb-5">Recomended</button>
                    <button className="text-[#ACADB9] font-medium">Most Popular</button>
                </div>
                <button className="text-[#6C5FBC] mb-auto mt-5 font-medium">Fast Delivery</button>
            </div>
            <button className="bg-purple text-white rounded-lg py-3">Apply</button>
        </div>
    )
}