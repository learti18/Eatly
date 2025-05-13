import React from 'react'
import PromoBanner from '../../Components/PromoBanner'
import Category from '../../Components/Category'
import Accordion from '../../components/Accordion'
import TopRestaurantsSection from '../../components/Home/TopRestaurantsSection'
import RestaurantCard from '../../components/Cards/RestaurantCard'
import { restaurants } from '../../restaurants'
import { ArrowRight } from 'lucide-react'

export default function Menu() {
  return (
    <div className='bg-background-main'>
      <div className='max-w-7xl mx-auto py-16 px-6'>
        <div className='flex flex-col lg:flex-row gap-20 bg-background-main'>
          <PromoBanner />
          <Category />
        </div>
        <div className="pt-32 flex flex-col">
        <h1 className="text-5xl text-gray-900 font-bold text-center">
          Our Top <span className="text-purple">Restaurants</span>
        </h1>
        <div className="grid grid-cols-1 max-md:max-w-2xl max-md:self-center md:grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-12 mt-20">
          {restaurants.map((restaurant) => (
            <RestaurantCard restaurant={restaurant} />
          ))}
        </div>
      </div>
      <div className="pt-32 border-b-2 border-b-gray-200 "></div>
        <div className='mb-32'>
          <Accordion />
        </div>
      </div>
    </div>
  )
}
