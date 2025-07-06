import React from "react";
import { Link } from "react-router-dom";
import { Pencil, XCircle, CheckCircle } from "lucide-react";

export default function DriverTableRow({ driver }) {
  const { id, fullName, email, phoneNumber, isAvailable } = driver;

  return (
    <tr className="hover:bg-gray-50 border border-gray-200 transition-colors">
      <td className="py-3 px-4">{fullName}</td>
      <td className="py-3 px-4">{email}</td>
      <td className="py-3 px-4">{phoneNumber || "-"}</td>
      <td className="py-3 px-4">
        {isAvailable ? (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
            Available
          </span>
        ) : (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
            Busy
          </span>
        )}
      </td>
    </tr>
  );
}
