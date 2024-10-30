import { useNavigate } from "react-router";

function NotFound(){

    const navigate = useNavigate();

    return (
        <main className="flex flex-col items-center justify-center w-full h-screen bg-gradient-to-r from-amber-50 to-orange-300">
        <h1 className="font-extrabold tracking-widest text-white text-9xl">
          404
        </h1>
        <div className="absolute px-2 text-sm text-white bg-black rounded rotate-12">
          Page Not Found
        </div>
        <button className="mt-5" onClick={() => navigate(-1)}> {/* takes to previous page */}
          <a className="relative inline-block text-sm font-medium text-[#fff] group active:text-yellow-500 focus:outline-none focus:ring">
            <span className="absolute inset-0 transition-all duration-200 ease-in-out bg-[#EAB308] group-hover:bg-[#B77D00]"/>

            <span
                
                className="relative block px-8 py-3 transition-all duration-200 ease-in-out bg-[#EAB308] border border-current group-hover:bg-[#B77D00]"
            >
              Go Back
            </span>
          </a>
        </button>
      </main>
    )
}

export default NotFound;