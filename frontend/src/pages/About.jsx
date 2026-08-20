import React from "react";
import { Sparkles, Heart, Shield } from "lucide-react";

const About = () => {
    const values = [
        { title: "Artisanal Craftsmanship", text: "We curate outfits with hand-finished embroidery, delicate laces, and authentic embellishments from Pakistan's premium artisans.", icon: <Sparkles className="text-slate-900 dark:text-white" size={22} />, bg: "bg-neutral-100 dark:bg-slate-800" },
        { title: "Breatheable Fabrics", text: "We select only the highest grade lawn, premium velvet, cotton cambric, and pure organza to keep you comfortable and stylish.", icon: <Heart className="text-slate-900 dark:text-white" size={22} />, bg: "bg-neutral-100 dark:bg-slate-800" },
        { title: "Accessible Luxury", text: "Our ready-to-wear collections are designed to give you premium designer aesthetics and flawless fit at competitive rates.", icon: <Shield className="text-slate-900 dark:text-white" size={22} />, bg: "bg-neutral-100 dark:bg-slate-800" }
    ];

    const team = [
        { name: "Meena Raj", role: "Founder & Creative Director", avatar: "MR", desc: "A couture designer with 10+ years of passion in modernizing ethnic wear." },
        { name: "Rizwan Shahani", role: "Co-Founder & CEO", avatar: "RS", desc: "Coordinates operations, logistics, and boutique partnerships." },
        { name: "Sana Khan", role: "Lead Stylist", avatar: "SK", desc: "Drives visual shoots, seasonal color boards, and customer style guides." }
    ];

    return (
        <div className="pt-28 pb-16 bg-[#FCFCFC] dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white font-sans">
            <div className="max-w-5xl mx-auto px-6 space-y-16">
                
                {/* Hero / Vision Statement */}
                <div className="text-center space-y-4 max-w-2xl mx-auto">
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">OUR HERITAGE</span>
                    <h1 className="text-4xl font-light tracking-wide text-slate-900 dark:text-white leading-tight font-serif uppercase">
                        Crafting Timeless Grace <br />
                        <span className="italic font-normal">For the Modern Woman</span>
                    </h1>
                    <p className="text-slate-500 text-xs leading-relaxed font-light max-w-lg mx-auto">
                        At Pezwaan, we believe that clothing is an expression of grace. We curate elegant ready-to-wear, luxury pret, unstitched fabric sets, and everyday casual suits designed to fit your unique lifestyle with confidence and effortless style.
                    </p>
                </div>

                {/* Company Values Grid */}
                <div className="space-y-8">
                    <h2 className="text-2xl font-light text-slate-900 dark:text-white text-center font-serif uppercase tracking-wide">Our Core Pillars</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {values.map((v) => (
                            <div key={v.title} className="bg-white dark:bg-slate-900 p-6 rounded-none border border-slate-150 dark:border-slate-800 shadow-none text-left space-y-4">
                                <div className={`w-12 h-12 rounded-none ${v.bg} flex items-center justify-center`}>
                                    {v.icon}
                                </div>
                                <h3 className="font-bold text-slate-800 dark:text-white text-xs uppercase tracking-wider">{v.title}</h3>
                                <p className="text-slate-500 text-xs leading-relaxed font-light">{v.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Brand Story (Divided Section) */}
                <div className="grid md:grid-cols-2 gap-8 items-center bg-white dark:bg-slate-900 p-8 md:p-12 rounded-none border border-slate-150 dark:border-slate-800 shadow-none text-left">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-light text-slate-900 dark:text-white font-serif uppercase tracking-wide">The Pezwaan Story</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed font-light">
                            Pezwaan was founded to bridge the gap in ready-to-wear luxury pret. We saw that customers wanted high-end threadwork, delicate laces, and custom fabrics without the lengthy wait times of traditional custom tailors.
                        </p>
                        <p className="text-slate-550 dark:text-slate-400 text-xs leading-relaxed font-light">
                            From a small workshop setup, we have expanded to serve fashion lovers across Pakistan. Today, we collaborate directly with master craftsmen to ensure that each outfit is stitched with absolute precision and unmatched aesthetic quality.
                        </p>
                    </div>

                    <div className="flex justify-center">
                        <img
                            src="https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=500&auto=format&fit=crop&q=80"
                            alt="Embroidery and fabrics"
                            className="rounded-none w-full h-56 object-cover border border-slate-150 dark:border-slate-800"
                        />
                    </div>
                </div>

                {/* Team Grid */}
                <div className="space-y-8">
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl font-light text-slate-900 dark:text-white font-serif uppercase tracking-wide">Meet the Creators</h2>
                        <p className="text-xs text-slate-400 font-light">The visionaries behind Pezwaan's design catalog and operations</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {team.map((t) => (
                            <div key={t.name} className="bg-white dark:bg-slate-900 p-6 rounded-none border border-slate-150 dark:border-slate-800 shadow-none text-center flex flex-col items-center">
                                <div className="w-14 h-14 rounded-none bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 font-bold flex items-center justify-center mb-4">
                                    {t.avatar}
                                </div>
                                <h4 className="font-semibold text-slate-900 dark:text-white text-sm uppercase tracking-wider">{t.name}</h4>
                                <span className="text-[10px] text-slate-400 font-bold mb-3 uppercase tracking-wider">{t.role}</span>
                                <p className="text-slate-500 text-xs leading-relaxed max-w-[200px] font-light">
                                    {t.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default About;
