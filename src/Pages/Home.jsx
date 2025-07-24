// no logic changes made
import IconArrowRight from "../Components/Icons/IconArrowRight";
import PizzaImage from '../assets/images/besthomemadepizzahero.png';
import CookingImage from '../assets/images/cooking1.jpg';
import { FaCheck, FaClock, FaShieldAlt, FaPizzaSlice, FaShoppingCart, FaMotorcycle, FaSmile } from 'react-icons/fa';
import Layout from "../Layouts/Layout";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
    const features = [
        { icon: <FaCheck className="text-orange-500 text-xl sm:text-2xl" />, title: "Perfect Taste", desc: "Handcrafted by master chefs using authentic recipes" },
        { icon: <FaClock className="text-orange-500 text-xl sm:text-2xl" />, title: "Prepared Quickly", desc: "Fresh pizzas ready in minutes, never frozen" },
        { icon: <FaShieldAlt className="text-orange-500 text-xl sm:text-2xl" />, title: "Hygiene Guaranteed", desc: "100% clean kitchens with strict safety standards" }
    ];

    const steps = [
        { icon: <FaShoppingCart className="text-2xl sm:text-3xl text-orange-500" />, title: "Order Food", desc: "Browse our menu and place your order in seconds" },
        { icon: <FaMotorcycle className="text-2xl sm:text-3xl text-orange-500" />, title: "Fast Delivery", desc: "Hot and fresh pizzas delivered to your door" },
        { icon: <FaSmile className="text-2xl sm:text-3xl text-orange-500" />, title: "Enjoy Food", desc: "Savor every bite of our delicious creations" }
    ];

    return (
        <Layout>
            <div className="overflow-hidden">
                <section className="flex flex-col-reverse items-center justify-center py-8 px-4 sm:py-12 md:flex-row md:gap-8 lg:gap-12 bg-gradient-to-r from-amber-50 to-orange-200">
                    <motion.div 
                        className="w-full md:w-2/5 text-center md:text-left"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex justify-center md:justify-start text-4xl sm:text-5xl mb-4 sm:mb-6">
                            <h1 className="font-bold text-transparent bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-4xl sm:text-5xl lg:text-6xl">
                                Enjoy your slice
                            </h1>
                        </div>
                        <p className="pb-4 sm:pb-6 text-base sm:text-lg text-orange-800 max-w-md mx-auto md:mx-0">
                            Taste the authentic Italian flavors crafted by our master chefs, delivered straight to your home
                        </p>

                        <Link to='/menu'>
                            <motion.button
                                className="flex items-center justify-center mx-auto md:mx-0 px-4 py-2 sm:px-6 sm:py-3 text-white bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg sm:rounded-xl hover:from-orange-600 hover:to-amber-600 shadow-lg group transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="font-semibold text-base sm:text-lg">Order Now</span>
                                <span className="inline-block ml-2 sm:ml-3 transition-transform ease-in-out group-hover:translate-x-1 sm:group-hover:translate-x-2">
                                    <IconArrowRight />
                                </span>
                            </motion.button>
                        </Link>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="w-full max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl mb-6 md:mb-0"
                    >
                        <img src={PizzaImage} alt="Delicious Pizza" className="w-full h-auto" />
                    </motion.div>
                </section>

                <section className="py-12 px-4 sm:py-16 bg-gradient-to-b from-orange-100 to-amber-100">
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
                        <motion.div 
                            className="w-full md:w-1/2"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <img src={CookingImage} alt="Our Chef Cooking" className="w-full max-w-xs sm:max-w-md mx-auto rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border-4 sm:border-8 border-white" />
                        </motion.div>
                        
                        <motion.div 
                            className="w-full md:w-1/2"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-center md:text-left">
                                Crafted by Pizza Artisans
                            </h2>
                            <p className="text-base sm:text-lg text-orange-800 mb-6 sm:mb-8 text-center md:text-left">
                                Our chefs bring decades of experience from Naples to your neighborhood
                            </p>
                            <div className="space-y-3 sm:space-y-4">
                                {features.map((feature, index) => (
                                    <motion.div 
                                        key={index}
                                        className="flex items-start bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-sm sm:shadow-md"
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <div className="bg-orange-100 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-lg sm:text-xl font-bold text-orange-700">{feature.title}</h3>
                                            <p className="text-sm sm:text-base text-orange-600">{feature.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                <section className="py-12 px-4 sm:py-16 bg-gradient-to-b from-amber-100 to-orange-50">
                    <div className="max-w-5xl mx-auto text-center">
                        <motion.h2 
                            className="text-3xl sm:text-4xl font-extrabold text-transparent bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text mb-4 sm:mb-6"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            How It Works
                        </motion.h2>
                        <motion.div 
                            className="flex flex-col md:flex-row justify-between mt-8 sm:mt-12 gap-6"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            {steps.map((step, index) => (
                                <motion.div 
                                    key={index}
                                    className="flex-1 bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg border border-orange-100"
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="bg-orange-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                        {step.icon}
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-bold text-orange-700 mb-1 sm:mb-2">{step.title}</h3>
                                    <p className="text-sm sm:text-base text-orange-600">{step.desc}</p>
                                    <div className="mt-2 sm:mt-4 text-orange-400 font-bold text-lg sm:text-xl">{index + 1}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}

export default Home;
