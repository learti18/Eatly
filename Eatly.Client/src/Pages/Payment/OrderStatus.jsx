import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import api from "../../Services/Api";

export default function OrderStatus() {
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("session_id");
  const [sessionData, setSessionData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get("session_id");

    if (!sessionId) {
      toast.error("No session ID found in URL");
      return;
    }

    async function fetchOrder() {
      try {
        const response = await api.get(
          `/payments/session?sessionId=${sessionId}`
        );
        const { orderId } = response.data;

        if (!orderId) {
          toast.error("Order not found for this session");
          return;
        }

        navigate(`/orders/${orderId}`);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch order details");
      }
    }

    fetchOrder();
  }, [navigate]);

  if (error) return <div>Error: {error}</div>;

  if (!sessionData) return <div>Loading...</div>;

  return (
    <div className="order-status">
      <h1>Order Status</h1>
      <p>Order ID: {sessionData.id}</p>
      <p>Status: {sessionData.status}</p>
      <p>Total Amount: ${sessionData.amount_total / 100}</p>
      <p>Payment Method: {sessionData.payment_method_types.join(", ")}</p>
      <p>Customer Email: {sessionData.customer_email}</p>
    </div>
  );
}
