import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Users,
  MapPin,
  Award,
  Heart,
  Star,
  Clock,
  Shield,
  Truck,
} from "lucide-react";

export default function About() {
  const stats = [
    { number: "1000+", label: "Happy Customers" },
    { number: "50+", label: "Partner Restaurants" },
    { number: "15+", label: "Cities Served" },
    { number: "99%", label: "Customer Satisfaction" },
  ];

  const features = [
    {
      icon: <MapPin className="w-8 h-8 text-purple" />,
      title: "Local & Global",
      description:
        "From local favorites to international cuisines, we bring diverse flavors to your doorstep.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <Users className="w-8 h-8 text-purple" />,
      title: "Community Focused",
      description:
        "Supporting local restaurants and connecting communities through great food experiences.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Award className="w-8 h-8 text-purple" />,
      title: "Quality Assured",
      description:
        "We work only with verified restaurants that meet our high standards for quality and service.",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: <Heart className="w-8 h-8 text-purple" />,
      title: "Made with Love",
      description:
        "Every order is prepared with care and delivered with passion for great food.",
      gradient: "from-red-500 to-rose-500",
    },
  ];

  const values = [
    {
      icon: <Clock className="w-12 h-12 text-white" />,
      title: "Fast Delivery",
      description: "Average delivery time of 30 minutes",
      color: "bg-gradient-to-br from-orange-400 to-red-500",
    },
    {
      icon: <Shield className="w-12 h-12 text-white" />,
      title: "Safe & Secure",
      description: "Your data and payments are protected",
      color: "bg-gradient-to-br from-green-400 to-blue-500",
    },
    {
      icon: <Star className="w-12 h-12 text-white" />,
      title: "Top Rated",
      description: "4.8/5 average customer rating",
      color: "bg-gradient-to-br from-yellow-400 to-orange-500",
    },
    {
      icon: <Truck className="w-12 h-12 text-white" />,
      title: "Wide Coverage",
      description: "Serving 15+ cities nationwide",
      color: "bg-gradient-to-br from-purple-400 to-pink-500",
    },
  ];

  return (
    <div className="bg-background-main min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-5">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-text-dark mb-6">
            About <span className="text-purple">Eatly</span>
          </h1>
          <p className="text-xl md:text-2xl text-text-medium max-w-4xl mx-auto leading-relaxed">
            We're passionate about connecting food lovers with amazing
            restaurants and creating memorable dining experiences, one delivery
            at a time.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-purple">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </h3>
                <p className="text-purple-light text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-text-dark mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-lg text-text-medium leading-relaxed">
                <p>
                  Founded with a simple mission: to make great food accessible
                  to everyone, everywhere. Eatly started as a small idea to
                  bridge the gap between amazing local restaurants and hungry
                  customers.
                </p>
                <p>
                  Today, we're proud to serve thousands of customers across
                  multiple cities, partnering with the best restaurants to
                  deliver not just food, but experiences that bring joy to your
                  table.
                </p>
                <p>
                  We believe food is more than sustenance—it's a way to connect,
                  celebrate, and create lasting memories with the people we care
                  about.
                </p>
              </div>
            </div>
            <div className="relative h-96">
              <img
                src="/restaurant3.jpg"
                alt="Restaurant interior"
                className="w-full h-full object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute bottom-4 left-4 px-3.5 py-3 bg-purple rounded-2xl flex items-center justify-center shadow-xl">
                <Heart className="size-9 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-5 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text-dark mb-6">
              What Makes Us Different
            </h2>
            <p className="text-xl text-text-medium max-w-3xl mx-auto">
              We're not just another food delivery app. We're your partners in
              discovering amazing food experiences and supporting local
              communities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-text-dark mb-3">
                  {feature.title}
                </h3>
                <p className="text-text-medium leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-5">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-text-dark mb-8">
            Our Mission
          </h2>
          <div className="bg-purple rounded-3xl p-12 md:p-16 text-white">
            <p className="text-2xl md:text-3xl font-medium leading-relaxed max-w-4xl mx-auto">
              "To create a world where great food brings people together,
              supporting local restaurants while delivering happiness to every
              doorstep."
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-5 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-text-dark mb-6">
            Ready to Explore?
          </h2>
          <p className="text-xl text-text-medium mb-8">
            Join thousands of food lovers who trust Eatly for their dining
            adventures.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/menu"
              className="inline-flex items-center justify-center gap-2 bg-purple hover:bg-purple-dark text-white font-semibold py-4 px-8 rounded-xl transition-colors group"
            >
              Browse Restaurants
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
