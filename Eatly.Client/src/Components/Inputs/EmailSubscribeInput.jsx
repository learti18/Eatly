import { useState } from "react";

export const EmailSubscribeInput = ({
  onSubscribe = () => {},
  buttonText = "SUBSCRIBE",
  placeholder = "Enter Your Email Address",
  backgroundColor = "bg-purple",
  buttonTextColor = "text-purple-light",
  inputBackgroundColor = "bg-purple-light",
}) => {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (email.trim()) {
      onSubscribe(email);
      setEmail("");
    }
  };

  return (
    <div className={`${backgroundColor}`}>
      <div
        className={`relative flex min-w-[430px] max-w-md rounded-2xl overflow-hidden`}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className={`w-full py-4.5 px-5 ${inputBackgroundColor} outline-none text-gray-600 rounded-2xl`}
        />
        <button
          onClick={handleSubmit}
          className={`absolute right-1.5 top-1.5 bottom-1.5 px-6 ${backgroundColor} ${buttonTextColor} font-medium rounded-xl transition-all hover:bg-[#4b3c6] hover:text-white cursor-pointer`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};
