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
import ProtectedRoute from "./Routes/ProtectedRoute";
import { AuthProvider } from "./Contexts/AuthContext";
import RestaurantSignup from "./Pages/Auth/RestaurantSignup";
import Unauthorized from "./Pages/Unauthorized";
import RestaurantVerification from "./Pages/RestaurantsDashbaord/RestaurantVerification";
import RestaurantRoute from "./Routes/RestaurantRoute";
import VerifiedRestaurantRoute from "./Routes/VerifiedRestaurantRoute";
import RestaurantProfile from "./Pages/RestaurantsDashbaord/RestaurantProfile";
import RestaurantDashboard from "./Pages/RestaurantsDashbaord/RestaurantDashboard";
import { RestaurantProvider } from "./Contexts/RestaurantContext";
import GuestRoute from "./Routes/GuestRoute";
import PublicRoute from "./Routes/PublicRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
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
                  <Route path="/order" element={<Order />} />
                </Route>
              </Route>

              {/* Restaurant routes without Layout */}
              <Route element={<RestaurantRoute />}>
                <Route
                  path="/restaurant-profile"
                  element={<RestaurantProfile />}
                />
                <Route
                  path="/restaurant-verification"
                  element={<RestaurantVerification />}
                />
                <Route element={<VerifiedRestaurantRoute />}>
                  <Route
                    path="/restaurant-dashboard"
                    element={<RestaurantDashboard />}
                  />
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
