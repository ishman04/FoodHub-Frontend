import IconArrowRight from "../Components/Icons/IconArrowRight";
import PizzaImage from '../assets/images/besthomemadepizzahero.png'
import CookingImage from '../assets/images/cooking1.jpg'
import { FaCheck, FaClock, FaShieldAlt, FaPizzaSlice, FaShoppingCart, FaMotorcycle, FaSmile } from 'react-icons/fa';
import Layout from "../Layouts/Layout";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
    const features = [
        { icon: <FaCheck className="text-orange-500 text-2xl" />, title: "Perfect Taste", desc: "Handcrafted by master chefs using authentic recipes" },
        { icon: <FaClock className="text-orange-500 text-2xl" />, title: "Prepared Quickly", desc: "Fresh pizzas ready in minutes, never frozen" },
        { icon: <FaShieldAlt className="text-orange-500 text-2xl" />, title: "Hygiene Guaranteed", desc: "100% clean kitchens with strict safety standards" }
    ];

    const steps = [
        { icon: <FaShoppingCart className="text-3xl text-orange-500" />, title: "Order Food", desc: "Browse our menu and place your order in seconds" },
        { icon: <FaMotorcycle className="text-3xl text-orange-500" />, title: "Fast Delivery", desc: "Hot and fresh pizzas delivered to your door" },
        { icon: <FaSmile className="text-3xl text-orange-500" />, title: "Enjoy Food", desc: "Savor every bite of our delicious creations" }
    ];

    return (
        <Layout>
            <div className="overflow-hidden">
                {/* Hero Section */}
                <section className="flex flex-col-reverse items-center justify-center py-12 px-4 md:flex-row md:gap-12 bg-gradient-to-r from-amber-50 to-orange-200">
                    <motion.div 
                        className="w-full md:w-2/5 text-center md:text-left"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex justify-center text-5xl md:justify-normal mb-6">
                            <h1 className="font-bold text-transparent bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text
                            text-6xl">
                                Enjoy your slice{' '}
                                <span className="inline-block animate-bounce">{String.fromCodePoint(0x1F60B)}</span>
                            </h1>
                        </div>
                        <p className="pb-6 text-lg text-orange-800 max-w-md mx-auto md:mx-0">
                            Taste the authentic Italian flavors crafted by our master chefs, delivered straight to your home
                        </p>

                        <Link to='/menu'>
                            <motion.button
                                className="flex items-center px-6 py-3 text-white bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl hover:from-orange-600 hover:to-amber-600 shadow-lg group transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="font-semibold text-lg">Order Now</span>
                                <span className="inline-block ml-3 transition-transform ease-in-out group-hover:translate-x-2">
                                    <IconArrowRight />
                                </span>
                            </motion.button>
                        </Link>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <img 
                            src={PizzaImage} 
                            alt="Delicious Pizza" 
                            className="w-full max-w-xl md:max-w-2xl"
                        />
                    </motion.div>
                </section>

                {/* Features Section */}
                <section className="py-16 px-4 bg-gradient-to-b from-orange-100 to-amber-100">
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
                        <motion.div 
                            className="w-full md:w-1/2 mb-10 md:mb-0"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <img 
                                src={CookingImage} 
                                alt="Our Chef Cooking" 
                                className="w-full max-w-md mx-auto rounded-2xl shadow-xl border-8 border-white"
                            />
                        </motion.div>
                        
                        <motion.div 
                            className="w-full md:w-1/2 md:pl-12"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="mb-6 text-4xl md:text-5xl font-extrabold text-transparent bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-center md:text-left">
                                Crafted by Pizza Artisans
                            </h2>
                            <p className="text-lg text-orange-800 mb-8 text-center md:text-left">
                                Our chefs bring decades of experience from Naples to your neighborhood
                            </p>
                            
                            <div className="space-y-4">
                                {features.map((feature, index) => (
                                    <motion.div 
                                        key={index}
                                        className="flex items-start bg-white p-4 rounded-xl shadow-md"
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <div className="bg-orange-100 p-3 rounded-full mr-4">
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-orange-700">{feature.title}</h3>
                                            <p className="text-orange-600">{feature.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Process Section */}
                <section className="py-16 px-4 bg-gradient-to-b from-amber-100 to-orange-50">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.h2 
                            className="text-4xl font-extrabold text-transparent bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text mb-6"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            How It Works
                        </motion.h2>
                        <motion.div 
                            className="flex flex-col md:flex-row justify-between mt-12 gap-8"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.6, staggerChildren: 0.2 }}
                            viewport={{ once: true }}
                        >
                            {steps.map((step, index) => (
                                <motion.div 
                                    key={index}
                                    className="flex-1 bg-white p-6 rounded-2xl shadow-lg border border-orange-100"
                                    whileHover={{ y: -10 }}
                                >
                                    <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                        {step.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-orange-700 mb-2">{step.title}</h3>
                                    <p className="text-orange-600">{step.desc}</p>
                                    <div className="mt-4 text-orange-400 font-bold text-xl">{index + 1}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            </div>
        </Layout>
    )
}

export default Home;