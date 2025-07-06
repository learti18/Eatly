import { useState, useEffect } from "react";
import { testimonials } from "../../testimonials";
import TestimonialCard from "../Cards/TestimonialCard";
import TestimonialSecondaryCard from "../Cards/TestimonialSecondaryCard";
import ProgressBar from "../ProgressBars/ProgressBar";

export default function TestimonialSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const progressPercentage = ((currentSlide + 1) / testimonials.length) * 100;

  return (
    <div className="bg-background-main">
      <div className="max-w-7xl mx-auto pt-16 min-md:pb-20 pl-6">
        <h2 className="text-5xl font-bold text-center text-purple mb-20 -ml-6">
          Customer <span className="text-gray-900">Say</span>
        </h2>

        <ProgressBar
          percentage={progressPercentage}
          className="md:hidden mb-8 max-w-xl mx-auto pr-6"
        />

        <div className="relative">
          <div className="flex flex-col md:flex-row max-md:gap-7 max-w-full">
            <div className="max-sm:pr-6 w-full md:w-[40%]">
              <TestimonialCard testimonial={testimonials[currentSlide]} />
            </div>

            <div className="flex flex-col w-full md:w-[60%] overflow-hidden pb-16 pr-10 pl-6 -mr-10 pb-14">
              <div className="flex gap-6 pb-4 md:pb-0">
                <div className="flex gap-6 py-2">
                  {testimonials.map((testimonial, index) => {
                    if (index === currentSlide) return null;
                    const nextIndex1 = (currentSlide + 1) % testimonials.length;
                    const nextIndex2 = (currentSlide + 2) % testimonials.length;
                    if (index !== nextIndex1 && index !== nextIndex2)
                      return null;

                    return (
                      <TestimonialSecondaryCard
                        key={testimonial.id}
                        testimonial={testimonial}
                        onClick={() => setCurrentSlide(index)}
                      />
                    );
                  })}
                </div>
              </div>

              <ProgressBar
                percentage={progressPercentage}
                className="hidden md:block mt-16 max-w-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
