import { yupResolver } from "@hookform/resolvers/yup";
import { loadStripe } from "@stripe/stripe-js";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import EmptyCart from "../../components/Cart/EmptyCart";
import AddressForm from "../../components/Order/ClientUi/AddressForm";
import DeliveryOptions from "../../components/Order/ClientUi/DeliveryOptions";
import OrderSummary from "../../components/Order/ClientUi/OrderSummary";
import { useFetchCart } from "../../Queries/Cart/useFetchCart";
import { AddressSchema } from "../../Schemas/Address/AddressSchema";
import api from "../../Services/Api";

export default function Checkout() {
  const navigate = useNavigate();
  const { data: cart, isLoading: cartLoading } = useFetchCart();
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [deliveryType, setDeliveryType] = useState("delivery");
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(AddressSchema),
    defaultValues: {
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      phoneNumber: "",
      isDefault: false,
      latitude: null,
      longitude: null,
    },
  });

  // Fetch user addresses on component mount
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await api.get("/user/addresses");
        if (response.data && response.data.length > 0) {
          setAddresses(response.data);
          // Select default address if exists
          const defaultAddress = response.data.find((addr) => addr.isDefault);
          if (defaultAddress) {
            setSelectedAddressId(defaultAddress.id);
          } else {
            setSelectedAddressId(response.data[0].id);
          }
        } else {
          setIsAddingNewAddress(true);
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
        toast.error("Failed to load delivery addresses");
      } finally {
        setIsLoadingAddresses(false);
      }
    };

    fetchAddresses();
  }, []);

  const handleAddressSelect = (addressId) => {
    setSelectedAddressId(addressId);
    setIsAddingNewAddress(false);
  };

  const onAddressSubmit = async (data) => {
    try {
      const response = await api.post("/user/addresses", data);

      if (response.data) {
        const newAddressData = response.data;
        setAddresses((prev) => [...prev, newAddressData]);
        setSelectedAddressId(newAddressData.id);
        setIsAddingNewAddress(false);
        toast.success("Address added successfully");
        reset(); // Reset form fields
      }
    } catch (error) {
      console.error("Error adding address:", error);
      toast.error("Failed to add address");
    }
  };

  const createCheckoutSession = async () => {
    if (!selectedAddressId && deliveryType === "delivery") {
      toast.error("Please select a delivery address");
      return;
    }

    setIsCreatingCheckout(true);

    try {
      const response = await api.post(
        "/payments/create-checkout-session",
        {
          addressId: deliveryType === "delivery" ? selectedAddressId : null,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      const { sessionId, publicKey } = response.data;

      if (!sessionId) {
        toast.error("Failed to create checkout. Please try again.");
        return;
      }

      const stripePromise = loadStripe(publicKey);
      const stripe = await stripePromise;

      if (!stripe) {
        toast.error("Stripe failed to load. Please try again later.");
        return;
      }

      const result = await stripe.redirectToCheckout({ sessionId });

      if (result.error) {
        toast.error(result.error.message);
      }
    } catch (error) {
      console.error("Error creating checkout:", error);
      toast.error("Failed to create checkout. Please try again.");
    } finally {
      setIsCreatingCheckout(false);
    }
  };

  if (cartLoading || isLoadingAddresses) {
    return (
      <div className="flex justify-center items-center h-screen bg-background-main">
        <span className="loading loading-spinner loading-lg text-purple"></span>
      </div>
    );
  }

  if (!cart || cart.cartItems.length === 0) {
    return <EmptyCart />;
  }

  // Calculate total amount including delivery fee and tax
  const subtotal = parseFloat(cart.totalPrice);
  const deliveryFee = deliveryType === "delivery" ? 3.99 : 0;
  const total = (subtotal + deliveryFee + subtotal * 0.07).toFixed(2);

  return (
    <div className="bg-background-main min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/cart")}
            className="flex items-center text-gray-600 hover:text-purple group"
          >
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1.5 transition-all duration-200" />
            Back to Cart
          </button>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
            Complete Your Order
          </h1>
        </div>

        {/* Delivery Options Component */}
        <DeliveryOptions
          deliveryType={deliveryType}
          setDeliveryType={setDeliveryType}
          addresses={addresses}
          selectedAddressId={selectedAddressId}
          handleAddressSelect={handleAddressSelect}
          isAddingNewAddress={isAddingNewAddress}
          setIsAddingNewAddress={setIsAddingNewAddress}
          isLoadingAddresses={isLoadingAddresses}
        />

        {/* Address Form Component - conditionally rendered */}
        {deliveryType === "delivery" && isAddingNewAddress && (
          <AddressForm
            register={register}
            errors={errors}
            handleSubmit={handleSubmit}
            onAddressSubmit={onAddressSubmit}
            setIsAddingNewAddress={setIsAddingNewAddress}
            setValue={setValue} // Pass setValue to the component
            getValues={getValues} // Pass getValues to the component
          />
        )}

        {/* Order Summary Component */}
        <OrderSummary
          cart={cart}
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          total={total}
        />

        {/* Action Buttons */}
        <button
          onClick={createCheckoutSession}
          disabled={isCreatingCheckout}
          className="bg-purple hover:bg-purple-dark group w-full transition-colors duration-200 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center"
        >
          {isCreatingCheckout ? (
            <>
              <span className="loading loading-spinner loading-sm mr-2"></span>
              Processing...
            </>
          ) : (
            <>
              Proceed to Payment
              <ArrowRight className="h-5 w-5 ml-2 transition-transform duration-200 group-hover:translate-x-1.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
