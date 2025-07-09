import StarRating from "../Rating/StarRating";

export default function TestimonialSecondaryCard({ testimonial, onClick }) {
  return (
    <div
      className="bg-white rounded-xl shadow-xl p-5 flex flex-col flex-1 cursor-pointer hover:drop-shadow-xl transition-shadow min-w-[330px]"
      onClick={onClick}
    >
      <div className="relative mb-4">
        <div className="text-gray-300 text-3xl absolute -top-2 left-0">"</div>
        <p className="text-gray-400 italic pl-6 pr-2 text-sm overflow-hidden line-clamp-4">
          {testimonial.quote}
        </p>
      </div>

      <div className="mt-auto">
        <StarRating rating={testimonial.rating} size="w-5 h-5" />
      </div>
    </div>
  );
}
