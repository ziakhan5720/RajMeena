import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

const FAQ = () => {
    const faqData = [
        {
            q: "How long does shipping take?",
            a: "For orders across Pakistan, shipping typically takes 3-5 working days. Shipping is free for all orders over Rs. 3,000. For orders below this threshold, a flat delivery fee of Rs. 250 is applied."
        },
        {
            q: "How do I choose the correct size?",
            a: "We provide size buttons (XS, S, M, L, XL) on each product page. Our outfits conform to standard Pakistani retail measurements. If you are unsure of your size, please click the 'Order via WhatsApp' button on any product details page, and our style assistants will be happy to guide you."
        },
        {
            q: "What payment methods do you support?",
            a: "We support Cash on Delivery (COD) nationwide, making it easy to pay at your doorstep. We also support secure credit/debit card checkouts and direct bank transfers."
        },
        {
            q: "What is your return and exchange policy?",
            a: "We offer a 7-day exchange policy. If your outfit doesn't fit or you'd like to choose a different design, please ensure the tags remain attached, the fabric is unwashed and undamaged, and contact our team at support@rajmeena.com within 7 days of delivery."
        },
        {
            q: "How should I wash and care for my outfits?",
            a: "For luxury velvet, organza, and heavily embroidered pret wear, we strictly recommend dry cleaning only. For printed casual lawn and cambric cotton, we recommend a gentle hand wash in cold water with a mild detergent and ironing on low to medium heat."
        }
    ];

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (idx) => {
        setActiveIndex(activeIndex === idx ? null : idx);
    };

    return (
        <div className="pt-28 pb-16 bg-[#FCFCFC] dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white font-sans">
            <div className="max-w-3xl mx-auto px-6 space-y-12">
                
                {/* Header */}
                <div className="text-center space-y-3">
                    <div className="w-12 h-12 rounded-none bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white flex items-center justify-center mx-auto mb-2 border border-slate-200 dark:border-slate-700">
                        <HelpCircle size={22} />
                    </div>
                    <h1 className="text-3xl font-light font-serif uppercase tracking-wider text-slate-900 dark:text-white">Frequently Asked Questions</h1>
                    <p className="text-slate-500 text-xs max-w-md mx-auto font-light leading-relaxed">
                        Find answers to common queries about sizes, shipping speeds, exchange windows, and garment care.
                    </p>
                </div>

                {/* Accordion List */}
                <div className="space-y-4 text-left">
                    {faqData.map((faq, idx) => {
                        const isOpen = activeIndex === idx;

                        return (
                            <div
                                key={idx}
                                className="bg-white dark:bg-slate-900 rounded-none border border-slate-150 dark:border-slate-800 shadow-none overflow-hidden transition-all duration-300"
                            >
                                <button
                                    onClick={() => toggleFAQ(idx)}
                                    className="w-full text-left p-5 md:p-6 flex justify-between items-center gap-4 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-950/30 transition-colors"
                                >
                                    <span className="font-semibold text-slate-850 dark:text-white text-xs uppercase tracking-wider leading-snug">
                                        {faq.q}
                                    </span>
                                    <span className="text-slate-400 flex-shrink-0">
                                        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    </span>
                                </button>

                                {isOpen && (
                                    <div className="px-5 pb-5 md:px-6 md:pb-6 text-slate-500 dark:text-slate-405 text-xs leading-relaxed border-t border-slate-100 dark:border-slate-850 pt-4 animate-fade-in font-light">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Footer Help Alert */}
                <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-none p-6 text-center space-y-3 shadow-none">
                    <h3 className="font-serif font-light text-slate-900 dark:text-white text-base uppercase tracking-wider">Still have questions?</h3>
                    <p className="text-slate-500 text-xs leading-relaxed max-w-sm mx-auto font-light">
                        Can't find the answer you're looking for? Reach out directly to our customer support desk.
                    </p>
                    <div className="pt-2">
                        <a href="/contact" className="inline-block text-xs font-bold text-white bg-black hover:bg-neutral-800 px-5 py-2.5 rounded-none shadow-none transition-colors tracking-widest uppercase">
                            Contact Support
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default FAQ;
