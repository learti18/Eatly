import React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function BlogdetailsContent({ content, subtitle }) {
  const { id } = useParams();

  return (
    <div className="flex flex-col justify-between h-full">
      <section className="mb-10">
        <h2 className="md:mb-5 text-xl md:text-3xl font-bold text-text-darker">
          {subtitle}
        </h2>
        <div className="text-text-darker leading-8 text-sm md:text-lg pt-5 md:pt-3">
          {content}
        </div>
      </section>

      <div className="flex justify-items-start pt-10 mt-auto">
        <Link
          to={`/blogs`}
          className="flex items-center gap-2 bg-background-link text-white font-medium py-3 px-6 rounded-xl group"
        >
          <span>Back to Articles</span>
          <ArrowRight
            size={20}
            className="group-hover:translate-x-1.5 transition-transform duration-200"
          />
        </Link>
      </div>
    </div>
  );
}
