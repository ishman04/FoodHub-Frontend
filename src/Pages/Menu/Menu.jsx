import Layout from "@/Layouts/Layout";
import { getAllProducts } from "@/Redux/Slices/ProductSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Menu = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const { productsData } = useSelector((state) => state.product);

  return (
    <Layout>
      <section className="mx-auto px-4 md:px-10 py-10 bg-gradient-to-r from-amber-50 to-orange-300">
        <h1 className="text-5xl font-extrabold text-transparent bg-gradient-to-r from-orange-600 to-orange-300 bg-clip-text text-center mb-16">
          Menu
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
          {productsData.map((item) =>
            item.inStock ? (
              <Link to={`/product/${item._id}`} key={item._id}>
                <div className="overflow-hidden border rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="overflow-hidden h-48 md:h-56">
                    <img
                      src={item.productImage}
                      alt={item.name}
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-5 bg-white">
                    <h2 className="text-sm font-semibold tracking-wide text-orange-500 uppercase">
                      {item.category}
                    </h2>
                    <h1 className="text-xl font-bold text-gray-800 mt-2">
                      {item.name}
                    </h1>
                    <p className="text-gray-600 mt-2 text-sm">
                      {item.description}
                    </p>
                    <div className="mt-4 text-orange-600 font-semibold text-lg">
                      ₹ {item.price}
                    </div>
                  </div>
                </div>
              </Link>
            ) : null
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Menu;
