import { Link } from "react-router-dom";

export const QuickActionCard = ({ icon: Icon, title, description, link }) => (
  <Link
    to={link}
    className={`block p-6 bg-white rounded-xl border border-gray-100 hover:border-purple hover:shadow-lg transition-all group`}
  >
    <div className={`p-3 rounded-lg bg-purple-light mb-4 w-fit`}>
      <Icon
        size={24}
        className={`text-purple group-hover:scale-110 transition-transform`}
      />
    </div>
    <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </Link>
);
