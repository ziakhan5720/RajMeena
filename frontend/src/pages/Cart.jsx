import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity } from "@/redux/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);

    const handleQtyChange = (product, qty, stock) => {
        if (qty < 1 || qty > stock) return;
        dispatch(updateQuantity({ product, qty }));
    };

    const handleRemove = (product, name) => {
        dispatch(removeFromCart(product));
        toast.error(`${name} removed from cart`);
    };

    // Calculate Prices
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const shippingPrice = itemsPrice === 0 || itemsPrice > 3000 ? 0 : 250;
    const taxPrice = Math.round(0.05 * itemsPrice);
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const handleCheckout = () => {
        if (!user) {
            toast.warning("Please log in to proceed with checkout");
            navigate("/login?redirect=checkout");
        } else {
            navigate("/checkout");
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="pt-28 pb-16 min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 text-center px-6 font-sans">
                <div className="w-16 h-16 bg-neutral-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-900 dark:text-white mb-6">
                    <ShoppingBag size={28} />
                </div>
                <h2 className="text-2xl font-light font-serif tracking-wider uppercase text-slate-800 dark:text-white mb-2">Your Cart is Empty</h2>
                <p className="text-slate-400 mb-8 max-w-xs text-xs font-light">Looks like you haven't added any outfits to your cart yet.</p>
                <Link to="/products">
                    <Button className="bg-black hover:bg-neutral-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 rounded-none px-8 h-11 font-bold tracking-widest text-xs uppercase">
                        Browse Catalog
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-28 pb-16 min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
            <div className="max-w-6xl mx-auto px-6">
                <h1 className="text-3xl font-light font-serif text-slate-900 dark:text-white mb-8 uppercase tracking-wider text-left">Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Cart Items List */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <div
                                key={item.product}
                                className="bg-white dark:bg-slate-900 rounded-none p-4 border border-slate-150 dark:border-slate-800 flex items-center gap-4 shadow-none"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-20 h-20 object-cover rounded-none bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 flex-shrink-0"
                                />

                                <div className="flex-grow min-w-0 text-left">
                                    <Link
                                        to={`/product/${item.product}`}
                                        className="font-semibold text-slate-800 dark:text-white hover:text-slate-500 transition-colors truncate block text-sm uppercase tracking-wider"
                                    >
                                        {item.name}
                                    </Link>
                                    <span className="text-xs text-slate-400 block mt-1 font-light">Size: {item.size || "M"}</span>
                                    <span className="text-sm font-bold text-slate-950 dark:text-white block mt-1">Rs. {item.price}</span>
                                </div>

                                {/* Qty picker */}
                                <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-none overflow-hidden flex-shrink-0 bg-white dark:bg-slate-900">
                                    <button
                                        onClick={() => handleQtyChange(item.product, item.qty - 1, item.stock)}
                                        className="px-2.5 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-950 text-slate-650 dark:text-slate-400 font-bold"
                                    >
                                        -
                                    </button>
                                    <span className="px-3 font-semibold text-slate-800 dark:text-white text-sm select-none">
                                        {item.qty}
                                    </span>
                                    <button
                                        onClick={() => handleQtyChange(item.product, item.qty + 1, item.stock)}
                                        className="px-2.5 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-955 text-slate-650 dark:text-slate-400 font-bold"
                                    >
                                        +
                                    </button>
                                </div>

                                <button
                                    onClick={() => handleRemove(item.product, item.name)}
                                    className="text-slate-400 hover:text-red-500 p-2 rounded-none transition-colors flex-shrink-0 cursor-pointer"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary Card */}
                    <div className="bg-white dark:bg-slate-900 rounded-none p-6 border border-slate-150 dark:border-slate-800 shadow-none h-fit space-y-6">
                        <h3 className="font-serif font-light text-slate-900 dark:text-white text-base uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-4 text-left">
                            Order Summary
                        </h3>

                        <div className="space-y-3.5 text-xs text-left">
                            <div className="flex justify-between text-slate-500">
                                <span>Subtotal</span>
                                <span className="font-semibold text-slate-800 dark:text-white">Rs. {itemsPrice}</span>
                            </div>
                            <div className="flex justify-between text-slate-500">
                                <span>Shipping</span>
                                <span className="font-semibold text-slate-800 dark:text-white">
                                    {shippingPrice === 0 ? "FREE" : `Rs. ${shippingPrice}`}
                                </span>
                            </div>
                            <div className="flex justify-between text-slate-500">
                                <span>Tax (GST 5%)</span>
                                <span className="font-semibold text-slate-800 dark:text-white">Rs. {taxPrice}</span>
                            </div>
                            <hr className="border-slate-100 dark:border-slate-800" />
                            <div className="flex justify-between text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                                <span>Total</span>
                                <span className="text-lg font-bold">Rs. {totalPrice}</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                             <Button
                                onClick={handleCheckout}
                                className="w-full bg-black hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 text-white font-bold h-11 rounded-none cursor-pointer gap-2 tracking-widest text-xs uppercase"
                            >
                                Proceed to Checkout <ArrowRight size={15} />
                            </Button>
                            <Link to="/products" className="block text-center text-[10px] font-bold text-slate-900 dark:text-white hover:text-slate-500 pt-2 uppercase tracking-widest transition-colors">
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
