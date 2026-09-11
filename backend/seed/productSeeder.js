import mongoose from 'mongoose';
import Product from '../models/productModel.js';

const ATLAS_URI = "mongodb+srv://ziakhan5720_db_user:iby4149LAInJ2gMJ@cluster0.s62wpdx.mongodb.net/rajmeena?appName=Cluster0";

const products = [
    {
        name: "RajMeena Velvet Luxe (3-Piece)",
        description: "An elegant deep maroon premium velvet shirt adorned with intricate hand-finished embroidery on the neckline, sleeves, and daman. Comes paired with solid matching silk trousers and a detailed embroidered silk dupatta. Dry clean only.",
        price: 8990,
        category: "Luxury Pret",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80",
        stock: 15,
        rating: 4.9,
        numReviews: 0
    },
    {
        name: "Classic Floral Printed Lawn (2-Piece)",
        description: "Soft, breathable, and everyday-perfect premium lawn cotton 2-piece suit. Features digital printed floral patterns, bordered sleeves, and matching straight trousers. Ideal for warm summer afternoons.",
        price: 3490,
        category: "Casual Wear",
        image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&auto=format&fit=crop&q=80",
        stock: 30,
        rating: 4.6,
        numReviews: 0
    },
    {
        name: "Summer Breeze Chiffon (3-Piece)",
        description: "A gorgeous pastel pink ready-to-wear summer ensemble. Complete with detailed white threadwork embroidery, matching cotton silk slip, raw silk trousers, and a soft flowy chiffon dupatta.",
        price: 5490,
        category: "Ready to Wear",
        image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80",
        stock: 22,
        rating: 4.8,
        numReviews: 0
    },
    {
        name: "Emerald Silk Kurta (1-Piece)",
        description: "Pure raw silk emerald green straight kurta featuring premium hand-finished neckline detailing, fabric-wrapped buttons, and fine lace trimming on the borders.",
        price: 4290,
        category: "Ready to Wear",
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80",
        stock: 18,
        rating: 4.7,
        numReviews: 0
    },
    {
        name: "Crimson Bloom Linen (Unstitched)",
        description: "Crimson red linen fabric with embroidery patches for the shirt front. Pair contains 3 meters shirt cloth, 2.5 meters matching trousers fabric, and a digital printed block-pattern shawl dupatta.",
        price: 3990,
        category: "Unstitched",
        image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&auto=format&fit=crop&q=80",
        stock: 25,
        rating: 4.5,
        numReviews: 0
    },
    {
        name: "Pastel Harmony Organza (3-Piece)",
        description: "Premium lavender semi-formal organza shirt decorated with subtle pearl bead embellishments and floral embroideries. Comes with raw silk trousers and a printed monaar dupatta.",
        price: 7490,
        category: "Luxury Pret",
        image: "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=600&auto=format&fit=crop&q=80",
        stock: 12,
        rating: 4.9,
        numReviews: 0
    },
    {
        name: "Indigo Bloom Cambric (2-Piece)",
        description: "Beautifully printed indigo blue cambric cotton shirt styled with modern high-neck collar, paired with white cotton straight trousers. Comfortable for workplace and casual wear.",
        price: 2990,
        category: "Casual Wear",
        image: "https://images.unsplash.com/photo-1561932850-f13404855e53?w=600&auto=format&fit=crop&q=80",
        stock: 40,
        rating: 4.4,
        numReviews: 0
    },
    {
        name: "Gold Dust Jacquard (Unstitched)",
        description: "Unstitched gold jacquard shirt piece with elaborate threadwork details, self-pattern trousers fabric, and a luxury woven gold-stripe dupatta. Perfect for festive and family events.",
        price: 4990,
        category: "Unstitched",
        image: "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=600&auto=format&fit=crop&q=80",
        stock: 20,
        rating: 4.7,
        numReviews: 0
    }
];

export const seedProducts = async (req, res) => {
    try {
        // Connect if not already
        if (mongoose.connection.readyState !== 1) {
            const uri = process.env.MONGO_URI && !process.env.MONGO_URI.includes('localhost')
                ? process.env.MONGO_URI : ATLAS_URI;
            await mongoose.connect(uri, { serverSelectionTimeoutMS: 15000 });
        }

        // Delete existing products to ensure clean seed with new clothing catalog
        await Product.deleteMany({});
        
        await Product.insertMany(products);
        res.json({ success: true, message: `✅ Seeded ${products.length} RajMeena clothing products into Atlas!` });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

