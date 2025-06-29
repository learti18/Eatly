import { ConnectPayments } from "@stripe/react-connect-js";
import React from "react";

export default function Payments() {
  return (
    <div className="p-5">
      <h1 className="font-semibold text-2xl mb-8">Payments</h1>
      <ConnectPayments />
    </div>
  );
}
