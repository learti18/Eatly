import "./styles/utils.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Blogs from "./Pages/Blogs/Blogs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/Layouts/Layout";
import Pricing from "./Pages/Pricing/Pricing";
import Menu from "./Pages/Menu/Menu";
import Contact from "./Pages/Contact/Contact";
import About from "./Pages/About/About";
import Blogdetails from "./Pages/Blogs/Blogdetails";
import ScrollToTop from "./Hooks/ScrollToTop";
import Menudetails from "./Pages/Menu/Menudetails";
import { AuthProvider } from "./Contexts/AuthContext";
import RestaurantSignup from "./Pages/Auth/RestaurantSignup";
import Unauthorized from "./Pages/Unauthorized";
import RestaurantRoute from "./Routes/RestaurantRoute";
import VerifiedRestaurantRoute from "./Routes/VerifiedRestaurantRoute";
import RestaurantDashboard from "./Pages/RestaurantsDashbaord/RestaurantDashboard";
import PublicRoute from "./Routes/PublicRoute";
import AdminDashboardLayout from "./components/Layouts/AdminDashboardLayout";
import Admin from "./Pages/AdminDashboard/Admin";
import DashboardRestaurants from "./Pages/AdminDashboard/DashboardRestaurants";
import Orders from "./Pages/AdminDashboard/Orders";
import AdminRoute from "./Routes/AdminRoute";
import RestaurantDashboardLayout from "./components/Layouts/RestaurantDashboardLayout";
import { RestaurantProvider } from "./Contexts/RestaurantContext";
import FoodsListing from "./Pages/RestaurantsDashbaord/Foods/FoodsListing";
import RestaurantAccount from "./Pages/RestaurantsDashbaord/Account/RestaurantAccount";
import DriversListing from "./Pages/RestaurantsDashbaord/Drivers/DriversListing";
import AddDriver from "./Pages/RestaurantsDashbaord/Drivers/AddDriver";
import AddFood from "./Pages/RestaurantsDashbaord/Foods/AddFood";
import { Toaster } from "sonner";
import EditFood from "./Pages/RestaurantsDashbaord/Foods/EditFood";
import FoodDetails from "./Pages/Menu/FoodDetails";
import RestaurantSetup from "./Pages/RestaurantsDashbaord/AccountSetup/RestaurantSetup";
import ProtectedRoute from "./Routes/ProtectedRoute";
import RestaurantsOrders from "./Pages/RestaurantsDashbaord/Orders/RestaurantsOrders";
import RestaurantChat from "./Pages/RestaurantsDashbaord/Chat/RestaurantChat";
import Refresh from "./Pages/StripeOnboarding/Refresh";
import Return from "./Pages/StripeOnboarding/Return";
import Checkout from "./Pages/Payment/Checkout";
import OrderStatus from "./Pages/Payment/OrderStatus";
import Cart from "./Pages/Cart/Cart";
import BlogListing from "./Pages/AdminDashboard/Blogs/BlogListing";
import AddBlogs from "./Pages/AdminDashboard/Blogs/AddBlogs";
import EditBlogs from "./Pages/AdminDashboard/Blogs/EditBlogs";
import Payments from "./Pages/RestaurantsDashbaord/Payments/Payments";
import DriverRoute from "./Routes/DriverRoute";
import DriverDashboard from "./Pages/DriverDashboard/DriverDashboard";
import DriverDashboardLayout from "./components/Layouts/DriverDashboardLayout";
import OrderDetails from "./Pages/Order/OrderDetails";
import UserOrders from "./Pages/Order/UserOrders";
import GuestRoute from "./Routes/GuestRoute";
import Signin from "./Pages/Auth/Signin";
import Signup from "./Pages/Auth/Signup";
import ForgetPassword from "./Pages/Auth/ForgetPassword";
import Ingridients from "./Pages/AdminDashboard/Ingridients";

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

              {/* Guest-only routes (auth pages) with Layout */}
              <Route element={<Layout />}>
                <Route element={<GuestRoute />}>
                  <Route path="/sign-in" element={<Signin />} />
                  <Route path="/sign-up" element={<Signup />} />
                  <Route
                    path="/restaurant-signup"
                    element={<RestaurantSignup />}
                  />
                  <Route path="/forget-password" element={<ForgetPassword />} />
                </Route>
              </Route>

              {/* Public routes with Layout */}
              <Route element={<Layout />}>
                <Route element={<PublicRoute />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/blogs" element={<Blogs />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="blogs/:id" element={<Blogdetails />} />
                  <Route path="menu/:id" element={<Menudetails />} />
                  <Route
                    path="menu/:id/food/:foodId"
                    element={<FoodDetails />}
                  />
                </Route>
              </Route>

              <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/orders" element={<UserOrders />} />
                  <Route path="/orders/:id" element={<OrderDetails />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/checkout/success" element={<OrderStatus />} />
                </Route>
              </Route>

              {/* Admin routes with sidebarlayout */}
              <Route element={<AdminRoute />}>
                <Route path="/dashboard" element={<AdminDashboardLayout />}>
                  <Route index element={<Admin />} />
                  <Route path="ingridients" element={<Ingridients />} />
                  <Route
                    path="restaurants"
                    element={<DashboardRestaurants />}
                  />
                  <Route path="blogs" element={<BlogListing />} />
                  <Route path="blogs/add" element={<AddBlogs />} />
                  <Route path="blogs/edit/:id" element={<EditBlogs />} />
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
                      <Route
                        path="account"
                        element={<RestaurantAccount />}
                      />{" "}
                      <Route path="drivers" element={<DriversListing />} />
                      <Route path="drivers/add" element={<AddDriver />} />
                      <Route path="payments" element={<Payments />} />
                      <Route path="chat" element={<RestaurantChat />} />
                    </Route>
                  </Route>
                </Route>
              </Route>

              {/* Driver Routes */}
              <Route element={<DriverRoute />}>
                <Route
                  path="/driver-dashboard"
                  element={<DriverDashboardLayout />}
                >
                  <Route index element={<DriverDashboard />} />
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
