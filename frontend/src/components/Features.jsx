import { Headphones, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

const Features = () => {
  const items = [
    {
      icon: <Truck className="h-5 w-5 text-slate-800 dark:text-slate-200" />,
      title: "Complimentary Shipping",
      description: "Free delivery nationwide for all orders over Rs. 3,000",
      bg: "bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850"
    },
    {
      icon: <ShieldCheck className="h-5 w-5 text-slate-800 dark:text-slate-200" />,
      title: "Encrypted Checkouts",
      description: "100% secure mock credit card & CoD payment verification",
      bg: "bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850"
    },
    {
      icon: <Headphones className="h-5 w-5 text-slate-800 dark:text-slate-200" />,
      title: "Boutique Assistance",
      description: "WhatsApp style consulting and sizing helpers online",
      bg: "bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850"
    },
    {
      icon: <RefreshCw className="h-5 w-5 text-slate-800 dark:text-slate-200" />,
      title: "7-Day Exchange Policy",
      description: "Easily exchange sizes or prints within 7 delivery days",
      bg: "bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850"
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-900 font-sans text-left">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, idx) => (
            <div 
              key={idx} 
              className="flex gap-4 p-6 rounded-none bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-none transition-all duration-300 group"
            >
              <div className={`h-10 w-10 rounded-none ${item.bg} flex items-center justify-center shrink-0`}>
                {item.icon}
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-800 dark:text-white text-xs uppercase tracking-wider">
                  {item.title}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
