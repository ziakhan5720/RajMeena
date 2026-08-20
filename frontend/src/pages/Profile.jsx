import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/UserSlice";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { User, ClipboardList, MapPin, Phone, Settings } from "lucide-react";

const Profile = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    
    const [formData, setFormData] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        address: user?.address || "",
        city: user?.city || "",
        zipCode: user?.zipCode || "",
        phoneNo: user?.phoneNo || ""
    });

    const [orders, setOrders] = useState([]);
    const [ordersLoading, setOrdersLoading] = useState(true);
    const [updatingProfile, setUpdatingProfile] = useState(false);
    const [activeTab, setActiveTab] = useState("orders"); // "orders" or "edit"

    const fetchMyOrders = async () => {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) return;

        try {
            setOrdersLoading(true);
            const res = await api.get("/order/myorders", {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            if (res.data.success) {
                setOrders(res.data.orders);
            }
        } catch {
            toast.error("Failed to load orders");
        } finally {
            setOrdersLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchMyOrders();
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    // Sync state when user loads in store
    useEffect(() => {
        if (user) {
            const timer = setTimeout(() => {
                setFormData({
                    firstName: user.firstName || "",
                    lastName: user.lastName || "",
                    address: user.address || "",
                    city: user.city || "",
                    zipCode: user.zipCode || "",
                    phoneNo: user.phoneNo || ""
                });
            }, 0);
            return () => clearTimeout(timer);
        }
    }, [user]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            toast.error("You are logged out");
            return;
        }

        try {
            setUpdatingProfile(true);
            const res = await api.put("/user/update", formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            });

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success("Profile updated successfully!");
                setActiveTab("orders"); // Go back to orders tab
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update profile");
        } finally {
            setUpdatingProfile(false);
        }
    };

    return (
        <div className="pt-28 pb-16 min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
            <div className="max-w-5xl mx-auto px-6">
                
                {/* Profile Header */}
                <div className="bg-white dark:bg-slate-900 rounded-none p-6 md:p-8 border border-slate-150 dark:border-slate-800 shadow-none mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex items-center gap-4 text-left">
                        <div className="w-16 h-16 rounded-none bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-800 dark:text-slate-200 font-bold text-xl border border-slate-205 dark:border-slate-700 shadow-3xs">
                            {user?.firstName?.charAt(0).toUpperCase()}{user?.lastName?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h1 className="text-2xl font-light font-serif text-slate-900 dark:text-white tracking-wide uppercase">{user?.firstName} {user?.lastName}</h1>
                            <p className="text-xs text-slate-400 font-light">{user?.email}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold px-3 py-1.5 rounded-none uppercase tracking-wider">
                            Role: {user?.role}
                        </span>
                        {user?.role === "admin" && (
                            <Link to="/admin">
                                <Button className="bg-black hover:bg-neutral-800 text-white rounded-none text-xs font-bold px-4 h-9 cursor-pointer gap-1.5 tracking-wider uppercase">
                                    <Settings size={14} /> Admin Dashboard
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Profile Tabs Navigation */}
                <div className="flex gap-4 border-b border-slate-200 dark:border-slate-800 mb-8 pb-px">
                    <button
                        onClick={() => setActiveTab("orders")}
                        className={`pb-4 px-2 font-bold text-xs uppercase tracking-wider transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                            activeTab === "orders"
                                ? "border-black text-black dark:border-white dark:text-white"
                                : "border-transparent text-slate-400 hover:text-slate-600"
                        }`}
                    >
                        <ClipboardList size={14} /> My Orders
                    </button>
                    <button
                        onClick={() => setActiveTab("edit")}
                        className={`pb-4 px-2 font-bold text-xs uppercase tracking-wider transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                            activeTab === "edit"
                                ? "border-black text-black dark:border-white dark:text-white"
                                : "border-transparent text-slate-400 hover:text-slate-600"
                        }`}
                    >
                        <User size={14} /> Edit Profile Info
                    </button>
                </div>

                {/* Tab Contents */}
                {activeTab === "orders" && (
                    <div className="space-y-6">
                        {ordersLoading ? (
                            <div className="text-center py-12">
                                <div className="animate-spin rounded-none h-10 w-10 border-t-2 border-b-2 border-black dark:border-white mx-auto"></div>
                            </div>
                        ) : orders.length === 0 ? (
                            <div className="bg-white dark:bg-slate-900 rounded-none p-10 border border-slate-150 dark:border-slate-800 text-center text-slate-500 font-light text-xs">
                                You haven't placed any orders yet.
                                <div className="mt-4">
                                    <Link to="/products">
                                        <Button className="bg-black hover:bg-neutral-800 text-white rounded-none font-bold tracking-widest text-xs uppercase">Browse Catalog</Button>
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {orders.map((order) => (
                                    <div
                                        key={order._id}
                                        className="bg-white dark:bg-slate-900 rounded-none p-5 md:p-6 border border-slate-150 dark:border-slate-800 shadow-none flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-left"
                                    >
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-3">
                                                <span className="text-[10px] font-mono font-bold text-slate-400">#{order._id}</span>
                                                <span className="text-slate-200 dark:text-slate-800">|</span>
                                                <span className="text-xs text-slate-400 font-light">
                                                    {new Date(order.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                            
                                            {/* Order items preview string */}
                                            <p className="text-sm font-semibold text-slate-805 dark:text-white line-clamp-1 max-w-md uppercase tracking-wider">
                                                {order.orderItems.map((item) => `${item.qty}x ${item.name}`).join(", ")}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between w-full md:w-auto md:justify-end gap-6 border-t md:border-t-0 border-slate-100 dark:border-slate-800 pt-3 md:pt-0 mt-3 md:mt-0">
                                            <div className="text-left md:text-right">
                                                <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Total</span>
                                                <span className="text-sm font-bold text-slate-900 dark:text-white">Rs. {order.totalPrice}</span>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <span className={`text-[10px] px-2.5 py-0.5 rounded-none font-bold uppercase tracking-wider ${
                                                    order.status === "Delivered"
                                                        ? "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200"
                                                        : order.status === "Cancelled"
                                                        ? "bg-red-50 text-red-750 dark:bg-red-950/20 dark:text-red-400"
                                                        : "bg-slate-100 text-slate-900 dark:bg-slate-850 dark:text-slate-200"
                                                }`}>
                                                    {order.status}
                                                </span>

                                                <Link to={`/order/${order._id}`}>
                                                    <Button variant="outline" className="text-xs border-slate-200 dark:border-slate-800 text-slate-650 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-950 rounded-none cursor-pointer font-bold tracking-wider uppercase">
                                                        View Details
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "edit" && (
                    <div className="bg-white dark:bg-slate-900 rounded-none p-6 md:p-8 border border-slate-150 dark:border-slate-800 shadow-none text-left">
                        <h2 className="text-lg font-light font-serif uppercase tracking-wider text-slate-900 dark:text-white mb-6">Profile Settings</h2>
                        
                        <form onSubmit={handleProfileSubmit} className="space-y-6">
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="firstName" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">First Name</Label>
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="rounded-none border-slate-200 focus:border-black"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="lastName" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="rounded-none border-slate-200 focus:border-black"
                                        required
                                    />
                                </div>
                            </div>

                            <hr className="border-slate-150 dark:border-slate-800" />

                            <div className="space-y-4">
                                <h3 className="font-serif font-light text-slate-900 dark:text-white text-sm uppercase tracking-wider flex items-center gap-2">
                                    <MapPin size={16} className="text-slate-400" /> Shipping Destination Info
                                </h3>

                                <div className="grid gap-2">
                                    <Label htmlFor="address" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Address</Label>
                                    <Input
                                        id="address"
                                        name="address"
                                        placeholder="123 Street Name"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="rounded-none border-slate-200 focus:border-black"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="city" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">City</Label>
                                        <Input
                                            id="city"
                                            name="city"
                                            placeholder="Lahore"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className="rounded-none border-slate-200 focus:border-black"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="zipCode" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Zip Code</Label>
                                        <Input
                                            id="zipCode"
                                            name="zipCode"
                                            placeholder="54000"
                                            value={formData.zipCode}
                                            onChange={handleInputChange}
                                            className="rounded-none border-slate-200 focus:border-black"
                                        />
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="phoneNo" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Phone Number</Label>
                                    <Input
                                        id="phoneNo"
                                        name="phoneNo"
                                        placeholder="+92 (300) 123-4567"
                                        value={formData.phoneNo}
                                        onChange={handleInputChange}
                                        className="rounded-none border-slate-200 focus:border-black"
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={updatingProfile}
                                className="bg-black hover:bg-neutral-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 rounded-none font-bold h-11 px-8 cursor-pointer w-full md:w-auto tracking-widest text-xs uppercase"
                            >
                                {updatingProfile ? "Updating..." : "Save Changes"}
                            </Button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
