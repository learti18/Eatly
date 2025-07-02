import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

export const StatCard = ({ icon: Icon, title, value, change, link }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-lg bg-purple-light`}>
        <Icon size={24} className={`text-purple`} />
      </div>
      {link && (
        <Link
          to={link}
          className="text-purple hover:text-purple-dark transition-colors"
        >
          <Eye size={18} />
        </Link>
      )}
    </div>
    <div>
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      <p className="text-gray-600 font-medium">{title}</p>
      {change && (
        <p
          className={`text-sm mt-1 ${
            change >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {change >= 0 ? "+" : ""}
          {change}% from last month
        </p>
      )}
    </div>
  </div>
);
