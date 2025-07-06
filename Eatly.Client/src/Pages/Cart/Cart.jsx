import React, { useState, useEffect } from "react";
import TotalOrder from "../../components/TotalOrder";
import { useFetchCart } from "../../Queries/Cart/useFetchCart";
import { useClearCart } from "../../Queries/Cart/useClearCart";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Package } from "lucide-react";
import CartCard from "../../components/Cards/CartCard";

export default function Cart() {
  const navigate = useNavigate();
  const { data: cart, isLoading, isError } = useFetchCart();
  const { mutate: clearCart, isPending } = useClearCart();
  const [showClearConfirmation, setShowClearConfirmation] = useState(false);
  const [localTotalPrice, setLocalTotalPrice] = useState(0);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);

  const proccedToCheckout = () => {
    if (!cart || cart.cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    navigate("/checkout");
  };

  useEffect(() => {
    if (cart && cart.totalPrice) {
      setLocalTotalPrice(cart.totalPrice);
    }
  }, [cart]);

  const handleItemPriceChange = (itemId, priceDifference) => {
    setLocalTotalPrice((prev) =>
      (Number(prev) + Number(priceDifference)).toFixed(2)
    );
  };

  const handleClearCartClick = () => {
    setShowClearConfirmation(true);
  };

  const confirmClearCart = () => {
    clearCart();
    setLocalTotalPrice(0);
    setShowClearConfirmation(false);
    toast.success("Cart cleared successfully");
  };

  const cancelClearCart = () => {
    setShowClearConfirmation(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-background-main">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen bg-background-main">
        {isError.message}
      </div>
    );
  }

  return (
    <div className="bg-background-main">
      <div className="max-w-4xl mx-auto py-16 px-6">
        {showClearConfirmation && (
          <div className="fixed inset-0 bg-white/30 backdrop-blur-md z-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-11/12 border border-gray-100 animate-fade-in">
              <h3 className="text-2xl font-semibold mb-4 text-[#323142]">
                Clear Cart
              </h3>
              <div className="mb-6 p-3 bg-gray-50 rounded-xl">
                <p className="font-medium text-lg">Remove All Items</p>
                <p className="text-gray-500">
                  {cart?.cartItems?.length}{" "}
                  {cart?.cartItems?.length === 1 ? "item" : "items"} in your
                  cart
                </p>
              </div>
              <p className="mb-6 text-gray-600">
                Are you sure you want to remove all items from your cart?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={cancelClearCart}
                  className="px-6 py-2.5 border cursor-pointer border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmClearCart}
                  className="px-6 py-2.5 bg-[#323142] cursor-pointer text-white rounded-xl hover:bg-[#4a4963] transition-colors font-medium"
                  disabled={isPending}
                >
                  {isPending ? "Clearing..." : "Clear Cart"}
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col">
          {!cart || cart.cartItems.length === 0 ? (
            <div className="flex justify-center items-center gap-4">
              <Link
                to="/orders"
                className="border border-purple text-sm md:text-base px-4 py-2 rounded-xl text-purple hover:bg-purple hover:text-white transition-colors duration-200 text-center font-medium"
              >
                <Package className="inline mr-2" size={18} />
                Go to Orders
              </Link>
              <div className="text-center text-xl md:text-2xl leading-tight font-medium text-gray-500">
                Your cart is empty
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-8">
                <Link
                  to="/orders"
                  className="border border-purple px-4 py-2 rounded-xl text-purple hover:bg-purple hover:text-white transition-colors duration-200 text-center font-medium"
                >
                  <Package className="inline mr-2" />
                  Go to Orders
                </Link>
                <button
                  onClick={handleClearCartClick}
                  className="border border-[#323142] text-[#323142] hover:bg-[#f0f0f0] cursor-pointer transition-colors duration-200 px-4 py-2 rounded-xl font-medium flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                    <path
                      fillRule="evenodd"
                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                    />
                  </svg>
                  Clear Cart
                </button>
              </div>
              <div className="space-y-5">
                {cart.cartItems.map((item) => (
                  <CartCard
                    key={item.id}
                    {...item}
                    onPriceChange={handleItemPriceChange}
                  />
                ))}
              </div>
            </>
          )}

          <TotalOrder price={localTotalPrice} />
          <button
            disabled={cart?.cartItems?.length === 0}
            onClick={proccedToCheckout}
            className={`${
              cart.cartItems.length === 0
                ? "cursor-not-allowed opacity-80"
                : "cursor-pointer hover:bg-purple-dark"
            } bg-purple mt-5 transition-colors duration-200 text-white md:w-full text-lg md:text-xl rounded-2xl py-4 font-medium flex items-center justify-center`}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
