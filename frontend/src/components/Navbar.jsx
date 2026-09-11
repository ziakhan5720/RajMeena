import { ShoppingCart, ShieldAlert, LogOut, User, Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import api from "@/lib/api";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/UserSlice";
import { useState, useEffect } from "react";

const Navbar = () => {
  const { user } = useSelector(store => store.user);
  const { cartItems } = useSelector(store => store.cart);
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [announcementIdx, setAnnouncementIdx] = useState(0);

  const announcements = [
    "Free Shipping Nationwide on Orders Over Rs. 3,000",
    "Flat 25% Off Luxury Pret Collections",
    "Cash on Delivery Available Nationwide"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIdx((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logoutHandler = async () => {
    try {
      const res = await api.post(`/user/logout`, {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      if (res.data.success || res.status === 200) {
        dispatch(setUser(null));
        localStorage.removeItem("accessToken");
        toast.success(res.data.message || "Logged out successfully");
        navigate('/');
      }
    } catch (error) {
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || "Failed to log out");
      dispatch(setUser(null));
      localStorage.removeItem("accessToken");
      navigate('/');
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Outfits", path: "/products" },
    { name: "Reviews", path: "/reviews" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "FAQ", path: "/faq" },
  ];

  return (
    <header 
      className="fixed top-0 w-full z-50 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900 transition-all duration-300 shadow-3xs"
    >
      {/* Announcement Bar */}
      <div className="bg-black text-white py-2 px-4 text-center border-b border-neutral-900 overflow-hidden font-sans">
        <p className="text-[9px] uppercase tracking-[0.25em] font-bold transition-all duration-500 animate-pulse">
          {announcements[announcementIdx]}
        </p>
      </div>

      <div className={`max-w-7xl mx-auto flex justify-between items-center px-6 md:px-8 transition-all duration-300 ${
        isScrolled ? "py-2" : "py-3.5"
      }`}>
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 group">
          <img 
            src="/logo.png" 
            alt="RajMeena Logo" 
            className="h-10 md:h-12 w-auto object-contain dark:invert transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center">
          <ul className="flex gap-7 items-center text-xs uppercase tracking-widest font-medium text-slate-600 dark:text-slate-350">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={link.name} className="relative py-1">
                  <Link 
                    to={link.path} 
                    className={`hover:text-black dark:hover:text-white transition-colors duration-250 ${
                      isActive ? "text-black dark:text-white font-semibold" : ""
                    }`}
                  >
                    {link.name}
                  </Link>
                  {/* Subtle underline for active link */}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-black dark:bg-white"></span>
                  )}
                </li>
              );
            })}

            {user && (
              <li className="relative py-1">
                <Link 
                  to="/profile" 
                  className={`hover:text-black dark:hover:text-white transition-colors duration-250 flex items-center gap-1.5 ${
                    location.pathname === "/profile" ? "text-black dark:text-white font-semibold" : ""
                  }`}
                >
                  <User size={13} />
                  <span>Hello, {user.firstName}</span>
                </Link>
                {location.pathname === "/profile" && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-black dark:bg-white"></span>
                )}
              </li>
            )}

            {user && user.role === "admin" && (
              <li>
                <Link 
                  to="/admin" 
                  className="text-slate-900 dark:text-white hover:text-slate-700 transition-colors flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-none text-[10px] font-bold tracking-wider"
                >
                  <ShieldAlert size={12} /> Admin Panel
                </Link>
              </li>
            )}
          </ul>

          <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800"></div>

          {/* Cart Icon & Auth Buttons */}
          <div className="flex items-center gap-6">
            <Link 
              to="/cart" 
              className="relative text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white transition-colors p-1.5 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-none"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="bg-black dark:bg-white text-white dark:text-black rounded-none absolute -top-1.5 -right-1.5 min-w-5 h-5 flex items-center justify-center px-1 text-[10px] font-black border-2 border-white dark:border-slate-950">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <Button 
                onClick={logoutHandler} 
                variant="ghost"
                className="hover:text-red-650 text-slate-750 dark:text-slate-350 hover:bg-red-50 dark:hover:bg-red-950/30 font-semibold tracking-wider cursor-pointer rounded-none text-xs gap-1.5 h-9"
              >
                <LogOut size={14} />
                LOG OUT
              </Button>
            ) : (
              <Link to="/login">
                <Button className="bg-black hover:bg-neutral-850 dark:bg-white dark:text-black dark:hover:bg-neutral-200 text-white cursor-pointer rounded-none font-bold tracking-widest text-xs h-9 px-4.5 shadow-none">
                  LOG IN
                </Button>
              </Link>
            )}
          </div>
        </nav>

        {/* Mobile menu toggle & Cart */}
        <div className="flex items-center gap-4 md:hidden">
          <Link 
            to="/cart" 
            className="relative text-slate-700 dark:text-slate-350 p-1.5 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-none"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="bg-black text-white rounded-none absolute -top-1 -right-1 min-w-4.5 h-4.5 flex items-center justify-center text-[9px] font-bold">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-slate-700 dark:text-slate-300 p-1 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-none outline-none"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900 shadow-md py-4 px-6 animate-in slide-in-from-top-5 duration-200">
          <ul className="flex flex-col gap-4 text-xs tracking-wider uppercase font-semibold text-slate-700 dark:text-slate-300">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-1 hover:text-black dark:hover:text-white ${
                    location.pathname === link.path ? "text-black dark:text-white font-bold" : ""
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}

            {user && (
              <li>
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-1 hover:text-black dark:hover:text-white flex items-center gap-2 ${
                    location.pathname === "/profile" ? "text-black dark:text-white font-bold" : ""
                  }`}
                >
                  <User size={16} />
                  Profile ({user.firstName})
                </Link>
              </li>
            )}

            {user && user.role === "admin" && (
              <li>
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-slate-900 dark:text-white py-1 flex items-center gap-1.5 font-bold"
                >
                  <ShieldAlert size={16} /> Admin Panel
                </Link>
              </li>
            )}

            <li className="pt-2 border-t border-slate-100 dark:border-slate-900">
              {user ? (
                <Button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logoutHandler();
                  }}
                  className="w-full bg-red-50 text-red-600 hover:bg-red-105 font-bold h-10 rounded-none"
                >
                  Log out
                </Button>
              ) : (
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-black text-white font-bold h-10 rounded-none tracking-widest text-xs uppercase">
                    Log in
                  </Button>
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
