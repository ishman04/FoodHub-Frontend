import Layout from "../../Layouts/Layout";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import axiosInstance from "../../helpers/axiosInstance";
import { getAllProducts } from "../../Redux/Slices/ProductSlice";

import {
  FaUpload,
  FaPizzaSlice,
  FaHamburger,
  FaGlassWhiskey,
  FaBreadSlice,
} from "react-icons/fa";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../Components/ui/select";

const categoryOptions = [
  { label: "Vegetarian", value: "veg", icon: <FaPizzaSlice className="mr-2 text-orange-500" /> },
  { label: "Non-Vegetarian", value: "non-veg", icon: <FaHamburger className="mr-2 text-orange-500" /> },
  { label: "Soft Drinks", value: "drinks", icon: <FaGlassWhiskey className="mr-2 text-orange-500" /> },
  { label: "Sides", value: "sides", icon: <FaBreadSlice className="mr-2 text-orange-500" /> },
];

function AddProduct() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    productName: "",
    description: "",
    price: "",
    quantity: "",
    category: "veg",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (value) => {
    setForm({ ...form, category: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return toast.error("Please select an image.");

    const formData = new FormData();
    formData.append("name", form.productName);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("quantity", form.quantity);
    formData.append("category", form.category);
    formData.append("productImage", image);

    try {
      const res = axiosInstance.post("/product/create", formData);
      toast.promise(res, {
        loading: "Adding product...",
        success: "Product added successfully!",
        error: "Failed to add product.",
      });
      await res;
      dispatch(getAllProducts());
      setForm({
        productName: "",
        description: "",
        price: "",
        quantity: "",
        category: "veg",
      });
      setImage(null);
      setPreview(null);
    } catch (err) {
      console.error(err);
    }
  };

  const selectedOption = categoryOptions.find(opt => opt.value === form.category);

  return (
    <Layout>
      <section className="py-12 bg-gradient-to-b from-orange-50 to-amber-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            
            {/* Left - Preview */}
            <div className="w-full md:w-1/2">
              <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-3xl p-8 h-full flex flex-col justify-center">
                <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500 mb-4">
                  Add New Menu Item
                </h1>
                <p className="text-orange-600 mb-6">
                  Expand your delicious offerings by adding new items to your menu.
                </p>
                {preview ? (
                  <div className="mt-4 flex justify-center">
                    <img 
                      src={preview} 
                      alt="Preview" 
                      className="max-h-64 rounded-xl shadow-lg border-4 border-white" 
                    />
                  </div>
                ) : (
                  <div className="bg-white rounded-xl p-8 text-center shadow-inner border-2 border-dashed border-orange-200">
                    <FaPizzaSlice className="mx-auto text-5xl text-orange-400 mb-4" />
                    <p className="text-orange-500">Image preview will appear here</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right - Form */}
            <div className="w-full md:w-1/2">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-100">
                <div className="p-6 sm:p-8">
                  <h2 className="text-2xl font-bold text-orange-700 mb-6 flex items-center">
                    {selectedOption?.icon}
                    Product Details
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-orange-700 font-medium mb-2">
                        Product Name
                      </label>
                      <input
                        name="productName"
                        value={form.productName}
                        onChange={handleChange}
                        required
                        minLength={5}
                        maxLength={20}
                        className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                        placeholder="e.g. Margherita Pizza"
                      />
                    </div>

                    <div>
                      <label className="block text-orange-700 font-medium mb-2">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        required
                        minLength={5}
                        maxLength={60}
                        rows={3}
                        className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                        placeholder="Brief description of the product"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-orange-700 font-medium mb-2">
                          Price (₹)
                        </label>
                        <input
                          type="number"
                          name="price"
                          value={form.price}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                          placeholder="0.00"
                        />
                      </div>
                      <div>
                        <label className="block text-orange-700 font-medium mb-2">
                          Quantity
                        </label>
                        <input
                          type="number"
                          name="quantity"
                          value={form.quantity}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                          placeholder="Available stock"
                        />
                      </div>
                    </div>

                    {/* 🔽 Custom Dropdown with Icons */}
                    <div>
                      <label className="block text-orange-700 font-medium mb-2">
                        Category
                      </label>
                      <Select value={form.category} onValueChange={handleCategoryChange}>
                        <SelectTrigger className="w-full border-2 border-orange-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-400">
                          <SelectValue>
                            <div className="flex items-center">
                              {selectedOption?.icon}
                              {selectedOption?.label}
                            </div>
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {categoryOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              <div className="flex items-center">
                                {option.icon}
                                {option.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-orange-700 font-medium mb-2">
                        Product Image
                      </label>
                      <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-orange-200 border-dashed rounded-xl cursor-pointer hover:bg-orange-50 transition-colors">
                        <div className="flex flex-col items-center justify-center">
                          <FaUpload className="text-orange-500 text-2xl mb-2" />
                          <p className="text-sm text-orange-600">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-orange-400 mt-1">
                            JPG, PNG (Max. 2MB)
                          </p>
                        </div>
                        <input 
                          type="file" 
                          accept=".jpg,.jpeg,.png" 
                          onChange={handleImageChange} 
                          required 
                          className="hidden" 
                        />
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 mt-6"
                    >
                      Add Product to Menu
                    </button>
                  </form>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}

export default AddProduct;
