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
      <td className="py-3 px-4">
        <div className="flex flex-col space-y-2 items-center">
          <Link
            to={`edit/${id}`}
            className="flex items-center justify-center cursor-pointer w-full gap-1 px-2 py-1 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-md text-sm font-medium transition-colors"
            title="Edit driver"
          >
            <Pencil size={14} />
            <span>Edit</span>
          </Link>

          <button
            className="flex items-center justify-center cursor-pointer w-full gap-1 px-2 py-1 bg-red-50 text-red-600 hover:bg-red-100 rounded-md text-sm font-medium transition-colors"
            title={isAvailable ? "Deactivate driver" : "Activate driver"}
          >
            {isAvailable ? (
              <>
                <XCircle size={14} />
                <span>Deactivate</span>
              </>
            ) : (
              <>
                <CheckCircle size={14} />
                <span>Activate</span>
              </>
            )}
          </button>
        </div>
      </td>
    </tr>
  );
}
