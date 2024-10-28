import IconArrowRight from "../Components/Icons/IconArrowRight";
import PizzaImage from '../assets/images/besthomemadepizzahero.png'
import CookingImage from '../assets/images/cooking1.jpg'
import Checkbox from '../Components/Icons/Checkbox'
import OrderFood from '../assets/images/order-food.png'
import Pickup from '../assets/images/pickup.png'
import EnjoyFood from '../assets/images/enjoyfood.png'
import Layout from "../Layouts/Layout";

function Home() {
    return (
        <Layout>
        <div>
            <section className="flex flex-col-reverse items-center justify-center py-5 md:flex-row md:gap-7 bg-gradient-to-r from-amber-50 to-orange-300">
                <div className="w-4/6 ml-4 text-center md:w-2/6 md:text-left">
                    <div className="flex justify-center text-5xl md:justify-normal">
                        <h1 className="pb-5 font-bold text-transparent bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text">
                            Enjoy your slice{' '}
                        </h1>
                        <h1>
                            {String.fromCodePoint(0x1F60B)}
                        </h1>
                    </div>
                    <p className="pb-4 text-[#6B7280]">Enjoy the pizza of the town from comfort of your home</p>

                    <button className="flex items-center px-4 py-2 text-white bg-orange-400 rounded-md hover:bg-orange-500 group">
                        Order Now
                        <span className="inline-block ml-2 transition-transform ease-in-out group-hover:translate-x-2">
                            <IconArrowRight />
                        </span>
                        
                    </button>
                </div>
                <div>
                    <img src={PizzaImage} alt="" className="w-[650px] h-[650px]"/>
                </div>
            </section>

            <section className="py-4 mt-6 bg-gradient-to-r from-amber-50 to-orange-300">
                <div className="container flex flex-col md:flex-row">
                    <div className="flex flex-col items-center justify-center rounded-lg lg:w-1/2">
                        <img 
                        src={CookingImage} alt="" 
                        width={500}
                        className="rounded-lg"
                        />
                        
                    </div>
                    <div className="flex flex-col flex-wrap text-center lg:py-6 lg:w-1/2 lg:pl-12 lg:text-left">
                        <div className="flex flex-col items-center lg:items:start">

                            <div>
                                <h2 className="mb-2 text-5xl font-extrabold text-transparent title-font bg-gradient-to-r from-orange-600 to-orange-300 bg-clip-text">
                                    Cooked by the best <br /> chefs in the world
                                </h2>
                                <p className="text-base leading-relaxed text-[#6B7280]">
                                    There are many benefits regarding to that but the main ones are:
                                </p>
                            </div>
                        </div>

                        <div className="w-full p-1">
                            <div className="flex items-center h-full p-2 text-2xl rounded">
                                <Checkbox className="text-[#F38339] w-10 h-10 mr-4" />
                                <span className="font-bold">
                                Perfect Taste
                                </span>
                            </div>
                            
                        </div>
                        <div className="w-full p-1">
                            <div className="flex items-center h-full p-2 text-2xl rounded">
                                <Checkbox className="text-[#F38339] w-10 h-10 mr-4" />
                                <span className="font-bold">
                                Prepared quickly
                                </span>
                            </div>
                            
                        </div>
                        <div className="w-full p-1">
                            <div className="flex items-center h-full p-2 text-2xl rounded">
                                <Checkbox className="text-[#F38339] w-10 h-10 mr-4" />
                                <span className="font-bold">
                                Food hygiene guaranteed
                                </span>
                            </div>
                            
                        </div>
                        <div className="px-5 py-4 mx-auto">
                            <div className="flex justify-center py-4">
                                <div className="inline-flex w-16 h-1 bg-yellow-500 rounded-full">

                                </div>
                            </div>
                            <div className="flex flex-wrap space-y-6 md:space-y-0">
                                <div className="flex flex-col items-center text-center p-4 md:w-1/3">
                                <div className="inline-flex items-center justify-center flex-shrink-0 w-20 h-20 mb-5 bg-yellow-100 rounded">
                                    <img className="w-20 h-20" src={OrderFood} alt="" />
                                </div>
                                
                                    <div>
                                        <h2 className="mb-3 text-lg font-bold text-gray-900 title-font">
                                            Order Food
                                        </h2>
                                        <p className="text-base leading-relaxed">
                                            As easy as 1,2,3. Just select your favourite pizza and place your order.
                                        </p>
                                    </div>
                                    
                                </div>
                                <div className="flex flex-col items-center text-center p-4 md:w-1/3">
                                <div className="inline-flex items-center justify-center flex-shrink-0 w-20 h-20 mb-5 bg-yellow-100 rounded">
                                    <img className="w-20 h-20" src={Pickup} alt="" />
                                </div>
                                
                                    <div>
                                        <h2 className="mb-3 text-lg font-bold text-gray-900 title-font">
                                            Pickup Food
                                        </h2>
                                        <p className="text-base leading-relaxed">
                                            As easy as 1,2,3. Just select your favourite pizza and place your order.
                                        </p>
                                    </div>
                                    
                                </div>
                                <div className="flex flex-col items-center text-center p-4 md:w-1/3">
                                <div className="inline-flex items-center justify-center flex-shrink-0 w-20 h-20 mb-5 bg-yellow-100 rounded">
                                    <img className="w-20 h-20" src={EnjoyFood} alt="" />
                                </div>
                                
                                    <div>
                                        <h2 className="mb-3 text-lg font-bold text-gray-900 title-font">
                                            Enjoy Food
                                        </h2>
                                        <p className="text-base leading-relaxed">
                                            As easy as 1,2,3. Just select your favourite pizza and place your order.
                                        </p>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
            </section>

            <section>
                <div className="flex">
                    <div className="m-10">
                    <iframe className="rounded-lg" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112083.64852786028!2d77.06377248494194!3d28.611354047667078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce1f0e953711f%3A0x844a573e77077c2a!2sPizza%20Hut!5e0!3m2!1sen!2sin!4v1730005874176!5m2!1sen!2sin" 
                    width="800" 
                    height="450" 
                    style={{border:0 }}
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                    </div>
                    <div className="mt-10 ml-10 flex flex-col w-full items-center">
                        <h2 className="text-5xl font-bold text-orange-500">About</h2>
                        <p className="mt-10 leading-relaxed text-xl text-[#6B7280]">
                        At Pizza Hut, we’re passionate about delivering the perfect pizza experience. From our signature pan pizzas to our famous stuffed crust, each pie is made with high-quality ingredients and crafted to satisfy. We offer a variety of menu options, including wings, pasta, sides, and desserts, all designed to complement our pizzas. With convenient dine-in, takeaway, and delivery services, Pizza Hut makes it easy to enjoy a delicious meal anytime, anywhere. Our commitment to flavor, freshness, and great deals ensures every order is a satisfying experience for friends, families, and pizza lovers alike.
                        </p>
                    </div>
                </div>
            </section>
        </div>
        </Layout>
    )
}

export default Home;