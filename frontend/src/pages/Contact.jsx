import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            toast.success("Thank you for contacting RajMeena! We will respond within 24 hours.");
            setFormData({ name: "", email: "", subject: "", message: "" });
        }, 1200);
    };

    return (
        <div className="pt-28 pb-16 bg-[#FCFCFC] dark:bg-slate-950 min-h-screen font-sans text-slate-900 dark:text-white">
            <div className="max-w-5xl mx-auto px-6 space-y-12">
                
                {/* Header */}
                <div className="text-center space-y-4 max-w-lg mx-auto">
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">Get in Touch</span>
                    <h1 className="text-3xl font-light font-serif uppercase tracking-wider text-slate-900 dark:text-white">How Can We Help You?</h1>
                    <p className="text-slate-500 text-xs font-light leading-relaxed">
                        Got a question about our clothing collections, sizing guides, exchanges, or shipping speeds? Drop us a note!
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* Left: Contact Info Cards */}
                    <div className="md:col-span-1 space-y-4">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-none border border-slate-150 dark:border-slate-800 shadow-none flex items-center gap-4 text-left">
                            <div className="w-10 h-10 rounded-none bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white flex items-center justify-center flex-shrink-0 border border-slate-200 dark:border-slate-700">
                                <Mail size={18} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-850 dark:text-white text-xs uppercase tracking-wider">Email Us</h4>
                                <p className="text-xs text-slate-400 font-light mt-0.5">support@rajmeena.com</p>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-900 p-6 rounded-none border border-slate-150 dark:border-slate-800 shadow-none flex items-center gap-4 text-left">
                            <div className="w-10 h-10 rounded-none bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white flex items-center justify-center flex-shrink-0 border border-slate-200 dark:border-slate-700">
                                <Phone size={18} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-855 dark:text-white text-xs uppercase tracking-wider">Call Support</h4>
                                <p className="text-xs text-slate-400 font-light mt-0.5">+92 (300) 123-4567</p>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-900 p-6 rounded-none border border-slate-150 dark:border-slate-800 shadow-none flex items-center gap-4 text-left">
                            <div className="w-10 h-10 rounded-none bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white flex items-center justify-center flex-shrink-0 border border-slate-200 dark:border-slate-700">
                                <MapPin size={18} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-855 dark:text-white text-xs uppercase tracking-wider">Our Boutique</h4>
                                <p className="text-xs text-slate-400 font-light mt-0.5">Gulberg Galleria Mall, Lahore</p>
                            </div>
                        </div>

                        {/* Mock Interactive Map Placeholder */}
                        <div className="relative rounded-none overflow-hidden border border-slate-150 dark:border-slate-800 h-44 shadow-none group">
                            <img
                                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&auto=format&fit=crop&q=80"
                                alt="Map location placeholder"
                                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                                <span className="bg-white/95 text-slate-900 text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-none shadow-md backdrop-blur-xs flex items-center gap-1.5 border border-slate-200">
                                    <ShieldCheck size={12} className="text-slate-800" /> View Map Location
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Contact Form */}
                    <div className="md:col-span-2 bg-white dark:bg-slate-900 rounded-none p-6 md:p-8 border border-slate-150 dark:border-slate-800 shadow-none text-left">
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-1.5">
                                    <Label htmlFor="name" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Full Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="Full Name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="focus:border-black rounded-none border-slate-200"
                                        required
                                    />
                                </div>
                                <div className="grid gap-1.5">
                                    <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Email Address</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="focus:border-black rounded-none border-slate-200"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid gap-1.5">
                                <Label htmlFor="subject" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Subject</Label>
                                <Input
                                    id="subject"
                                    name="subject"
                                    placeholder="Inquiry subject..."
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    className="focus:border-black rounded-none border-slate-200"
                                    required
                                />
                            </div>

                            <div className="grid gap-1.5">
                                <Label htmlFor="message" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Message</Label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    placeholder="Write your details or questions here..."
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    className="w-full border border-slate-200 dark:border-slate-850 dark:bg-slate-950 dark:text-white rounded-none p-3 text-xs focus:border-black outline-none"
                                    required
                                ></textarea>
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-black hover:bg-neutral-800 text-white font-bold h-11 rounded-none cursor-pointer gap-2 mt-4 text-xs tracking-widest uppercase"
                            >
                                <Send size={14} /> {loading ? "Sending..." : "Send Message"}
                            </Button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Contact;
