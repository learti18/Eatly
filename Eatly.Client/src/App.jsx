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
import FoodDetails from "./Pages/Menu/FoodDetails";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/sign-in" element={<Signin />} />
              <Route path="/sign-up" element={<Signup />} />
              <Route path="/forget-password" element={<ForgetPassword />} />
              <Route path="blogs/:id" element={<Blogdetails />} />
              <Route path="menu/:id" element={<Menudetails />} />
              <Route path="/order" element={<Order />} />
              <Route path="menu/:id/food/:id" element={<FoodDetails />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
