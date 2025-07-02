import React from "react";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useDrivers } from "../../../Queries/Drivers/useDrivers";
import Table from "../../../components/Table/Table";
import DriverTableRow from "../../../components/Table/DriverTableRow";

export default function DriversListing() {
  const { data: drivers = [], isLoading } = useDrivers();

  return (
    <div className="px-8 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-semibold text-2xl">Drivers</h1>
        <Link to="add">
          <button className="bg-purple hover:bg-purple-dark text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Plus size={18} />
            Add Driver
          </button>
        </Link>
      </div>

      <Table
        columns={[
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "phone", label: "Phone" },
          { key: "status", label: "Status" },
        ]}
        isLoading={isLoading}
      >
        {!isLoading && drivers && drivers.length > 0
          ? drivers.map((driver) => (
              <DriverTableRow key={driver.id} driver={driver} />
            ))
          : !isLoading && (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No drivers found. Add your first driver using the button
                  above.
                </td>
              </tr>
            )}
      </Table>
    </div>
  );
}
