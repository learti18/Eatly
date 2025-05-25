import React, { useState, useEffect, useRef } from "react";
import { formatCurrency } from "../../utils/currencyFormatter";
import { formatDate } from "../../utils/dateFormatter";
import { useUpdateOrderStatus } from "../../Queries/Order/useUpdateOrderStatus";
import { toast } from "sonner";
import StatusDropdown from "./StatusDropdown";
import OrderDetailsPanel from "./OrderDetailsPanel";

export default function OrderTableRow({
  order,
  isExpanded,
  onToggleExpand,
  statusTypes,
}) {
  const { mutate: updateStatus, isLoading: isUpdating } =
    useUpdateOrderStatus();
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState("bottom");
  const statusBtnRef = useRef(null);
  const dropdownRef = useRef(null);

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800",
    Processing: "bg-blue-100 text-blue-800",
    Completed: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
    Delivered: "bg-purple-100 text-purple-800",
  };

  const handleStatusChange = (newStatus) => {
    updateStatus(
      {
        id: order.id,
        status: newStatus.value, // Only send the status value/id, not the entire object
      },
      {
        onSuccess: () => {
          toast.success(
            `Order #${order.id} status updated to ${newStatus.label}`
          );
          setStatusDropdownOpen(false);
        },
        onError: (error) => {
          toast.error("Failed to update order status");
          console.error("Error updating order status:", error);
        },
      }
    );
  };

  // Check if dropdown should appear above or below based on space available
  useEffect(() => {
    if (statusDropdownOpen && statusBtnRef.current && dropdownRef.current) {
      const buttonRect = statusBtnRef.current.getBoundingClientRect();
      const dropdownHeight = dropdownRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      // If there's not enough space below, show above
      if (buttonRect.bottom + dropdownHeight > viewportHeight) {
        setDropdownPosition("top");
      } else {
        setDropdownPosition("bottom");
      }
    }
  }, [statusDropdownOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        statusBtnRef.current &&
        !statusBtnRef.current.contains(event.target)
      ) {
        setStatusDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  return (
    <>
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">#{order.id}</div>
          <div
            className="text-xs text-gray-500 truncate max-w-[150px]"
            title={order.userId}
          >
            User: {order.userId.substring(0, 8)}...
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-900">
            {formatDate(order.orderDate)}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center gap-2">
            <div className="bg-purple/10 text-purple rounded-full w-7 h-7 flex items-center justify-center font-medium">
              {order.items.length}
            </div>
            <button
              onClick={() => onToggleExpand(order.id)}
              className="flex items-center gap-1 text-sm text-purple hover:text-purple-dark transition-colors px-3 py-1 rounded-md hover:bg-purple/5"
            >
              {isExpanded ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                  Hide
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  Details
                </>
              )}
            </button>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">
            ${formatCurrency(order.totalPrice)}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span
            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
              statusColors[order.status]
            }`}
          >
            {order.status}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <StatusDropdown
            orderId={order.id}
            currentStatus={order.status}
            statusTypes={statusTypes}
          />
        </td>
      </tr>

      {isExpanded && (
        <tr>
          <td colSpan="6" className="px-0 border-t border-gray-200">
            <OrderDetailsPanel
              order={order}
              onClose={() => onToggleExpand(order.id)}
              statusColors={statusColors}
            />
          </td>
        </tr>
      )}
    </>
  );
}
