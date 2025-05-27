import { ConnectDocuments, ConnectPayments } from "@stripe/react-connect-js";
import React from "react";

export default function DriversListing() {
  return (
    <div>
      <ConnectPayments />
    </div>
  );
}
