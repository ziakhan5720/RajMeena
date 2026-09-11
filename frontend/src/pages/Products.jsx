import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useDispatch, useSelector } from "react-redux";
import { setProducts, setLoading, setError } from "@/redux/productSlice";
import { addToCart } from "@/redux/cartSlice";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Search, SlidersHorizontal, ShoppingCart, Star } from "lucide-react";

const Products = () => {
    const dispatch = useDispatch();
    const { products, loading } = useSelector((state) => state.products);
    
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState("All");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sort, setSort] = useState("newest");
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    const categories = ["All", "Summer Collection 26", "Ready to Wear", "Luxury Pret", "Casual Wear", "Unstitched"];

    const fetchProducts = async () => {
        try {
            dispatch(setLoading(true));
            const params = new URLSearchParams();
            if (keyword) params.append("keyword", keyword);
            if (category && category !== "All") params.append("category", category);
            if (minPrice) params.append("minPrice", minPrice);
            if (maxPrice) params.append("maxPrice", maxPrice);
            if (sort) params.append("sort", sort);

            const res = await api.get(`/product?${params.toString()}`);
            if (res.data.success) {
                dispatch(setProducts(res.data.products));
            }
        } catch (error) {
            dispatch(setError(error.message));
            toast.error("Failed to load products");
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        fetchProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, sort]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchProducts();
    };

    const handleResetFilters = () => {
        setKeyword("");
        setCategory("All");
        setMinPrice("");
        setMaxPrice("");
        setSort("newest");
        // Reset URL params manually by refetching
        setTimeout(() => {
            fetchProducts();
        }, 50);
    };

    const handleAddToCart = (product) => {
        dispatch(
            addToCart({
                product: product._id,
                name: product.name,
                price: product.price,
                image: product.image,
                qty: 1,
                stock: product.stock
            })
        );
        toast.success(`${product.name} added to cart!`);
    };

    return (
        <div className="pt-24 pb-16 min-h-screen bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Page Title & Search Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold font-serif text-slate-900 tracking-tight">Explore Outfits</h1>
                        <p className="text-sm text-slate-500">Discover our collection of luxury pret and ready-to-wear dresses</p>
                    </div>

                    <form onSubmit={handleSearchSubmit} className="flex w-full md:w-auto items-center gap-2">
                        <div className="relative w-full md:w-80">
                            <Input
                                placeholder="Search outfits..."
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                className="pr-10 border-slate-200 focus:border-black rounded-none"
                            />
                            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black">
                                <Search size={18} />
                            </button>
                        </div>
                        <Button type="button" onClick={() => setShowMobileFilters(!showMobileFilters)} className="md:hidden bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-none">
                            <SlidersHorizontal size={18} />
                        </Button>
                    </form>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    
                    {/* Sidebar Filters (Desktop) */}
                    <div className={`lg:block ${showMobileFilters ? "block" : "hidden"} bg-white dark:bg-slate-900 p-6 rounded-none shadow-3xs border border-slate-200 dark:border-slate-800 h-fit space-y-6 font-sans text-left`}>
                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-3">Categories</h3>
                            <div className="flex flex-col gap-1.5">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setCategory(cat)}
                                        className={`text-left px-3 py-2 rounded-none text-xs transition-all tracking-wider ${
                                            category === cat
                                                ? "bg-black text-white font-medium"
                                                : "text-slate-650 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-950"
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <hr className="border-slate-100" />

                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-3">Price Range</h3>
                            <div className="flex items-center gap-2">
                                <Input
                                    type="number"
                                    placeholder="Min"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    className="h-9 text-xs rounded-none"
                                />
                                <span className="text-slate-400">-</span>
                                <Input
                                    type="number"
                                    placeholder="Max"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    className="h-9 text-xs rounded-none"
                                />
                            </div>
                             <Button onClick={fetchProducts} className="w-full mt-3 bg-black hover:bg-neutral-800 text-white rounded-none text-[10px] tracking-widest uppercase font-bold py-2 h-8">
                                Apply
                            </Button>
                        </div>

                        <hr className="border-slate-100" />

                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-3">Sort By</h3>
                            <select
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                                className="w-full border border-slate-250 dark:border-slate-800 rounded-none p-2 text-xs text-slate-700 dark:text-slate-300 dark:bg-slate-900 outline-none focus:border-black"
                            >
                                <option value="newest">Newest</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="rating-desc">Top Rated</option>
                            </select>
                        </div>

                        <Button onClick={handleResetFilters} variant="outline" className="w-full text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-950 border-slate-200 dark:border-slate-800 text-[10px] tracking-wider uppercase font-semibold rounded-none">
                            Reset All Filters
                        </Button>
                    </div>

                    {/* Products Grid */}
                    <div className="lg:col-span-3">
                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="animate-pulse bg-white border border-slate-100 rounded-none p-4 h-96">
                                        <div className="bg-slate-200 h-48 rounded-none w-full mb-4"></div>
                                        <div className="h-4 bg-slate-200 rounded-none w-3/4 mb-2"></div>
                                        <div className="h-4 bg-slate-200 rounded-none w-1/2 mb-6"></div>
                                        <div className="h-8 bg-slate-200 rounded-none w-full"></div>
                                    </div>
                                ))}
                            </div>
                        ) : products.length === 0 ? (
                            <div className="bg-white dark:bg-slate-900 rounded-none border border-slate-150 p-12 text-center max-w-lg mx-auto font-sans">
                                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">No Products Found</h3>
                                <p className="text-xs text-slate-500 mb-6 font-light">We couldn't find any products matching your search criteria.</p>
                                <Button onClick={handleResetFilters} className="bg-black hover:bg-neutral-800 text-white font-bold text-xs rounded-none tracking-widest uppercase py-2">
                                    Clear Filters
                                </Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {products.map((product) => (
                                     <div
                                         key={product._id}
                                         className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-none overflow-hidden shadow-2xs hover:shadow-sm transition-all duration-300 flex flex-col h-full"
                                     >
                                         <Link to={`/product/${product._id}`} className="relative block bg-slate-50 dark:bg-slate-950 overflow-hidden">
                                             <img
                                                 src={product.image}
                                                 alt={product.name}
                                                 className="w-full h-56 object-cover group-hover:scale-102 transition-transform duration-500"
                                             />
                                             {product.stock === 0 && (
                                                 <span className="absolute top-3 right-3 bg-red-650 text-white text-[9px] px-2 py-0.5 rounded-none font-bold uppercase tracking-wider">
                                                     Out of stock
                                                 </span>
                                             )}
                                         </Link>
 
                                         <div className="p-5 flex flex-col flex-grow text-left font-sans">
                                             <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
                                                 {product.category}
                                             </span>
                                             <Link to={`/product/${product._id}`} className="hover:text-slate-600 transition-colors">
                                                 <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-1 line-clamp-1">
                                                     {product.name}
                                                 </h3>
                                             </Link>
                                             
                                             {/* Rating */}
                                             <div className="flex items-center gap-1 mb-3">
                                                 <div className="flex text-amber-500">
                                                     {[...Array(5)].map((_, idx) => (
                                                         <Star
                                                             key={idx}
                                                             size={12}
                                                             className={idx < Math.round(product.rating) ? "fill-amber-500 text-amber-500" : "text-slate-200 dark:text-slate-800"}
                                                         />
                                                     ))}
                                                 </div>
                                                 <span className="text-[10px] text-slate-400 font-light">
                                                     ({product.numReviews})
                                                 </span>
                                             </div>
 
                                             <p className="text-slate-500 dark:text-slate-400 text-xs mb-4 line-clamp-2 flex-grow font-light leading-relaxed">
                                                 {product.description}
                                             </p>
 
                                             <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                                                 <span className="text-sm font-bold text-slate-950 dark:text-white">Rs. {product.price}</span>
                                                 <Button
                                                     disabled={product.stock === 0}
                                                     onClick={() => handleAddToCart(product)}
                                                     className="bg-black hover:bg-neutral-800 text-white h-9 rounded-none px-4 cursor-pointer gap-2 font-semibold text-xs tracking-wider uppercase"
                                                 >
                                                     <ShoppingCart size={14} /> Add
                                                 </Button>
                                             </div>
                                         </div>
                                     </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
