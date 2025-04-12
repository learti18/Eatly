import React from 'react'

export default function Accordion() {
  return (
   
 
    
    
  
    
    <div className=" bg-transparent  w-full pt-25">
        <div className=" py-16 px-6 md:px-20 max-w-7xl mx-auto flex flex-col items-center relative" >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-text-dark"  >
            Frequently Asked <br /><span className="text-purple">Questions</span>
            </h2>
            <img className='absolute left-1/2 ml-40 top-9 ' src='icon.svg' />
      </div>

      <div className="collapse collapse-plus  custom-collapse border-b border-b-gray-300 rounded-none">
          <input type="radio" name="faq-accordion" className='text-pr' />
          <div className="collapse-title  font-bold text-text-dark text-base">
            How Does It Work ?
          </div>
          <div className="collapse-content text-gray-600 text-sm">
            You place an order through our app or website, and we deliver it to your door.
          </div>
        </div>

        <div className="collapse collapse-plus  custom-collapse border-b border-b-gray-300  rounded-none">
          <input type="radio" name="faq-accordion" className='text-pr' />
          <div className="collapse-title  font-bold text-text-dark text-base">
            How Does It Work ?
          </div>
          <div className="collapse-content text-gray-600 text-sm">
            You place an order through our app or website, and we deliver it to your door.
          </div>
        </div>

        <div className="collapse collapse-plus  custom-collapse border-b border-b-gray-300  rounded-none">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title  font-bold  text-text-dark text-base">
            How does your food delivery service work?
          </div>
          <div className="collapse-content text-gray-600 text-sm">
            Our service connects local restaurants with delivery drivers to bring food to you quickly and safely.
          </div>
        </div>

        <div className="collapse collapse-plus  custom-collapse border-b border-b-gray-300  rounded-none">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title  font-bold text-gray-800 text-base">
            What payment options do you accept?
          </div>
          <div className="collapse-content text-gray-600 text-sm">
            We accept all major credit cards, debit cards, and digital wallets.
          </div>
        </div>

        <div className="collapse collapse-plus  custom-collapse border-b border-b-gray-300  rounded-none">
          <input type="radio" name="faq-accordion" />
          <div className="collapse-title  font-bold text-gray-800 text-base">
            Do you offer discounts or promotions?
          </div>
          <div className="collapse-content text-gray-600 text-sm">
            Yes! Check our homepage or sign up for our newsletter for the latest offers.
          </div>
        </div>
        </div>
        
    
  )
}
