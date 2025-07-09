import StarRating from "../Rating/StarRating";

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mx-auto md:mx-0 max-w-xl flex flex-col">
      <div className="flex items-center mb-7">
        <img
          src={testimonial.profileImg}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full mr-4 object-cover"
        />
        <div>
          <h3 className="font-medium text-gray-900">{testimonial.name}</h3>
          <p className="text-sm text-gray-500">{testimonial.role}</p>
        </div>
      </div>

      <div className="relative mb-5">
        <div className="text-gray-400 text-4xl absolute -top-2 left-0">"</div>
        <p className="text-gray-700 italic pl-6 pr-2 text-lg">
          {testimonial.quote}
        </p>
      </div>

      <div className="mt-auto">
        <StarRating rating={testimonial.rating} />
      </div>
    </div>
  );
}
