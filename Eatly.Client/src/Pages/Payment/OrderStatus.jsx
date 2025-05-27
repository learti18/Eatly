import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import api from "../../Services/Api";

export default function OrderStatus() {
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("session_id");
  const account_id = searchParams.get("account_id");
  const [sessionData, setSessionData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await api.get(
          `/payments/session?sessionId=${session_id}&accountId=${account_id}`
        );

        if (response.status !== 200) {
          throw new Error("Failed to fetch session data");
        }

        setSessionData(response.data);
      } catch (err) {
        console.error("Error fetching session data:", err);
        setError("Failed to fetch order status. Please try again later.");
      }
    };
    fetchSessionData();
  }, [session_id, account_id]);

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
