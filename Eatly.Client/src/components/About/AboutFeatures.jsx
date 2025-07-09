import React from "react";
import { motion } from "framer-motion";
import { MapPin, Users, Award, Heart } from "lucide-react";

const AboutFeatures = () => {
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

  return (
    <section className="py-20 px-5 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-text-dark mb-6">
            What Makes Us Different
          </h2>
          <p className="text-xl text-text-medium max-w-3xl mx-auto">
            We're not just another food delivery app. We're your partners in
            discovering amazing food experiences and supporting local
            communities.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-text-dark mb-3">
                {feature.title}
              </h3>
              <p className="text-text-medium leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutFeatures;
