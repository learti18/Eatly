import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Blogs from "./Pages/Blogs/Blogs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Signin, Signup, ForgetPassword } from "./Pages";
import Layout from "./components/Layouts/Layout";
import Pricing from "./Pages/Pricing/Pricing";
import Menu from "./Pages/Menu/Menu";
import Contact from "./Pages/Contact/Contact";
import Blogdetails from "./Pages/Blogs/Blogdetails";
import ScrollToTop from "./Hooks/ScrollToTop";
import Menudetails from "./Pages/Menu/Menudetails";
import { AuthProvider } from "./Contexts/AuthContext";
import RestaurantSignup from "./Pages/Auth/RestaurantSignup";
import Unauthorized from "./Pages/Unauthorized";
import RestaurantRoute from "./Routes/RestaurantRoute";
import VerifiedRestaurantRoute from "./Routes/VerifiedRestaurantRoute";
import RestaurantDashboard from "./Pages/RestaurantsDashbaord/RestaurantDashboard";
import GuestRoute from "./Routes/GuestRoute";
import PublicRoute from "./Routes/PublicRoute";
import AdminDashboardLayout from "./components/Layouts/AdminDashboardLayout";
import Admin from "./Pages/AdminDashboard/Admin";
import Users from "./Pages/AdminDashboard/Users";
import DashboardRestaurants from "./Pages/AdminDashboard/DashboardRestaurants";
import Orders from "./Pages/AdminDashboard/Orders";
import AdminRoute from "./Routes/AdminRoute";
import RestaurantDashboardLayout from "./components/Layouts/RestaurantDashboardLayout";
import { RestaurantProvider } from "./Contexts/RestaurantContext";
import FoodsListing from "./Pages/RestaurantsDashbaord/Foods/FoodsListing";
import RestaurantAccount from "./Pages/RestaurantsDashbaord/Account/RestaurantAccount";
import DriversListing from "./Pages/RestaurantsDashbaord/Drivers/DriversListing";
import AddFood from "./Pages/RestaurantsDashbaord/Foods/AddFood";
import { Toaster } from "sonner";
import EditFood from "./Pages/RestaurantsDashbaord/Foods/EditFood";
import FoodDetails from "./Pages/Menu/FoodDetails";
import RestaurantSetup from "./Pages/RestaurantsDashbaord/AccountSetup/RestaurantSetup";
import ProtectedRoute from "./Routes/ProtectedRoute";
import RestaurantsOrders from "./Pages/RestaurantsDashbaord/Orders/RestaurantsOrders";
import Refresh from "./Pages/StripeOnboarding/Refresh";
import Return from "./Pages/StripeOnboarding/Return";
import Checkout from "./Pages/Payment/Checkout";
import OrderStatus from "./Pages/Payment/OrderStatus";
import Order from "./Pages/Order/Order";
import Cart from "./Pages/Cart/Cart";
import BlogListing from "./Pages/AdminDashboard/Blogs/BlogListing";
import AddBlogs from "./Pages/AdminDashboard/Blogs/AddBlogs";
import EditBlogs from "./Pages/AdminDashboard/Blogs/EditBlogs";


const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Toaster richColors />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/unauthorized" element={<Unauthorized />} />

              {/* Public routes with Layout */}
              <Route element={<Layout />}>
                <Route element={<PublicRoute />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/blogs" element={<Blogs />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/contact" element={<Contact />} />

                  <Route path="/sign-in" element={<Signin />} />
                  <Route path="/sign-up" element={<Signup />} />
                  <Route
                    path="/restaurant-signup"
                    element={<RestaurantSignup />}
                  />
                  <Route path="/forget-password" element={<ForgetPassword />} />
                  <Route path="blogs/:id" element={<Blogdetails />} />
                  <Route path="menu/:id" element={<Menudetails />} />
                  <Route
                    path="menu/:id/food/:foodId"
                    element={<FoodDetails />}
                  />
                  <Route
                    path="menu/:id/food/:foodId"
                    element={<FoodDetails />}
                  />
                </Route>
              </Route>

              <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/order" element={<Order />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/checkout/success" element={<OrderStatus />} />
                </Route>
              </Route>

              {/* Admin routes with sidebarlayout */}
              <Route element={<AdminRoute />}>
                <Route path="/dashboard" element={<AdminDashboardLayout />}>
                  <Route index element={<Admin />} />
                  <Route path="users" element={<Users />} />
                  <Route
                    path="restaurants"
                    element={<DashboardRestaurants />}
                  />
                  <Route
                    path="blogs"
                    element={<BlogListing />}
                  />
                  <Route
                    path="blogs/add"
                    element={<AddBlogs />}
                  />
                  <Route
                    path="blogs/edit/:id"
                    element={<EditBlogs />}
                  />
                  <Route path="orders" element={<Orders />} />
                </Route>
              </Route>

              {/* Restaurant routes */}
              <Route element={<RestaurantProvider />}>
                <Route element={<RestaurantRoute />}>
                  {/* Initial setup routes */}
                  <Route
                    path="/restaurant-profile"
                    element={<RestaurantSetup />}
                  />
                  <Route
                    path="refresh/:connectedAccountId"
                    element={<Refresh />}
                  />
                  <Route
                    path="return/:connectedAccountId"
                    element={<Return />}
                  />

                  {/* Dashboard routes - only accessible after verification */}
                  <Route element={<VerifiedRestaurantRoute />}>
                    <Route
                      path="/restaurant-dashboard"
                      element={<RestaurantDashboardLayout />}
                    >
                      <Route index element={<RestaurantDashboard />} />
                      <Route path="foods" element={<FoodsListing />} />
                      <Route path="foods/add" element={<AddFood />} />
                      <Route path="foods/edit/:id" element={<EditFood />} />
                      <Route path="orders" element={<RestaurantsOrders />} />
                      <Route path="account" element={<RestaurantAccount />} />
                      <Route path="drivers" element={<DriversListing />} />
                    </Route>
                  </Route>
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
