import React from "react";

export default function BlogdetailsContent({className}) {
  return (
    <div className="flex flex-col justify-between h-full">
      <section className="">
        <h2 className="   md:mb-10  text-3xl font-bold  text-text-darker ">
          Browse Restaurants And Menus
        </h2>
        <p className="text-text-darker leading-10 text-lg pt-5 md:pt-0">
          Once you're logged in, you can browse through the list of available
          restaurants on the Eatly website. You can filter by cuisine, price,
          and distance to find the perfect restaurant for your needs. Click on a
          restaurant to view its menu. Once you're logged in, you can browse
          through the list of available restaurants on the Eatly website. You
          can filter by cuisine, price, and distance.
        </p>
        <ul className="list-disc list-inside text-text-darker space-y-2 pt-20  text-lg">
          <li>It was popularized in the 1960s with the release</li>
          <li>Lorem Ipsum passages, and more recently</li>
        </ul>
      </section>
      <img className="pt-15 pb-15 md:hidden" src="https://images.unsplash.com/photo-1742615869881-95b71cee478c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />

      <section>
        <h2 className="text-3xl font-bold  md:mb-10  text-text-darker">
          Select Your Items
        </h2>
        <p className="text-text-darker leading-10  text-lg pt-5 md:pt-0">
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock, a Latin professor at
          Hampden-Sydney College in Virginia, looked up one of the more obscure
          Latin words, consectetur, from a Lorem Ipsum passage, and going
          through the cites of the word in classical literature, discovered the
          undoubtable source.
        </p>
      </section>

      <section>
        <h2 className="  md:mb-10 text-3xl font-bold     text-text-darker">
          Place Your Order
        </h2>
        <p className="text-text-darker leading-10 text-lg pt-5 md:pt-0">
          Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus
          Bonorum et Malorum" The Extremes of Good and Evil by Cicero, written
          in 45 BC. This book is a treatise on the theory of ethics, very
          popular during the Renaissance.
        </p>
      </section>
    </div>
  );
}
