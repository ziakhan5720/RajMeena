import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CreditCard, Package, Truck, CheckCircle2, ArrowLeft } from "lucide-react";

const OrderDetails = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchOrderDetails = async () => {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            toast.error("Please login to view order details");
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const res = await api.get(`/order/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            if (res.data.success) {
                setOrder(res.data.order);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to load order details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchOrderDetails();
        }, 0);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if (loading) {
        return (
            <div className="pt-28 pb-16 min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
                <div className="animate-spin rounded-none h-12 w-12 border-t-2 border-b-2 border-black dark:border-white"></div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="pt-28 pb-16 min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-955 text-center px-6 font-sans">
                <h2 className="text-2xl font-light font-serif tracking-wider uppercase text-slate-800 dark:text-white mb-2">Order Not Found</h2>
                <p className="text-slate-400 mb-6 text-xs font-light">The requested order could not be located or verified.</p>
                <Link to="/products">
                    <Button className="bg-black hover:bg-neutral-800 text-white rounded-none tracking-widest text-xs uppercase font-bold">Back to Shop</Button>
                </Link>
            </div>
        );
    }

    // Progress bar calculations based on status
    const statusSteps = ["Pending", "Processing", "Shipped", "Delivered"];
    const currentStatusIndex = statusSteps.indexOf(order.status);

    const getStatusIcon = (status) => {
        switch (status) {
            case "Pending":
                return <Package className="text-slate-700 dark:text-slate-300" size={24} />;
            case "Processing":
                return <CreditCard className="text-slate-700 dark:text-slate-300" size={24} />;
            case "Shipped":
                return <Truck className="text-slate-700 dark:text-slate-300" size={24} />;
            case "Delivered":
                return <CheckCircle2 className="text-slate-700 dark:text-slate-300" size={24} />;
            default:
                return <Package className="text-slate-500" size={24} />;
        }
    };

    return (
        <div className="pt-28 pb-16 min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
            <div className="max-w-4xl mx-auto px-6">
                
                {/* Back Link */}
                <Link to="/profile" className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-slate-500 hover:text-black dark:hover:text-white mb-8 transition-colors">
                    <ArrowLeft size={14} /> Back to Profile
                </Link>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 text-left">
                    <div>
                        <h1 className="text-3xl font-light font-serif text-slate-900 dark:text-white uppercase tracking-wider">Order Details</h1>
                        <p className="text-[10px] font-mono text-slate-400 mt-1">ID: #{order._id}</p>
                    </div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Date: {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                </div>

                {/* Progress Status Bar */}
                {order.status !== "Cancelled" && (
                    <div className="bg-white dark:bg-slate-900 rounded-none p-6 md:p-8 border border-slate-150 dark:border-slate-800 shadow-none mb-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            {statusSteps.map((step, idx) => {
                                const isCompleted = idx <= currentStatusIndex;
                                const isCurrent = idx === currentStatusIndex;

                                return (
                                    <div key={step} className="flex flex-col items-center flex-1 relative w-full">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300 ${
                                            isCompleted
                                                ? "bg-black border-black text-white dark:bg-white dark:border-white dark:text-black"
                                                : "bg-white border-slate-200 text-slate-400 dark:bg-slate-900 dark:border-slate-800"
                                        } ${isCurrent ? "ring-4 ring-slate-100 dark:ring-slate-800" : ""}`}>
                                            {isCompleted ? "✓" : idx + 1}
                                        </div>
                                        <span className={`text-[10px] font-bold uppercase tracking-wider mt-2.5 ${isCompleted ? "text-slate-900 dark:text-slate-200" : "text-slate-400"}`}>
                                            {step}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {order.status === "Cancelled" && (
                    <div className="bg-red-50 text-red-750 dark:bg-red-950/20 dark:text-red-400 rounded-none p-6 border border-red-100 dark:border-red-900/50 font-bold text-center text-sm uppercase tracking-wider mb-8">
                        ❌ This Order has been Cancelled
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* Items and Shipment details */}
                    <div className="md:col-span-2 space-y-6">
                        
                        {/* Order Items */}
                        <div className="bg-white dark:bg-slate-900 rounded-none p-6 border border-slate-150 dark:border-slate-800 shadow-none text-left">
                            <h2 className="text-base font-light font-serif text-slate-900 dark:text-white uppercase tracking-wider mb-4">Purchased Items</h2>
                            <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                {order.orderItems.map((item) => (
                                    <div key={item.product} className="flex gap-4 py-4 items-center">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded-none bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 flex-shrink-0"
                                        />
                                        <div className="min-w-0 flex-grow">
                                            <h3 className="font-semibold text-slate-800 dark:text-white text-sm truncate uppercase tracking-wider">{item.name}</h3>
                                            <div className="flex gap-2 text-xs text-slate-400 mt-1 font-light">
                                                <span>Size: {item.size || "M"}</span>
                                                <span>Qty: {item.qty} × Rs. {item.price}</span>
                                            </div>
                                        </div>
                                        <span className="font-bold text-slate-900 dark:text-white text-sm">Rs. {item.price * item.qty}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="bg-white dark:bg-slate-900 rounded-none p-6 border border-slate-150 dark:border-slate-800 shadow-none text-left">
                            <h2 className="text-base font-light font-serif text-slate-900 dark:text-white uppercase tracking-wider mb-4">Shipment Details</h2>
                            <div className="space-y-2 text-xs text-slate-650 dark:text-slate-400 font-light">
                                <p><span className="font-semibold text-slate-500 uppercase tracking-wider mr-1">Receiver Name:</span> {order.user.firstName} {order.user.lastName}</p>
                                <p><span className="font-semibold text-slate-500 uppercase tracking-wider mr-1">Email Address:</span> {order.user.email}</p>
                                <p><span className="font-semibold text-slate-500 uppercase tracking-wider mr-1">Address:</span> {order.shippingAddress.address}</p>
                                <p><span className="font-semibold text-slate-500 uppercase tracking-wider mr-1">City & Zip:</span> {order.shippingAddress.city}, {order.shippingAddress.zipCode}</p>
                                <p><span className="font-semibold text-slate-500 uppercase tracking-wider mr-1">Phone No:</span> {order.shippingAddress.phoneNo}</p>
                            </div>
                        </div>
                    </div>

                    {/* Invoice Pricing Sidebar */}
                    <div className="space-y-6 text-left">
                        
                        {/* Status/Payment */}
                        <div className="bg-white dark:bg-slate-900 rounded-none p-6 border border-slate-150 dark:border-slate-800 shadow-none space-y-4">
                            <div className="flex gap-3 items-center">
                                <div className="p-2 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-none">
                                    {getStatusIcon(order.status)}
                                </div>
                                <div>
                                    <h4 className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Order Status</h4>
                                    <span className="font-bold text-slate-800 dark:text-white text-xs uppercase tracking-wider">{order.status}</span>
                                </div>
                            </div>

                            <hr className="border-slate-150 dark:border-slate-800" />

                            <div className="flex gap-3 items-center">
                                <div className="p-2 bg-slate-50 dark:bg-slate-955 border border-slate-100 dark:border-slate-850 rounded-none">
                                    <CheckCircle2 className="text-slate-800 dark:text-white" size={24} />
                                </div>
                                <div>
                                    <h4 className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Payment Status</h4>
                                    <span className="font-bold text-slate-900 dark:text-white text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-none uppercase tracking-wider">
                                        PAID via {order.paymentMethod}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Invoice Summary */}
                        <div className="bg-white dark:bg-slate-900 rounded-none p-6 border border-slate-150 dark:border-slate-800 shadow-none space-y-4">
                            <h3 className="font-serif font-light text-slate-900 dark:text-white text-sm uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-3">
                                Invoice Summary
                            </h3>
                            <div className="space-y-2 text-xs">
                                <div className="flex justify-between text-slate-500">
                                    <span>Subtotal</span>
                                    <span className="font-semibold text-slate-800 dark:text-white">Rs. {order.itemsPrice}</span>
                                </div>
                                <div className="flex justify-between text-slate-500">
                                    <span>Shipping</span>
                                    <span className="font-semibold text-slate-800 dark:text-white">
                                        {order.shippingPrice === 0 ? "FREE" : `Rs. ${order.shippingPrice}`}
                                    </span>
                                </div>
                                <div className="flex justify-between text-slate-500">
                                    <span>Tax (GST 5%)</span>
                                    <span className="font-semibold text-slate-800 dark:text-white">Rs. {order.taxPrice}</span>
                                </div>
                                <hr className="border-slate-150 dark:border-slate-800" />
                                <div className="flex justify-between text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                                    <span>Invoice Total</span>
                                    <span className="font-bold">Rs. {order.totalPrice}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
