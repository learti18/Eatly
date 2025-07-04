import React from "react";

export default function Accordion() {
  return (
    <div className="bg-transparent  w-full pt-24 border-t-2 border-t-gray-200">
      <div className="max-w-7xl mx-auto flex flex-col items-center relative">
        <h2 className="relative text-3xl md:text-4xl font-semibold text-center mb-16 text-text-dark">
          Frequently Asked <br />
          <span className="text-purple">Questions</span>
          <img className="absolute left-1/2 ml-56 -top-7" src="/icon.svg" />
        </h2>
      </div>

      <div className="collapse collapse-plus  custom-collapse border-b border-b-gray-300 rounded-none">
        <input type="radio" name="faq-accordion" className="text-pr" />
        <div className="collapse-title  font-semibold text-text-dark text-base">
          How Does It Work ?
        </div>
        <div className="collapse-content text-gray-600 text-sm">
          You place an order through our app or website, and we deliver it to
          your door.
        </div>
      </div>

      <div className="collapse collapse-plus  custom-collapse border-b border-b-gray-300  rounded-none">
        <input type="radio" name="faq-accordion" className="text-pr" />
        <div className="collapse-title  font-semibold text-text-dark text-base">
          How Does It Work ?
        </div>
        <div className="collapse-content text-gray-600 text-sm">
          You place an order through our app or website, and we deliver it to
          your door.
        </div>
      </div>

      <div className="collapse collapse-plus  custom-collapse border-b border-b-gray-300  rounded-none">
        <input type="radio" name="faq-accordion" />
        <div className="collapse-title  font-semibold  text-text-dark text-base">
          How does your food delivery service work?
        </div>
        <div className="collapse-content text-gray-600 text-sm">
          Our service connects local restaurants with delivery drivers to bring
          food to you quickly and safely.
        </div>
      </div>

      <div className="collapse collapse-plus  custom-collapse border-b border-b-gray-300  rounded-none">
        <input type="radio" name="faq-accordion" />
        <div className="collapse-title  font-semibold text-gray-800 text-base">
          What payment options do you accept?
        </div>
        <div className="collapse-content text-gray-600 text-sm">
          We accept all major credit cards, debit cards, and digital wallets.
        </div>
      </div>

      <div className="collapse collapse-plus  custom-collapse border-b border-b-gray-300  rounded-none">
        <input type="radio" name="faq-accordion" />
        <div className="collapse-title  font-semibold text-gray-800 text-base">
          Do you offer discounts or promotions?
        </div>
        <div className="collapse-content text-gray-600 text-sm">
          Yes! Check our homepage or sign up for our newsletter for the latest
          offers.
        </div>
      </div>
    </div>
  );
}
