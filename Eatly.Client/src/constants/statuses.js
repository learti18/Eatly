// Order status options for filtering
 export const orderStatusOptions = [
    { value: "All", label: "All Order Statuses" },
    { value: "Pending", label: "Pending" },
    { value: "InPreparation", label: "In Preparation" },
    { value: "ReadyForPickup", label: "Ready for Pickup" },
    { value: "OutForDelivery", label: "Out for Delivery" },
    { value: "Delivered", label: "Delivered" },
    { value: "Completed", label: "Completed" },
    { value: "Cancelled", label: "Cancelled" },
  ];

  // Payment status options for filtering
export  const paymentStatusOptions = [
    { value: "All", label: "All Payment Statuses" },
    { value: "Unpaid", label: "Unpaid" },
    { value: "AwaitingPayment", label: "Awaiting Payment" },
    { value: "Processing", label: "Processing" },
    { value: "Paid", label: "Paid" },
    { value: "Failed", label: "Failed" },
    { value: "Cancelled", label: "Cancelled" },
    { value: "Refunded", label: "Refunded" },
  ];

  // Order status colors for badges
export  const orderStatusColors = {
    Pending: "bg-gray-100 text-gray-800",
    InPreparation: "bg-yellow-100 text-yellow-800",
    ReadyForPickup: "bg-blue-100 text-blue-800",
    OutForDelivery: "bg-purple-100 text-purple-800",
    Delivered: "bg-indigo-100 text-indigo-800",
    Completed: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  // Payment status colors
export  const paymentStatusColors = {
    Unpaid: "bg-red-100 text-red-800",
    AwaitingPayment: "bg-yellow-100 text-yellow-800",
    Processing: "bg-blue-100 text-blue-800",
    Paid: "bg-green-100 text-green-800",
    Failed: "bg-red-100 text-red-800",
    Cancelled: "bg-gray-100 text-gray-800",
    Refunded: "bg-orange-100 text-orange-800",
  };