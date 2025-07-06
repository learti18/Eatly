import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Car,
  Clock,
  DollarSign,
  Users,
  Eye,
  Plus,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useFetchResturantOrders } from "../../Queries/Order/useFetchResturantOrders";
import { useAllFoods } from "../../Queries/Foods/useAllFoods";
import { useDrivers } from "../../Queries/Drivers/useDrivers";
import { useRestaurant } from "../../Contexts/RestaurantContext";
import { formatCurrency } from "../../Utils/currencyFormatter";
import { formatDate } from "../../Utils/dateFormatter";
import { QuickActionCard } from "../../components/Cards/QuickActionCard";
import { StatCard } from "../../components/Cards/StatCard";

export default function RestaurantDashboard() {
  const { restaurant } = useRestaurant();

  const { data: orderData, isLoading: ordersLoading } = useFetchResturantOrders(
    {
      pageNumber: 1,
      pageSize: 10,
    }
  );
  const { data: foods = [], isLoading: foodsLoading } = useAllFoods();
  const { data: drivers = [], isLoading: driversLoading } = useDrivers();

  const stats = useMemo(() => {
    const orders = orderData?.items || [];
    const totalOrders = orderData?.totalCount || 0;

    const revenueOrders = orders.filter(
      (order) =>
        order.orderStatus === "Delivered" || order.orderStatus === "Completed"
    );
    const totalRevenue = revenueOrders.reduce(
      (sum, order) => sum + order.totalPrice,
      0
    );

    const pendingOrders = orders.filter(
      (order) =>
        order.orderStatus === "Pending" || order.orderStatus === "Confirmed"
    ).length;

    const availableDrivers = drivers.filter(
      (driver) => driver.isAvailable
    ).length;

    return {
      totalOrders,
      totalRevenue,
      pendingOrders,
      totalFoods: foods.length,
      totalDrivers: drivers.length,
      availableDrivers,
    };
  }, [orderData, foods, drivers]);

  const recentOrders = useMemo(() => {
    return orderData?.items?.slice(0, 5) || [];
  }, [orderData]);

  return (
    <div className="p-8 bg-background-main min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back{restaurant?.name ? `, ${restaurant.name}` : ""}!
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your restaurant today
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={Package}
          title="Total Orders"
          value={ordersLoading ? "..." : stats.totalOrders}
          change={12}
          link="/restaurant-dashboard/orders"
        />
        <StatCard
          icon={DollarSign}
          title="Revenue"
          value={
            ordersLoading ? "..." : `$${formatCurrency(stats.totalRevenue)}`
          }
          link="/restaurant-dashboard/payments"
          change={8}
          color="green"
        />
        <StatCard
          icon={Clock}
          title="Pending Orders"
          value={ordersLoading ? "..." : stats.pendingOrders}
          color="orange"
          link="/restaurant-dashboard/orders"
        />
        <StatCard
          icon={Users}
          title="Available Drivers"
          value={
            driversLoading
              ? "..."
              : `${stats.availableDrivers}/${stats.totalDrivers}`
          }
          color="blue"
          link="/restaurant-dashboard/drivers"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Recent Orders
                </h2>
                <Link
                  to="/restaurant-dashboard/orders"
                  className="text-purple hover:text-purple-dark transition-colors font-medium"
                >
                  View All
                </Link>
              </div>
            </div>
            <div className="p-6">
              {ordersLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple"></div>
                </div>
              ) : recentOrders.length > 0 ? (
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-purple-light rounded-lg">
                          <Package size={20} className="text-purple" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            Order #{String(order.id).slice(-6)}
                          </p>
                          <p className="text-sm text-gray-600">
                            • {formatDate(order.orderDate)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          ${formatCurrency(order.totalPrice)}
                        </p>
                        <div className="flex items-center justify-end mt-1">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              order.orderStatus === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : order.orderStatus === "Confirmed"
                                ? "bg-blue-100 text-blue-800"
                                : order.orderStatus === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {order.orderStatus === "Delivered" && (
                              <CheckCircle size={12} className="mr-1" />
                            )}
                            {order.orderStatus === "Pending" && (
                              <Clock size={12} className="mr-1" />
                            )}
                            {order.orderStatus}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Package size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">No orders yet</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Orders will appear here once customers start ordering
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions & Stats */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-4">
              <QuickActionCard
                icon={Plus}
                title="Add Food Item"
                description="Add new dishes to your menu"
                link="/restaurant-dashboard/foods/add"
              />
              <QuickActionCard
                icon={Car}
                title="Add Driver"
                description="Onboard new delivery drivers"
                link="/restaurant-dashboard/drivers/add"
                color="blue"
              />
              <QuickActionCard
                icon={Package}
                title="View Orders"
                description="Manage customer orders"
                link="/restaurant-dashboard/orders"
                color="green"
              />
            </div>
          </div>

          {/* Menu Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Menu Overview
              </h3>
              <Link
                to="/restaurant-dashboard/foods"
                className="text-purple hover:text-purple-dark transition-colors"
              >
                <Eye size={18} />
              </Link>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Items</span>
                <span className="font-semibold text-gray-900">
                  {foodsLoading ? "..." : stats.totalFoods}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Categories</span>
                <span className="font-semibold text-gray-900">
                  {foodsLoading
                    ? "..."
                    : new Set(foods.map((food) => food.category)).size}
                </span>
              </div>
            </div>
            {!foodsLoading && stats.totalFoods === 0 && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle size={16} className="text-yellow-600 mr-2" />
                  <p className="text-sm text-yellow-700">
                    No menu items yet. Start by adding your first dish!
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Driver Status */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Driver Status
              </h3>
              <Link
                to="/restaurant-dashboard/drivers"
                className="text-purple hover:text-purple-dark transition-colors"
              >
                <Eye size={18} />
              </Link>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Drivers</span>
                <span className="font-semibold text-gray-900">
                  {driversLoading ? "..." : stats.totalDrivers}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Available Now</span>
                <span className="font-semibold text-green-600">
                  {driversLoading ? "..." : stats.availableDrivers}
                </span>
              </div>
            </div>
            {!driversLoading && stats.totalDrivers === 0 && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle size={16} className="text-blue-600 mr-2" />
                  <p className="text-sm text-blue-700">
                    No drivers registered. Add drivers to handle deliveries!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
