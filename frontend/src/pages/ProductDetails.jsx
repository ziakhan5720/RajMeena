import { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "@/lib/api";
import { setSelectedProduct, setLoading, setError } from "@/redux/productSlice";
import { addToCart } from "@/redux/cartSlice";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Star, ShoppingCart, ArrowLeft, Send } from "lucide-react";

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { selectedProduct: product, loading } = useSelector((state) => state.products);
    const { user } = useSelector((state) => state.user);

    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("M");
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [submittingReview, setSubmittingReview] = useState(false);

    const fetchProductDetails = useCallback(async () => {
        try {
            dispatch(setLoading(true));
            const res = await api.get(`/product/${id}`);
            if (res.data.success) {
                dispatch(setSelectedProduct(res.data.product));
            }
        } catch (error) {
            dispatch(setError(error.message));
            toast.error("Failed to load product details");
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch, id]);

    useEffect(() => {
        fetchProductDetails();
    }, [fetchProductDetails]);

    const handleAddToCart = () => {
        dispatch(
            addToCart({
                product: product._id,
                name: product.name,
                price: product.price,
                image: product.image,
                qty: qty,
                stock: product.stock,
                size: size
            })
        );
        toast.success(`${qty}x ${product.name} (Size: ${size}) added to cart!`);
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!comment.trim()) {
            toast.error("Review comment cannot be empty");
            return;
        }

        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            toast.error("You must log in to submit a review");
            return;
        }

        try {
            setSubmittingReview(true);
            const res = await api.post(
                `/product/${id}/reviews`,
                { rating, comment },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );

            if (res.data.success) {
                toast.success("Review posted successfully!");
                setComment("");
                // Refresh product info to see new reviews and score
                fetchProductDetails();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to post review");
        } finally {
            setSubmittingReview(false);
        }
    };

    if (loading) {
        return (
            <div className="pt-28 pb-16 min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
                <div className="animate-pulse flex flex-col md:flex-row gap-8 max-w-5xl w-full px-6">
                    <div className="bg-slate-200 dark:bg-slate-900 h-96 rounded-none md:w-1/2"></div>
                    <div className="flex-1 space-y-4">
                        <div className="h-6 bg-slate-200 dark:bg-slate-900 rounded-none w-1/4"></div>
                        <div className="h-10 bg-slate-200 dark:bg-slate-900 rounded-none w-3/4"></div>
                        <div className="h-4 bg-slate-200 dark:bg-slate-900 rounded-none w-1/3"></div>
                        <div className="h-8 bg-slate-200 dark:bg-slate-900 rounded-none w-1/4"></div>
                        <div className="h-20 bg-slate-200 dark:bg-slate-900 rounded-none w-full"></div>
                        <div className="h-12 bg-slate-200 dark:bg-slate-900 rounded-none w-1/2"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="pt-28 pb-16 min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 text-center px-6">
                <h2 className="text-2xl font-bold font-serif tracking-wider uppercase text-slate-800 dark:text-white mb-2">Product Not Found</h2>
                <p className="text-slate-500 mb-6 font-light">The requested product could not be found or has been removed.</p>
                <Link to="/products">
                    <Button className="bg-black hover:bg-neutral-800 text-white rounded-none tracking-widest text-xs uppercase font-bold">Back to Shop</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-28 pb-16 min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
            <div className="max-w-6xl mx-auto px-6">
                
                {/* Back Link */}
                <Link to="/products" className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-slate-500 hover:text-black dark:hover:text-white mb-8 transition-colors">
                    <ArrowLeft size={14} /> Back to Products
                </Link>

                {/* Product Core Details */}
                <div className="bg-white dark:bg-slate-900 rounded-none p-6 md:p-10 border border-slate-150 dark:border-slate-800 shadow-none grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                    
                    {/* Product Image */}
                    <div className="bg-slate-50 dark:bg-slate-950 rounded-none overflow-hidden flex items-center justify-center p-4 border border-slate-150 dark:border-slate-800 h-96 md:h-auto">
                        <img
                             src={product.image}
                             alt={product.name}
                             className="max-h-full max-w-full object-contain rounded-none shadow-3xs"
                        />
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col text-left">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 block">
                            {product.category}
                        </span>
                        <h1 className="text-3xl font-light font-serif text-slate-900 dark:text-white tracking-wide mb-4 leading-tight uppercase">{product.name}</h1>

                        {/* Rating Summary */}
                        <div className="flex items-center gap-2 mb-6">
                            <div className="flex text-amber-500">
                                 {[...Array(5)].map((_, idx) => (
                                     <Star
                                         key={idx}
                                         size={14}
                                         className={idx < Math.round(product.rating) ? "fill-amber-500 text-amber-500" : "text-slate-200 dark:text-slate-800"}
                                     />
                                 ))}
                            </div>
                            <span className="text-xs font-bold text-slate-800 dark:text-white">{product.rating.toFixed(1)}</span>
                            <span className="text-xs text-slate-400 font-light">({product.numReviews} reviews)</span>
                        </div>

                        <div className="mb-6">
                            <span className="text-xl font-bold text-slate-950 dark:text-white">Rs. {product.price}</span>
                        </div>

                        <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed mb-6 font-light">
                            {product.description}
                        </p>

                        <div className="mt-auto space-y-6">
                            {/* Availability */}
                            <div className="flex items-center gap-2.5">
                                <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Availability:</span>
                                <span className={`text-[10px] px-2.5 py-0.5 rounded-none font-bold uppercase tracking-wider ${
                                     product.stock > 0 ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-200" : "bg-red-50 text-red-650"
                                }`}>
                                     {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
                                </span>
                            </div>

                            {/* Size Selector */}
                            <div className="mb-6">
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5">Select Size:</span>
                                <div className="flex gap-2">
                                     {["XS", "S", "M", "L", "XL"].map((sz) => (
                                         <button
                                             key={sz}
                                             onClick={() => setSize(sz)}
                                             className={`w-10 h-10 rounded-none border flex items-center justify-center font-bold text-xs transition-all cursor-pointer ${
                                                 size === sz
                                                     ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
                                                     : "bg-white text-slate-700 border-slate-200 hover:border-slate-400 dark:bg-slate-950 dark:border-slate-850 dark:text-white"
                                             }`}
                                         >
                                            {sz}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Qty Selector & Add to Cart */}
                            {product.stock > 0 && (
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-wrap items-center gap-4">
                                        <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-none overflow-hidden bg-white dark:bg-slate-900">
                                            <button
                                                onClick={() => setQty(Math.max(1, qty - 1))}
                                                className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-950 text-slate-600 dark:text-slate-450 transition-colors font-bold text-lg"
                                            >
                                                -
                                            </button>
                                            <span className="px-4 py-2 font-semibold text-slate-800 dark:text-white w-12 text-center select-none">
                                                {qty}
                                            </span>
                                            <button
                                                onClick={() => setQty(Math.min(product.stock, qty + 1))}
                                                className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-950 text-slate-600 dark:text-slate-450 transition-colors font-bold text-lg"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <Button
                                            onClick={handleAddToCart}
                                            className="bg-black hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 text-white flex-grow md:flex-grow-0 rounded-none px-8 h-11 font-bold cursor-pointer gap-2 text-xs tracking-[0.15em] uppercase transition-all duration-300"
                                        >
                                            <ShoppingCart size={16} /> ADD TO CART
                                        </Button>
                                    </div>

                                    {/* Order via WhatsApp Button */}
                                    <a
                                        href={`https://wa.me/923001234567?text=Hello%2C%20I%20would%20like%20to%20order%2520this%20outfit%20from%20RajMeena%20Couture%3A%0A%0AProduct%3A%20${encodeURIComponent(product.name)}%0ASize%3A%20${size}%0AQuantity%3A%20${qty}%0APrice%3A%20Rs.%20${product.price}%0ALink%3A%20${encodeURIComponent(window.location.href)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full flex items-center justify-center gap-2 border border-slate-900 dark:border-white text-slate-900 dark:text-white hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 font-bold h-11 rounded-none text-xs uppercase tracking-wider cursor-pointer"
                                    >
                                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.729-1.452L0 24zm6.59-4.846c1.6.95 3.197 1.451 4.836 1.452 5.539 0 10.048-4.509 10.05-10.05.002-2.685-1.04-5.21-2.943-7.114-1.902-1.905-4.428-2.953-7.112-2.954-5.545 0-10.056 4.51-10.058 10.051-.001 1.708.448 3.376 1.3 4.862l-1.002 3.662 3.753-.984zm11.758-7.55c-.09-.15-.333-.24-.722-.435-.39-.195-2.301-1.136-2.656-1.266-.356-.13-.615-.195-.877.195-.262.39-.997 1.266-1.223 1.526-.226.26-.453.29-.842.1-.39-.195-1.648-.607-3.136-1.932-1.157-1.03-1.937-2.3-2.164-2.69-.226-.39-.024-.6-.22-.794-.176-.176-.39-.455-.585-.68-.195-.227-.26-.39-.39-.65-.13-.26-.065-.49-.033-.68.033-.195.263-.65.39-.877.13-.227.26-.455.39-.68.13-.227.098-.423.05-.62-.05-.195-.615-1.482-.843-2.03-.222-.53-.448-.458-.615-.466-.16-.007-.34-.01-.52-.01-.18 0-.473.068-.72.34-.248.272-.946.925-.946 2.256 0 1.33.97 2.616 1.105 2.795.137.179 1.907 2.911 4.62 4.08.647.278 1.152.445 1.546.57.65.207 1.242.177 1.708.108.52-.078 1.603-.655 1.828-1.286.226-.63.226-1.17.158-1.286-.068-.117-.31-.208-.703-.403z"/>
                                        </svg>
                                        <span>Order via WhatsApp</span>
                                    </a>
                                </div>
                            )}

                            {/* Outfit Specs Table */}
                            <div className="mt-8 border-t border-slate-150 dark:border-slate-800 pt-6">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-350 mb-3">Outfit Details</h4>
                                <table className="w-full text-xs text-slate-650 dark:text-slate-400 border-collapse">
                                    <tbody>
                                        <tr className="border-b border-slate-100 dark:border-slate-850 py-2 block flex justify-between">
                                            <td className="font-medium text-slate-500">Fabric Type</td>
                                            <td className="text-right font-semibold text-slate-800 dark:text-white">
                                                {product.name.toLowerCase().includes("velvet") ? "Premium Velvet" :
                                                 product.name.toLowerCase().includes("lawn") ? "Pure Breathable Cotton Lawn" :
                                                 product.name.toLowerCase().includes("silk") ? "Raw Cotton Silk" :
                                                 product.name.toLowerCase().includes("organza") ? "Luxury Organza" : "Premium Cotton"}
                                            </td>
                                        </tr>
                                        <tr className="border-b border-slate-100 dark:border-slate-850 py-2 block flex justify-between">
                                            <td className="font-medium text-slate-500">Includes</td>
                                            <td className="text-right font-semibold text-slate-800 dark:text-white">
                                                {product.name.includes("(3-Piece)") ? "Shirt, Dupatta & Trousers" :
                                                 product.name.includes("(2-Piece)") ? "Shirt & Trousers" : "Stitched Kurta / Shirt"}
                                            </td>
                                        </tr>
                                        <tr className="border-b border-slate-100 dark:border-slate-850 py-2 block flex justify-between">
                                            <td className="font-medium text-slate-500">Care Instructions</td>
                                            <td className="text-right font-semibold text-slate-800 dark:text-white">Dry Clean Only / Gentle Handwash</td>
                                        </tr>
                                        <tr className="py-2 block flex justify-between">
                                            <td className="font-medium text-slate-500">Delivery Time</td>
                                            <td className="text-right font-semibold text-slate-800 dark:text-white">3 - 5 Working Days (Pakistan)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Review & Ratings Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Reviews List */}
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-xl font-light font-serif tracking-wider uppercase text-slate-900 dark:text-white mb-6">Customer Reviews</h2>
                        {product.reviews.length === 0 ? (
                            <div className="bg-white dark:bg-slate-900 rounded-none border border-slate-150 dark:border-slate-800 p-8 text-center text-slate-500 text-xs font-light">
                                No reviews yet. Be the first to share your thoughts!
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {product.reviews.map((review) => (
                                    <div key={review._id} className="bg-white dark:bg-slate-900 rounded-none p-6 border border-slate-150 dark:border-slate-800 shadow-3xs">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <h4 className="font-bold text-slate-800">{review.name}</h4>
                                                <span className="text-xs text-slate-400">
                                                    {new Date(review.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <div className="flex text-amber-400">
                                                {[...Array(5)].map((_, idx) => (
                                                    <Star
                                                        key={idx}
                                                        size={14}
                                                        className={idx < review.rating ? "fill-amber-400" : "text-slate-200"}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-sm text-slate-600 leading-relaxed">{review.comment}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Add Review Box */}
                    <div className="bg-white dark:bg-slate-900 rounded-none p-6 border border-slate-150 dark:border-slate-800 shadow-none h-fit">
                        <h3 className="font-serif font-light text-slate-900 dark:text-white text-base uppercase tracking-wider mb-4">Write a Review</h3>
                        {user ? (
                            <form onSubmit={handleReviewSubmit} className="space-y-4 font-sans text-left">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-wider">Rating</label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((num) => (
                                            <button
                                                key={num}
                                                type="button"
                                                onClick={() => setRating(num)}
                                                className="cursor-pointer"
                                            >
                                                <Star
                                                    size={22}
                                                    className={num <= rating ? "fill-amber-500 text-amber-500" : "text-slate-200 dark:text-slate-800"}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-wider">Review Comment</label>
                                    <textarea
                                        rows={4}
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="Share your experience with this outfit..."
                                        className="w-full border border-slate-200 dark:border-slate-850 dark:bg-slate-950 dark:text-white rounded-none p-3 text-xs outline-none focus:border-black dark:focus:border-white"
                                        required
                                    ></textarea>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={submittingReview}
                                    className="w-full bg-black hover:bg-neutral-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 font-bold h-10 rounded-none cursor-pointer gap-2 text-xs tracking-widest uppercase"
                                >
                                    <Send size={14} /> {submittingReview ? "Submitting..." : "POST REVIEW"}
                                </Button>
                            </form>
                        ) : (
                            <div className="text-center p-4">
                                <p className="text-xs text-slate-500 mb-4 font-light">You must be logged in to post reviews.</p>
                                <Link to="/login">
                                    <Button className="w-full bg-black hover:bg-neutral-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 font-bold text-xs rounded-none tracking-widest uppercase h-10">LOGIN</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
