import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-[#FCFCFC] dark:bg-slate-950 text-slate-900 dark:text-white min-h-[85vh] flex items-center overflow-hidden font-sans border-b border-slate-100 dark:border-slate-900">
      
      {/* Elegant minimalist grid pattern background */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }}
      />

      <div className="max-w-7xl mx-auto px-6 py-12 w-full z-10">
        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* ─── Left Content ─── */}
          <div className="space-y-6 text-left">
            
            {/* Seasonal tagline */}
            <div className="flex items-center gap-3">
              <span className="block w-6 h-[1px] bg-slate-900 dark:bg-white" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">NEW ARRIVALS '26</span>
            </div>

            {/* Editorial Serif Header */}
            <h1 className="text-4xl md:text-6xl font-light tracking-wide text-slate-900 dark:text-white font-serif leading-[1.12]">
              RAJMЕENA <br />
              <span className="font-normal italic">Luxury Pret</span>
            </h1>

            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md leading-relaxed font-light">
              Experience the unmatched luxury of pure breathable cotton lawn, custom embroideries, and delicate hand-finished laces designed to elevate your everyday summer look.
            </p>

            {/* Sharp square buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link to="/products">
                <Button
                  size="lg"
                  className="bg-black hover:bg-neutral-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 px-10 cursor-pointer h-12 rounded-none transition-all duration-300 font-semibold tracking-[0.15em] text-xs uppercase"
                >
                  Shop Now
                </Button>
              </Link>
              <Link to="/products?category=Unstitched">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-neutral-900 hover:bg-neutral-900 hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black text-neutral-900 dark:text-white px-10 cursor-pointer h-12 rounded-none transition-all duration-300 font-semibold tracking-[0.15em] text-xs uppercase"
                >
                  Unstitched Set
                </Button>
              </Link>
            </div>

            {/* Quality assurances */}
            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-slate-100 dark:border-slate-900 max-w-sm">
              {[
                { val: "Free Delivery", label: "On orders above Rs. 3000" },
                { val: "Easy Exchange", label: "7-day exchange window" },
                { val: "100% Premium", label: "Pure breatheable fabrics" },
              ].map((m) => (
                <div key={m.val}>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">{m.val}</h4>
                  <p className="text-[10px] text-slate-405 dark:text-slate-500 font-light mt-1 leading-snug">{m.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ─── Right Content — Elegant Portrait Image ─── */}
          <div className="flex justify-center relative">
            <div className="relative w-full max-w-md group">
              {/* Minimalist image frame with sharp corners */}
              <div className="relative bg-neutral-100 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=600&auto=format&fit=crop&q=80"
                  alt="RajMeena Luxury Pret Collection"
                  className="object-cover w-full h-[520px] transition-transform duration-700 hover:scale-102"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80";
                  }}
                />

                {/* Floating promo label */}
                <div className="absolute bottom-5 left-5 bg-white dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200/80 dark:border-slate-800 px-4 py-2.5 shadow-sm text-center">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Special Offer</p>
                  <p className="text-xs font-bold mt-1 text-slate-900 dark:text-white">FLAT 25% OFF</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;