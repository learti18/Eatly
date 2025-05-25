import React, { useState, useEffect, useRef } from "react";
import { useUpdateOrderStatus } from "../../Queries/Order/useUpdateOrderStatus";
import { toast } from "sonner";

export default function StatusDropdown({
  orderId,
  currentStatus,
  statusTypes = [],
}) {
  const { mutate: updateStatus, isLoading: isUpdating } =
    useUpdateOrderStatus();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState("bottom");
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  const availableStatusTypes =
    statusTypes?.length > 0
      ? statusTypes
      : [
          { label: "Pending", value: 0 },
          { label: "Processing", value: 1 },
          { label: "Completed", value: 2 },
          { label: "Delivered", value: 3 },
          { label: "Cancelled", value: 4 },
        ];

  const currentStatusType = availableStatusTypes.find(
    (status) => status.label === currentStatus
  );

  const handleStatusChange = (statusType) => {
    updateStatus(
      {
        id: orderId,
        status: statusType.value,
      },
      {
        onSuccess: () => {
          toast.success(
            `Order #${orderId} status updated to ${statusType.label}`
          );
          setIsOpen(false);
        },
        onError: (error) => {
          toast.error("Failed to update order status");
          console.error("Error updating order status:", error);
        },
      }
    );
  };

  useEffect(() => {
    if (isOpen && buttonRef.current && dropdownRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const dropdownHeight = dropdownRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      if (buttonRect.bottom + dropdownHeight > viewportHeight) {
        setDropdownPosition("top");
      } else {
        setDropdownPosition("bottom");
      }
    }
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="text-purple hover:text-purple-dark font-medium"
        disabled={isUpdating}
      >
        {isUpdating ? (
          <span className="loading loading-spinner loading-xs mr-2"></span>
        ) : (
          "Update Status"
        )}
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className={`fixed transform ${
            dropdownPosition === "top"
              ? "bottom-0 translate-y-[-100%] mb-2"
              : "mt-2"
          } right-0 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-[100]`}
          style={{
            top:
              dropdownPosition === "bottom"
                ? buttonRef.current.getBoundingClientRect().bottom +
                  window.scrollY
                : "auto",
            right:
              window.innerWidth -
              buttonRef.current.getBoundingClientRect().right,
          }}
        >
          <div className="py-1" role="menu" aria-orientation="vertical">
            {availableStatusTypes.map((statusType) => (
              <button
                key={statusType.value}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  currentStatusType?.value === statusType.value
                    ? "bg-gray-100 font-medium"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => handleStatusChange(statusType)}
              >
                {statusType.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
