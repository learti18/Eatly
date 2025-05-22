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
import Order from "./Order/Order";
import { AuthProvider } from "./Contexts/AuthContext";
import RestaurantSignup from "./Pages/Auth/RestaurantSignup";
import Unauthorized from "./Pages/Unauthorized";
import RestaurantVerification from "./Pages/RestaurantsDashbaord/AccountSetup/RestaurantVerification";
import RestaurantRoute from "./Routes/RestaurantRoute";
import VerifiedRestaurantRoute from "./Routes/VerifiedRestaurantRoute";
import RestaurantProfile from "./Pages/RestaurantsDashbaord/AccountSetup/RestaurantProfile";
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

                  {/* guest routes */}
                  <Route element={<GuestRoute />}>
                    <Route path="/sign-in" element={<Signin />} />
                    <Route path="/sign-up" element={<Signup />} />
                    <Route
                      path="/restaurant-signup"
                      element={<RestaurantSignup />}
                    />
                    <Route
                      path="/forget-password"
                      element={<ForgetPassword />}
                    />
                  </Route>
                  <Route path="blogs/:id" element={<Blogdetails />} />
                  <Route path="menu/:id" element={<Menudetails />} />
                  <Route
                    path="menu/:id/food/:foodId"
                    element={<FoodDetails />}
                  />
                  <Route path="/order" element={<Order />} />
                  <Route path="menu/:id/food/:foodId" element={<FoodDetails/>}/>
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
                      <Route path="orders" element={<Orders />} />
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
