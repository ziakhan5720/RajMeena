import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cartSlice";
import { toast } from "sonner";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const Home = () => {
  const dispatch = useDispatch();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      url: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=85&w=2000&auto=format&fit=crop",
      tag: "FESTIVE COUTURE '26",
      title: "Royal Velvet & Hand Zardozi",
      description: "Artisanal deep maroon tones, delicate gold resham threadwork, and opulent silhouettes crafted for timeless evening grandeur.",
      link: "/products?category=Luxury%20Pret",
      btn: "Explore Luxury Pret"
    },
    {
      url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=85&w=2000&auto=format&fit=crop",
      tag: "SUMMER PRET '26",
      title: "Breathable Swiss Lawn",
      description: "Delicate Chikankari embroidery and airy premium cotton cambric, tailored for effortless grace in warm summer afternoons.",
      link: "/products?category=Summer%20Collection%2026",
      btn: "Shop Summer '26"
    },
    {
      url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=85&w=2000&auto=format&fit=crop",
      tag: "READY TO WEAR EDIT",
      title: "Artisanal Silk & Kaftans",
      description: "Contemporary cuts and flowing drape meeting intricate Pakistani heritage detailing for everyday modern royalty.",
      link: "/products?category=Ready%20to%20Wear",
      btn: "Discover Ready To Wear"
    }
  ];

  const collections = [
    { name: "Summer Collection 26", to: "/products?category=Summer Collection 26", image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=500&auto=format&fit=crop&q=80" },
    { name: "Ready to Wear", to: "/products?category=Ready to Wear", image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=500&auto=format&fit=crop&q=80" },
    { name: "Luxury Pret", to: "/products?category=Luxury Pret", image: "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=500&auto=format&fit=crop&q=80" },
    { name: "Casual Wear", to: "/products?category=Casual Wear", image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500&auto=format&fit=crop&q=80" },
    { name: "Unstitched Sets", to: "/products?category=Unstitched", image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&auto=format&fit=crop&q=80" }
  ];

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(slideTimer);
  }, [slides.length]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const res = await api.get("/product");
        if (res.data.success) {
          // Filter to double check we have only clothing products
          const clothing = res.data.products.filter(p => 
            p.category && ["Ready to Wear", "Luxury Pret", "Casual Wear", "Unstitched", "Summer Collection 26"].includes(p.category)
          );
          setFeaturedProducts(clothing.length > 0 ? clothing.slice(0, 8) : res.data.products.slice(0, 8));
        }
      } catch {
        setFeaturedProducts([
          { _id: "1", name: "RajMeena Velvet Luxe (3-Piece)", price: 8990, category: "Luxury Pret", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&auto=format&fit=crop&q=80", rating: 4.9, numReviews: 12, stock: 15, description: "Elegant deep maroon premium velvet shirt adorned with intricate hand-finished embroidery." },
          { _id: "2", name: "Classic Floral Printed Lawn (2-Piece)", price: 3490, category: "Casual Wear", image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500&auto=format&fit=crop&q=80", rating: 4.6, numReviews: 8, stock: 30, description: "Soft, breathable, and everyday-perfect premium lawn cotton 2-piece suit." },
          { _id: "3", name: "Summer Breeze Chiffon (3-Piece)", price: 5490, category: "Ready to Wear", image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&auto=format&fit=crop&q=80", rating: 4.8, numReviews: 14, stock: 22, description: "A gorgeous pastel pink ready-to-wear summer ensemble with detailed threadwork." },
          { _id: "4", name: "Emerald Silk Kurta (1-Piece)", price: 4290, category: "Ready to Wear", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&auto=format&fit=crop&q=80", rating: 4.7, numReviews: 19, stock: 18, description: "Pure raw silk emerald green straight kurta featuring premium hand-finished neckline detailing." }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedProducts();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({
      product: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: 1,
      stock: product.stock
    }));
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="pt-24 bg-[#FAF9F5] dark:bg-slate-950 min-h-screen">

      {/* 1. HERO IMAGE SLIDER (Full Width Screen Luxury Animation) */}
      <section className="relative w-full h-[82vh] md:h-[92vh] bg-neutral-950 overflow-hidden">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              currentSlide === idx ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Background image with subtle Ken-Burns zoom on active */}
            <img
              src={slide.url}
              alt={slide.title}
              className={`w-full h-full object-cover object-center transition-transform duration-7000 ease-out ${
                currentSlide === idx ? "scale-105" : "scale-100"
              }`}
            />

            {/* Multi-tier luxury dark gradient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/60"></div>
            <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/50"></div>

            {/* Typography & CTA Overlay */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6 max-w-5xl mx-auto">
              {/* Luxury gold badge with pulsing indicator */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 border border-gold/40 bg-black/45 backdrop-blur-md mb-6 shadow-2xl">
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-gold">
                  {slide.tag}
                </span>
              </div>

              {/* Grand Serif Heading */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-light font-serif tracking-[0.14em] uppercase mb-4 leading-[1.1] drop-shadow-md">
                {slide.title}
              </h1>

              {/* Editorial Subtitle */}
              <p className="text-xs md:text-sm text-neutral-200 font-light max-w-xl mx-auto mb-9 tracking-wide leading-relaxed font-sans drop-shadow">
                {slide.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center items-center gap-4">
                <Link to={slide.link}>
                  <Button className="bg-gold hover:bg-white text-black font-bold tracking-[0.25em] text-[11px] uppercase h-12 px-9 rounded-none border border-gold hover:border-white transition-all duration-300 shadow-2xl cursor-pointer hover:scale-105">
                    {slide.btn}
                  </Button>
                </Link>
                <Link to="/products">
                  <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/40 backdrop-blur-md tracking-[0.25em] text-[11px] uppercase h-12 px-8 rounded-none transition-all duration-300 cursor-pointer">
                    View Catalog
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Prev/Next Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 text-white hover:text-gold transition-all duration-300 rounded-none p-3 bg-black/30 hover:bg-black/60 backdrop-blur-sm border border-white/10 hover:border-gold/50 cursor-pointer group"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 text-white hover:text-gold transition-all duration-300 rounded-none p-3 bg-black/30 hover:bg-black/60 backdrop-blur-sm border border-white/10 hover:border-gold/50 cursor-pointer group"
          aria-label="Next slide"
        >
          <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Bottom Slide Counter & Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
          <div className="flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1 transition-all duration-500 cursor-pointer ${
                  currentSlide === idx ? "bg-gold w-10" : "bg-white/30 w-4 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          <span className="text-[10px] text-white/70 font-mono tracking-widest uppercase">
            0{currentSlide + 1} / 0{slides.length}
          </span>
        </div>
      </section>

      {/* 2. ALL COLLECTION SECTION (Shop categories) */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center space-y-2 mb-16">
          <h2 className="text-3xl font-light tracking-wide font-serif text-slate-900 dark:text-white uppercase">
            Shop by Category
          </h2>
          <p className="text-[10px] text-gold font-bold tracking-widest uppercase">
            Curated RajMeena Collections
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-5">
          {collections.map((col, idx) => (
            <Link
              key={idx}
              to={col.to}
              className="group relative h-80 md:h-[380px] overflow-hidden border border-slate-200 dark:border-slate-800/80 bg-white"
            >
              <img
                src={col.image}
                alt={col.name}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
              <div className="absolute bottom-5 left-5 text-left z-10">
                <h3 className="text-white font-bold text-xs tracking-widest uppercase mb-1">
                  {col.name}
                </h3>
                <span className="text-gold text-[10px] tracking-wider uppercase font-semibold underline underline-offset-4 decoration-gold/60 group-hover:text-white transition-colors">
                  Explore
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. FEATURED COLLECTION SECTION (Deals and products) */}
      <section className="py-24 bg-white dark:bg-slate-900 border-y border-slate-200/40 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-2 mb-16">
            <h2 className="text-3xl font-light tracking-wide font-serif text-slate-900 dark:text-white uppercase">
              Featured Outfits
            </h2>
            <p className="text-[10px] text-gold font-bold tracking-widest uppercase">
              Top Picks & Hot Deals
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse bg-slate-50 border border-slate-200 rounded-none h-96" />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.slice(0, 8).map((p) => (
                  <div
                    key={p._id}
                    className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/85 rounded-none overflow-hidden flex flex-col h-full hover:shadow-2xs transition-shadow duration-300"
                  >
                    <Link to={`/product/${p._id}`} className="relative block bg-slate-50 dark:bg-slate-950 overflow-hidden h-68 border-b border-slate-100">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                      />
                      {p.stock === 0 && (
                        <span className="absolute top-3 right-3 bg-red-650 text-white text-[9px] px-2.5 py-0.5 font-bold uppercase tracking-wider rounded-none">
                          Sold Out
                        </span>
                      )}
                    </Link>

                    <div className="p-5 flex flex-col flex-grow text-left font-sans">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 block mb-1">
                        {p.category}
                      </span>
                      <Link to={`/product/${p._id}`} className="hover:text-gold transition-colors">
                        <h4 className="font-semibold text-slate-900 dark:text-white text-sm truncate leading-snug">
                          {p.name}
                        </h4>
                      </Link>
                      <div className="flex items-center gap-1 mt-1 mb-3.5">
                        <div className="flex text-amber-500">
                          {[...Array(5)].map((_, idx) => (
                            <Star key={idx} size={10} className={idx < Math.round(p.rating) ? "fill-amber-500 text-amber-500" : "text-slate-200"} />
                          ))}
                        </div>
                        <span className="text-[9px] text-slate-400 font-light ml-0.5">({p.numReviews})</span>
                      </div>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                        <span className="text-sm font-bold text-slate-950 dark:text-white">Rs. {p.price}</span>
                        <Button
                          disabled={p.stock === 0}
                          onClick={() => handleAddToCart(p)}
                          className="bg-black hover:bg-gold text-white hover:text-black h-8 rounded-none px-4 cursor-pointer text-xs font-bold tracking-widest uppercase transition-colors border border-black hover:border-gold"
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* SEE ALL PRODUCTS button under Featured Collection */}
              <div className="flex justify-center mt-14">
                <Link to="/products">
                  <Button className="bg-black hover:bg-gold text-white hover:text-black rounded-none tracking-[0.25em] font-bold text-[10px] uppercase h-12 px-12 border border-black hover:border-gold cursor-pointer shadow-3xs transition-all duration-300">
                    See All Products
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* 4. CURATED BY INFLUENCERS / Join the ranks of the fashion elite */}
      <section className="py-24 max-w-7xl mx-auto px-6 font-sans">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-left md:pr-8">
            <div className="flex items-center gap-3">
              <span className="block w-6 h-[1px] bg-gold" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold">Curated by Influencers</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-light font-serif leading-tight tracking-wide text-slate-900 dark:text-white uppercase">
              Join the ranks of the <br />
              <span className="font-normal italic">fashion elite</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light">
              Elevate your everyday wardrobe with garments meticulously designed to merge luxury pret detailing with comfortable, breezy summer silhouettes. Experience the best of Pakistani styling selected by trendsetting fashion voices.
            </p>
            <div className="pt-2">
              <Link to="/products?category=Luxury%20Pret">
                <Button className="bg-black hover:bg-gold text-white hover:text-black rounded-none tracking-[0.15em] font-bold text-[10px] uppercase h-11 px-8 cursor-pointer border border-black hover:border-gold transition-colors duration-300">
                  Explore Lookbook
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="border border-slate-200 dark:border-slate-800 p-1.5 bg-white dark:bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=400&auto=format&fit=crop&q=80"
                  alt="Influencer style selection"
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="border border-slate-200 dark:border-slate-800 p-1.5 bg-white dark:bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&auto=format&fit=crop&q=80"
                  alt="Influencer styling set"
                  className="w-full h-44 object-cover"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="border border-slate-200 dark:border-slate-800 p-1.5 bg-white dark:bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=400&auto=format&fit=crop&q=80"
                  alt="Boutique pret collection"
                  className="w-full h-44 object-cover"
                />
              </div>
              <div className="border border-slate-200 dark:border-slate-800 p-1.5 bg-white dark:bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&auto=format&fit=crop&q=80"
                  alt="Embroidered boutique details"
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Sticky WhatsApp Floating Badge */}
      <a
        href="https://wa.me/923001234567?text=Hi%20RajMeena%20Couture%2C%20I%20would%20like%20to%20inquire%20about%20your%20latest%20outfits."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20ba59] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center cursor-pointer"
        aria-label="Order via WhatsApp"
      >
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.729-1.452L0 24zm6.59-4.846c1.6.95 3.197 1.451 4.836 1.452 5.539 0 10.048-4.509 10.05-10.05.002-2.685-1.04-5.21-2.943-7.114-1.902-1.905-4.428-2.953-7.112-2.954-5.545 0-10.056 4.51-10.058 10.051-.001 1.708.448 3.376 1.3 4.862l-1.002 3.662 3.753-.984zm11.758-7.55c-.09-.15-.333-.24-.722-.435-.39-.195-2.301-1.136-2.656-1.266-.356-.13-.615-.195-.877.195-.262.39-.997 1.266-1.223 1.526-.226.26-.453.29-.842.1-.39-.195-1.648-.607-3.136-1.932-1.157-1.03-1.937-2.3-2.164-2.69-.226-.39-.024-.6-.22-.794-.176-.176-.39-.455-.585-.68-.195-.227-.26-.39-.39-.65-.13-.26-.065-.49-.033-.68.033-.195.263-.65.39-.877.13-.227.26-.455.39-.68.13-.227.098-.423.05-.62-.05-.195-.615-1.482-.843-2.03-.222-.53-.448-.458-.615-.466-.16-.007-.34-.01-.52-.01-.18 0-.473.068-.72.34-.248.272-.946.925-.946 2.256 0 1.33.97 2.616 1.105 2.795.137.179 1.907 2.911 4.62 4.08.647.278 1.152.445 1.546.57.65.207 1.242.177 1.708.108.52-.078 1.603-.655 1.828-1.286.226-.63.226-1.17.158-1.286-.068-.117-.31-.208-.703-.403z"/>
        </svg>
      </a>

    </div>
  );
};

export default Home;
