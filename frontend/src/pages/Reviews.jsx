import { useState, useEffect } from "react";
import { Star, Quote, MessageSquarePlus } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";

const allReviews = [
  {
    id: 1,
    name: "Aisha Malik",
    location: "Lahore, Pakistan",
    rating: 5,
    date: "August 2026",
    title: "Absolutely Regal",
    body: "The Velvet Luxe three-piece is everything I dreamed of. The embroidery is flawless and the fabric drapes like a dream. Received so many compliments at my cousin's wedding. RajMeena truly delivers royalty.",
    avatar: "AM",
    verified: true,
    product: "Royal Velvet Luxe (3-Piece)"
  },
  {
    id: 2,
    name: "Fatima Noor",
    location: "Karachi, Pakistan",
    rating: 5,
    date: "July 2026",
    title: "Worth Every Rupee",
    body: "I ordered the Summer Breeze Chiffon and it exceeded my expectations. The stitching is immaculate, the colour is exactly as shown, and delivery was swift. Will be ordering again very soon!",
    avatar: "FN",
    verified: true,
    product: "Summer Breeze Chiffon (3-Piece)"
  },
  {
    id: 3,
    name: "Sara Hussain",
    location: "Islamabad, Pakistan",
    rating: 5,
    date: "August 2026",
    title: "Best Boutique Online",
    body: "I have shopped from many online stores but RajMeena stands apart. Premium quality fabric, beautiful packaging, and the customer service was incredibly helpful. The Emerald Silk Kurta is my new favourite!",
    avatar: "SH",
    verified: true,
    product: "Emerald Silk Kurta (1-Piece)"
  },
  {
    id: 4,
    name: "Maryam Khan",
    location: "Faisalabad, Pakistan",
    rating: 4,
    date: "June 2026",
    title: "Beautiful Lawn Collection",
    body: "The Classic Floral Printed Lawn is gorgeous in person — the colours pop beautifully and the fabric is super soft. Slightly longer delivery than expected, but the quality made up for it completely.",
    avatar: "MK",
    verified: true,
    product: "Classic Floral Printed Lawn (2-Piece)"
  },
  {
    id: 5,
    name: "Hina Rashid",
    location: "Multan, Pakistan",
    rating: 5,
    date: "July 2026",
    title: "Luxury Pret at Its Finest",
    body: "Never expected online shopping to feel this premium. The fabric quality, the hand-finished embroidery, and the attention to detail on every stitch — this is what sets RajMeena apart from every other brand.",
    avatar: "HR",
    verified: true,
    product: "Luxury Pret Collection"
  },
  {
    id: 6,
    name: "Zainab Ali",
    location: "Peshawar, Pakistan",
    rating: 5,
    date: "August 2026",
    title: "Perfect Eid Gift",
    body: "Bought this as an Eid gift for my mother and she absolutely loves it. The packaging was elegant and the outfit itself is stunning. RajMeena has a new loyal customer!",
    avatar: "ZA",
    verified: true,
    product: "Ready to Wear Collection"
  }
];

const StarRow = ({ rating }) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={14}
        className={i < rating ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}
      />
    ))}
  </div>
);

const ReviewCard = ({ review, featured = false }) => (
  <div
    className={`flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 relative ${
      featured ? "shadow-lg" : "hover:shadow-md transition-shadow duration-300"
    }`}
  >
    {/* Gold quote mark */}
    <Quote size={32} className="text-gold/25 absolute top-6 right-6" />

    {/* Stars */}
    <StarRow rating={review.rating} />

    {/* Title */}
    <h3 className="mt-4 font-serif text-lg font-semibold text-slate-900 dark:text-white tracking-wide">
      "{review.title}"
    </h3>

    {/* Body */}
    <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light flex-grow">
      {review.body}
    </p>

    {/* Product tag */}
    <span className="mt-5 inline-block text-[10px] font-bold uppercase tracking-widest text-gold border border-gold/30 px-2 py-0.5 w-fit">
      {review.product}
    </span>

    {/* Divider */}
    <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/60 to-amber-700/60 flex items-center justify-center text-white font-bold text-sm shrink-0">
        {review.avatar}
      </div>
      <div>
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">{review.name}</p>
          {review.verified && (
            <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-1.5 py-0.5">
              ✓ Verified
            </span>
          )}
        </div>
        <p className="text-[11px] text-slate-400">{review.location} · {review.date}</p>
      </div>
    </div>
  </div>
);

const WriteReviewModal = ({ onClose }) => {
  const user = useSelector((s) => s.user?.user);
  const [form, setForm] = useState({ rating: 5, title: "", body: "", product: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(onClose, 2000);
  };

  if (!user) {
    return (
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-10 max-w-md w-full text-center">
          <h2 className="font-serif text-2xl font-light uppercase tracking-widest text-slate-900 dark:text-white mb-4">
            Sign In Required
          </h2>
          <p className="text-sm text-slate-500 mb-6">Please log in to leave a review.</p>
          <div className="flex gap-3 justify-center">
            <Link to="/login">
              <Button className="bg-black text-white hover:bg-gold hover:text-black rounded-none px-8 h-11 font-bold text-xs uppercase tracking-widest border border-black hover:border-gold transition-all">
                Login
              </Button>
            </Link>
            <Button onClick={onClose} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-none px-6 h-11 text-xs uppercase tracking-widest hover:bg-slate-50 transition-all">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-8 max-w-lg w-full">
        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
              <Star size={28} className="fill-emerald-500 text-emerald-500" />
            </div>
            <h2 className="font-serif text-2xl font-light uppercase tracking-widest text-slate-900 dark:text-white mb-2">
              Thank You!
            </h2>
            <p className="text-sm text-slate-500">Your review has been submitted for approval.</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-xl font-light uppercase tracking-widest text-slate-900 dark:text-white">
                Write a Review
              </h2>
              <button onClick={onClose} className="text-slate-400 hover:text-slate-900 dark:hover:text-white text-2xl leading-none cursor-pointer">&times;</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Rating */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block mb-2">Rating</label>
                <div className="flex gap-1.5">
                  {[1,2,3,4,5].map(n => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setForm(f => ({...f, rating: n}))}
                      className="cursor-pointer"
                    >
                      <Star
                        size={22}
                        className={n <= form.rating ? "fill-amber-400 text-amber-400" : "text-slate-300"}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block mb-1.5">Product Name</label>
                <input
                  required
                  value={form.product}
                  onChange={e => setForm(f => ({...f, product: e.target.value}))}
                  placeholder="e.g. Royal Velvet Luxe (3-Piece)"
                  className="w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-gold"
                />
              </div>

              {/* Title */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block mb-1.5">Review Title</label>
                <input
                  required
                  value={form.title}
                  onChange={e => setForm(f => ({...f, title: e.target.value}))}
                  placeholder="Summarise your experience..."
                  className="w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-gold"
                />
              </div>

              {/* Body */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block mb-1.5">Your Review</label>
                <textarea
                  required
                  rows={4}
                  value={form.body}
                  onChange={e => setForm(f => ({...f, body: e.target.value}))}
                  placeholder="Tell us about your experience with quality, fit, delivery..."
                  className="w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-gold resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="submit" className="flex-1 bg-black hover:bg-gold text-white hover:text-black rounded-none h-11 font-bold text-xs uppercase tracking-widest border border-black hover:border-gold transition-all cursor-pointer">
                  Submit Review
                </Button>
                <Button type="button" onClick={onClose} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 rounded-none h-11 px-5 text-xs uppercase tracking-widest hover:bg-slate-50 transition-all cursor-pointer">
                  Cancel
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

const Reviews = () => {
  const [searchParams] = useSearchParams();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (searchParams.get("write") === "true") {
      setShowModal(true);
    }
  }, [searchParams]);

  const avgRating = (allReviews.reduce((a, r) => a + r.rating, 0) / allReviews.length).toFixed(1);

  return (
    <div className="pt-24 bg-[#FAF9F5] dark:bg-slate-950 min-h-screen">

      {/* Hero Banner */}
      <section className="py-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Customer Stories</span>
          <h1 className="text-4xl md:text-5xl font-light font-serif tracking-wide text-slate-900 dark:text-white uppercase">
            What Our Clients Say
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto font-light leading-relaxed">
            Authentic voices from women who wear RajMeena and experience the difference of artisanal luxury.
          </p>

          {/* Overall Rating */}
          <div className="flex flex-col items-center gap-2 pt-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{avgRating} <span className="text-sm font-light text-slate-400">/ 5</span></p>
            <p className="text-xs text-slate-400 uppercase tracking-widest">Based on {allReviews.length} Verified Reviews</p>
          </div>

          {/* Write Review Button */}
          <div className="pt-4">
            <Button
              onClick={() => setShowModal(true)}
              className="bg-black hover:bg-gold text-white hover:text-black rounded-none h-12 px-10 font-bold text-xs uppercase tracking-[0.25em] border border-black hover:border-gold transition-all duration-300 cursor-pointer inline-flex items-center gap-2.5"
            >
              <MessageSquarePlus size={15} />
              Write a Review
            </Button>
          </div>
        </div>
      </section>

      {/* All Reviews Grid */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allReviews.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="text-center space-y-4">
          <p className="text-xs font-bold uppercase tracking-widest text-gold">Loved Your Purchase?</p>
          <h2 className="text-2xl font-light font-serif tracking-wide text-slate-900 dark:text-white uppercase">Share Your Experience</h2>
          <Button
            onClick={() => setShowModal(true)}
            className="bg-black hover:bg-gold text-white hover:text-black rounded-none h-11 px-10 font-bold text-xs uppercase tracking-[0.25em] border border-black hover:border-gold transition-all duration-300 cursor-pointer inline-flex items-center gap-2"
          >
            <MessageSquarePlus size={14} />
            Write a Review
          </Button>
        </div>
      </section>

      {showModal && <WriteReviewModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Reviews;
