import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Welcome aboard! Thank you for subscribing to RajMeena.");
    setEmail("");
  };

  const policies = [
    { label: "CUSTOMER REVIEWS", to: "/reviews" },
    { label: "PRIVACY POLICY", to: "/faq" },
    { label: "TERMS & SERVICE", to: "/faq" },
    { label: "EXCHANGE POLICY", to: "/faq" },
    { label: "SHIPPING POLICY", to: "/faq" },
    { label: "CONTACT INFORMATION", to: "/faq" },
  ];

  return (
    <footer className="w-full bg-[#151515] text-slate-400 border-t border-neutral-900 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          {/* About Column */}
          <div className="space-y-4 text-left">
            <h3 className="text-xs font-bold text-white tracking-[0.2em] uppercase">
              About RajMeena
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              RajMeena brings you thoughtfully designed ready-to-wear breathable lawn, hand-finished embroidery, and easy silhouettes made for everyday elegance. Each piece is crafted to feel as good as it looks.
            </p>
          </div>

          {/* Policies Column */}
          <div className="space-y-4 text-left">
            <h3 className="text-xs font-bold text-white tracking-[0.2em] uppercase">
              Policies
            </h3>
            <ul className="space-y-3 pl-0">
              {policies.map((p, idx) => (
                <li key={idx}>
                  <Link 
                    to={p.to} 
                    className="text-xs text-slate-400 hover:text-white transition-colors duration-200 block tracking-wider"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-4 text-left">
            <h3 className="text-xs font-bold text-white tracking-[0.2em] uppercase">
              Contact
            </h3>
            <ul className="space-y-3.5 pl-0 text-xs text-slate-450">
              <li className="flex items-center gap-2">
                <Mail size={13} className="text-white shrink-0" />
                <a href="mailto:support@rajmeena.com" className="hover:text-white transition-colors">
                  support@rajmeena.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={13} className="text-white shrink-0" />
                <a 
                  href="https://wa.me/923159068572" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors"
                >
                  +92 (315) 906-8572
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={13} className="text-white shrink-0 mt-0.5" />
                <span>
                  Gulberg Galleria Mall, Main Boulevard Gulberg, Lahore, Pakistan
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Clock size={13} className="text-white shrink-0" />
                <span>
                  Mon - Sat: 11:00 AM - 9:00 PM PKT · Sun closed
                </span>
              </li>
            </ul>
          </div>

          {/* Subscribe Column */}
          <div className="space-y-4 text-left">
            <h3 className="text-xs font-bold text-white tracking-[0.2em] uppercase">
              Subscribe
            </h3>
            <p className="text-xs text-slate-400 font-light leading-relaxed">
              Stay updated on the latest launches and offers.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2 max-w-sm pt-2">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-850 rounded-none px-4 py-2.5 text-xs focus:border-white outline-none text-white placeholder:text-slate-650"
              />
              <button
                type="submit"
                className="w-full bg-white hover:bg-neutral-200 text-black rounded-none font-bold h-10 cursor-pointer flex items-center justify-center gap-1.5 transition-colors text-xs uppercase tracking-widest"
              >
                <Send size={12} />
                <span>Subscribe</span>
              </button>
            </form>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="mt-16 pt-8 border-t border-neutral-900 flex justify-center text-slate-650 text-xs">
          <p className="text-[11px] tracking-wider text-center">
            &copy; 2026, <a href="/" className="hover:text-white underline">RajMeena</a>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
