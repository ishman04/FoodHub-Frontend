import IconArrowRight from "../Components/Icons/IconArrowRight";
import PizzaImage from '../assets/images/besthomemadepizzahero.png'

function Home() {
    return (
        <div>
            <section className="flex flex-col-reverse items-center justify-center py-5 md:flex-row md:gap-7 bg-gradient-to-r from-amber-50 to-orange-300">
                <div className="w-4/6 ml-4 text-center md:w-2/6 md:text-left">
                    <div className="flex justify-center text-4xl md:justify-normal">
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
                    <img src={PizzaImage} alt="" className="w-[550px] h-[550px]"/>
                </div>
            </section>
        </div>
    )
}

export default Home;