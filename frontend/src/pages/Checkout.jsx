import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "@/redux/cartSlice";
import { useNavigate, Link } from "react-router-dom";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CreditCard, ShieldCheck } from "lucide-react";

const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);

    // Pre-populate with user shipping details if exist
    const [shippingDetails, setShippingDetails] = useState({
        address: user?.address || "",
        city: user?.city || "",
        zipCode: user?.zipCode || "",
        phoneNo: user?.phoneNo || ""
    });

    const [cardDetails, setCardDetails] = useState({
        cardholderName: "",
        cardNumber: "",
        expiry: "",
        cvv: ""
    });

    const [loading, setLoading] = useState(false);

    const handleShippingChange = (e) => {
        setShippingDetails({
            ...shippingDetails,
            [e.target.name]: e.target.value
        });
    };

    const handleCardChange = (e) => {
        setCardDetails({
            ...cardDetails,
            [e.target.name]: e.target.value
        });
    };

    // Calculate Prices
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const shippingPrice = itemsPrice === 0 || itemsPrice > 3000 ? 0 : 250;
    const taxPrice = Math.round(0.05 * itemsPrice);
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const handleSubmitOrder = async (e) => {
        e.preventDefault();

        // Validations
        if (!shippingDetails.address || !shippingDetails.city || !shippingDetails.zipCode || !shippingDetails.phoneNo) {
            toast.error("Please fill in all shipping details");
            return;
        }

        if (!cardDetails.cardholderName || !cardDetails.cardNumber || !cardDetails.expiry || !cardDetails.cvv) {
            toast.error("Please fill in all card details for mock payment verification");
            return;
        }

        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            toast.error("Your session has expired. Please log in again");
            navigate("/login");
            return;
        }

        try {
            setLoading(true);
            const orderPayload = {
                orderItems: cartItems,
                shippingAddress: shippingDetails,
                paymentMethod: "Card",
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice
            };

            const res = await api.post("/order", orderPayload, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            });

            if (res.data.success) {
                toast.success("Payment authorized! Order placed successfully.");
                dispatch(clearCart());
                navigate(`/order/${res.data.order._id}`);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to place order");
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="pt-28 pb-16 min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 text-center px-6 font-sans">
                <h2 className="text-2xl font-light font-serif tracking-wider uppercase text-slate-800 dark:text-white mb-2">Checkout is Empty</h2>
                <p className="text-slate-405 mb-6 text-xs font-light">You have no items in your cart to checkout.</p>
                <Link to="/products">
                    <Button className="bg-black hover:bg-neutral-850 text-white rounded-none tracking-widest text-xs uppercase font-bold px-8 h-11">Shop Products</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-28 pb-16 min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
            <div className="max-w-6xl mx-auto px-6">
                <h1 className="text-3xl font-light font-serif text-slate-900 dark:text-white mb-8 uppercase tracking-wider text-left">Checkout</h1>

                <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left & Middle: Forms */}
                    <div className="lg:col-span-2 space-y-6">
                        
                        {/* Shipping Details */}
                        <div className="bg-white dark:bg-slate-900 rounded-none p-6 md:p-8 border border-slate-150 dark:border-slate-850 shadow-none space-y-4 text-left">
                            <h2 className="text-lg font-light font-serif uppercase tracking-wider text-slate-900 dark:text-white mb-2">Shipping Address</h2>
                            
                            <div className="grid gap-2">
                                <Label htmlFor="address" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Address</Label>
                                <Input
                                    id="address"
                                    name="address"
                                    placeholder="Apartment, suite, unit, building, street, etc."
                                    value={shippingDetails.address}
                                    onChange={handleShippingChange}
                                    className="rounded-none border-slate-200 focus:border-black"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="city" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">City</Label>
                                    <Input
                                        id="city"
                                        name="city"
                                        placeholder="City name"
                                        value={shippingDetails.city}
                                        onChange={handleShippingChange}
                                        className="rounded-none border-slate-200 focus:border-black"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="zipCode" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Zip Code</Label>
                                    <Input
                                        id="zipCode"
                                        name="zipCode"
                                        placeholder="Zip/Postal code"
                                        value={shippingDetails.zipCode}
                                        onChange={handleShippingChange}
                                        className="rounded-none border-slate-200 focus:border-black"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="phoneNo" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Phone Number</Label>
                                <Input
                                    id="phoneNo"
                                    name="phoneNo"
                                    placeholder="+92 (300) 123-4567"
                                    value={shippingDetails.phoneNo}
                                    onChange={handleShippingChange}
                                    className="rounded-none border-slate-200 focus:border-black"
                                    required
                                />
                            </div>
                        </div>

                        {/* Mock Payment Details */}
                        <div className="bg-white dark:bg-slate-900 rounded-none p-6 md:p-8 border border-slate-150 dark:border-slate-850 shadow-none space-y-4 text-left">
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-lg font-light font-serif uppercase tracking-wider text-slate-900 dark:text-white">Mock Payment Card</h2>
                                <span className="flex items-center gap-1.5 text-[9px] text-slate-700 dark:text-slate-300 font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-none uppercase tracking-wider">
                                    <ShieldCheck size={12} /> Secure Sandbox
                                </span>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="cardholderName" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Cardholder Name</Label>
                                <Input
                                    id="cardholderName"
                                    name="cardholderName"
                                    placeholder="Full Name"
                                    value={cardDetails.cardholderName}
                                    onChange={handleCardChange}
                                    className="rounded-none border-slate-200 focus:border-black"
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="cardNumber" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Card Number</Label>
                                <div className="relative">
                                    <Input
                                        id="cardNumber"
                                        name="cardNumber"
                                        placeholder="4111 2222 3333 4444"
                                        maxLength={19}
                                        value={cardDetails.cardNumber}
                                        onChange={handleCardChange}
                                        className="rounded-none border-slate-200 focus:border-black pr-10"
                                        required
                                    />
                                    <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="expiry" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Expiry Date</Label>
                                    <Input
                                        id="expiry"
                                        name="expiry"
                                        placeholder="MM/YY"
                                        maxLength={5}
                                        value={cardDetails.expiry}
                                        onChange={handleCardChange}
                                        className="rounded-none border-slate-200 focus:border-black"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="cvv" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">CVV</Label>
                                    <Input
                                        id="cvv"
                                        name="cvv"
                                        type="password"
                                        placeholder="123"
                                        maxLength={4}
                                        value={cardDetails.cvv}
                                        onChange={handleCardChange}
                                        className="rounded-none border-slate-200 focus:border-black"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Order Summary Checkout Sidebar */}
                    <div className="bg-white dark:bg-slate-900 rounded-none p-6 border border-slate-150 dark:border-slate-800 shadow-none h-fit space-y-6 text-left">
                        <h3 className="font-serif font-light text-slate-900 dark:text-white text-base uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-4">
                            Review Items
                        </h3>

                        {/* Mini cart items list */}
                        <div className="max-h-60 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 pr-1">
                            {cartItems.map((item) => (
                                <div key={item.product} className="flex gap-3 py-3 items-center">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-12 h-12 object-cover rounded-none border border-slate-150 dark:border-slate-850 bg-slate-50 flex-shrink-0"
                                    />
                                    <div className="min-w-0 flex-grow">
                                        <h4 className="text-xs font-semibold text-slate-850 dark:text-slate-200 truncate uppercase tracking-wider">{item.name}</h4>
                                        <div className="flex gap-2 text-[10px] text-slate-400 mt-0.5">
                                            <span>Size: {item.size || "M"}</span>
                                            <span>Qty: {item.qty}</span>
                                        </div>
                                    </div>
                                    <span className="text-xs font-bold text-slate-900 dark:text-white">Rs. {item.price * item.qty}</span>
                                </div>
                            ))}
                        </div>

                        <hr className="border-slate-150 dark:border-slate-800" />

                        <div className="space-y-3.5 text-xs">
                            <div className="flex justify-between text-slate-500">
                                <span>Subtotal</span>
                                <span className="font-semibold text-slate-850 dark:text-white">Rs. {itemsPrice}</span>
                            </div>
                            <div className="flex justify-between text-slate-500">
                                <span>Shipping</span>
                                <span className="font-semibold text-slate-855 dark:text-white">
                                    {shippingPrice === 0 ? "FREE" : `Rs. ${shippingPrice}`}
                                </span>
                            </div>
                            <div className="flex justify-between text-slate-500">
                                <span>Tax (GST 5%)</span>
                                <span className="font-semibold text-slate-850 dark:text-white">Rs. {taxPrice}</span>
                            </div>
                            <hr className="border-slate-150 dark:border-slate-800" />
                            <div className="flex justify-between text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                                <span>Total Price</span>
                                <span className="text-base font-bold">Rs. {totalPrice}</span>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black hover:bg-neutral-850 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 font-bold h-12 rounded-none cursor-pointer tracking-widest text-xs uppercase"
                        >
                            {loading ? "Placing Order..." : `Place Order (Rs. ${totalPrice})`}
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Checkout;
