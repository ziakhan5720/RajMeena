import mongoose from 'mongoose';
import Product from '../models/productModel.js';

const ATLAS_URI = "mongodb+srv://ziakhan5720_db_user:iby4149LAInJ2gMJ@cluster0.s62wpdx.mongodb.net/rajmeena?appName=Cluster0";

export const products = [
    {
        name: "RajMeena Velvet Luxe (3-Piece)",
        description: "An elegant deep maroon premium velvet shirt adorned with intricate hand-finished embroidery on the neckline, sleeves, and daman. Comes paired with solid matching silk trousers and a detailed embroidered silk dupatta. Dry clean only.",
        price: 8990,
        category: "Luxury Pret",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop&q=80",
        stock: 15,
        rating: 4.9,
        numReviews: 24
    },
    {
        name: "Classic Floral Printed Lawn (2-Piece)",
        description: "Soft, breathable, and everyday-perfect premium lawn cotton 2-piece suit. Features digital printed floral patterns, bordered sleeves, and matching straight trousers. Ideal for warm summer afternoons.",
        price: 3490,
        category: "Casual Wear",
        image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&auto=format&fit=crop&q=80",
        stock: 30,
        rating: 4.6,
        numReviews: 18
    },
    {
        name: "Summer Breeze Chiffon (3-Piece)",
        description: "A gorgeous pastel pink ready-to-wear summer ensemble. Complete with detailed white threadwork embroidery, matching cotton silk slip, raw silk trousers, and a soft flowy chiffon dupatta.",
        price: 5490,
        category: "Ready to Wear",
        image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80",
        stock: 22,
        rating: 4.8,
        numReviews: 31
    },
    {
        name: "Emerald Silk Kurta (1-Piece)",
        description: "Pure raw silk emerald green straight kurta featuring premium hand-finished neckline detailing, fabric-wrapped buttons, and fine lace trimming on the borders.",
        price: 4290,
        category: "Ready to Wear",
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80",
        stock: 18,
        rating: 4.7,
        numReviews: 15
    },
    {
        name: "Crimson Bloom Linen (Unstitched)",
        description: "Crimson red linen fabric with embroidery patches for the shirt front. Pair contains 3 meters shirt cloth, 2.5 meters matching trousers fabric, and a digital printed block-pattern shawl dupatta.",
        price: 3990,
        category: "Unstitched",
        image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&auto=format&fit=crop&q=80",
        stock: 25,
        rating: 4.5,
        numReviews: 9
    },
    {
        name: "Pastel Harmony Organza (3-Piece)",
        description: "Premium lavender semi-formal organza shirt decorated with subtle pearl bead embellishments and floral embroideries. Comes with raw silk trousers and a printed monaar dupatta.",
        price: 7490,
        category: "Luxury Pret",
        image: "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=600&auto=format&fit=crop&q=80",
        stock: 12,
        rating: 4.9,
        numReviews: 42
    },
    {
        name: "Indigo Bloom Cambric (2-Piece)",
        description: "Beautifully printed indigo blue cambric cotton shirt styled with modern high-neck collar, paired with white cotton straight trousers. Comfortable for workplace and casual wear.",
        price: 2990,
        category: "Casual Wear",
        image: "https://images.unsplash.com/photo-1561932850-f13404855e53?w=600&auto=format&fit=crop&q=80",
        stock: 40,
        rating: 4.4,
        numReviews: 14
    },
    {
        name: "Gold Dust Jacquard (Unstitched)",
        description: "Unstitched gold jacquard shirt piece with elaborate threadwork details, self-pattern trousers fabric, and a luxury woven gold-stripe dupatta. Perfect for festive and family events.",
        price: 4990,
        category: "Unstitched",
        image: "https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=600&auto=format&fit=crop&q=80",
        stock: 20,
        rating: 4.7,
        numReviews: 11
    },
    {
        name: "Noor-e-Chaman Embroidered Lawn (3-Piece)",
        description: "Breathable Swiss lawn in seafoam green adorned with schiffli chikankari embroidery on front and sleeves, matched with dyed cambric trousers and printed chiffon dupatta.",
        price: 5890,
        category: "Summer Collection 26",
        image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&auto=format&fit=crop&q=80",
        stock: 28,
        rating: 4.9,
        numReviews: 35
    },
    {
        name: "Zari Velvet Festive Formal (3-Piece)",
        description: "Royal black micro-velvet ensemble decorated with hand-embellished zardozi, tilla, and sequins embroidery. Comes with matching velvet shawl and raw silk straight pants.",
        price: 11490,
        category: "Luxury Pret",
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=80",
        stock: 10,
        rating: 5.0,
        numReviews: 19
    },
    {
        name: "Ivory Pearl Silk Tunic (1-Piece)",
        description: "Pure ivory silk tunic styled in modern relaxed A-line silhouette with delicate hand-crafted pearl drops on neckline and cuffs. Wear over denim or formal trousers.",
        price: 3690,
        category: "Ready to Wear",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80",
        stock: 35,
        rating: 4.6,
        numReviews: 8
    },
    {
        name: "Blush Rose Schiffli Cotton (2-Piece)",
        description: "Light blush pink premium cotton suit featuring intricate eyelet schiffli work across the front hemline, styled with loose culottes.",
        price: 3790,
        category: "Casual Wear",
        image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&auto=format&fit=crop&q=80",
        stock: 25,
        rating: 4.7,
        numReviews: 16
    },
    {
        name: "Midnight Shimmer Chiffon (3-Piece)",
        description: "Midnight navy blue flowy chiffon shirt enriched with subtle metallic sequin motifs, finished with silk inner slip, raw silk cigarette pants, and organza dupatta.",
        price: 8490,
        category: "Luxury Pret",
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&auto=format&fit=crop&q=80",
        stock: 14,
        rating: 4.8,
        numReviews: 27
    },
    {
        name: "Gul-e-Rana Block Print Lawn (2-Piece)",
        description: "Traditional mustard yellow block-print lawn shirt paired with contrasting ivory cambric trousers. Breathable, durable, and stylish for daily summer elegance.",
        price: 3190,
        category: "Summer Collection 26",
        image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&auto=format&fit=crop&q=80",
        stock: 32,
        rating: 4.5,
        numReviews: 12
    },
    {
        name: "Saffron Silk Embroidered Kaftan",
        description: "Flattering saffron gold pure crepe silk kaftan with beaded neckline embroidery and side slits. An effortless statement piece for evening dinners.",
        price: 6490,
        category: "Ready to Wear",
        image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop&q=80",
        stock: 16,
        rating: 4.9,
        numReviews: 22
    },
    {
        name: "Opal Whisper Tissue Net (3-Piece)",
        description: "Subtle silver-grey tissue net formal shirt adorned with cutwork embroidery and crystal borders, paired with matching jamawar inner and silk trousers.",
        price: 9990,
        category: "Luxury Pret",
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&auto=format&fit=crop&q=80",
        stock: 8,
        rating: 4.8,
        numReviews: 15
    },
    {
        name: "Dusk Blue Embroidered Cambric (2-Piece)",
        description: "Everyday luxury 2-piece in cool dusk blue cambric cotton, featuring contrast white geometric threadwork on sleeves and collar.",
        price: 3290,
        category: "Casual Wear",
        image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&auto=format&fit=crop&q=80",
        stock: 30,
        rating: 4.6,
        numReviews: 17
    },
    {
        name: "Royal Maroon Karandi (Unstitched)",
        description: "Winter-festive unstitched karandi suit with heavy resham embroidered front, border patches, dyed karandi trousers, and woven wool-blend shawl.",
        price: 5290,
        category: "Unstitched",
        image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=600&auto=format&fit=crop&q=80",
        stock: 20,
        rating: 4.7,
        numReviews: 13
    },
    {
        name: "Sunlit Meadow Printed Lawn (3-Piece)",
        description: "Vibrant lime and floral printed lawn shirt with embroidered neckline patti, paired with digital printed voil dupatta and plain dyed trousers.",
        price: 4490,
        category: "Summer Collection 26",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80",
        stock: 26,
        rating: 4.7,
        numReviews: 20
    },
    {
        name: "Ethereal Mint Raw Silk Kurta Set",
        description: "Mint green raw silk kurta with resham threadwork motifs on daman and sleeves, accompanied by organza bordered straight trousers.",
        price: 5990,
        category: "Ready to Wear",
        image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&auto=format&fit=crop&q=80",
        stock: 19,
        rating: 4.8,
        numReviews: 29
    }
];

export const seedProducts = async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            const uri = process.env.MONGO_URI && !process.env.MONGO_URI.includes('localhost')
                ? process.env.MONGO_URI : ATLAS_URI;
            await mongoose.connect(uri, { serverSelectionTimeoutMS: 15000 });
        }

        await Product.deleteMany({});
        const createdProducts = await Product.insertMany(products);

        if (res) {
            return res.status(200).json({
                success: true,
                message: `Uploaded ${createdProducts.length} RajMeena products into Atlas!`,
                count: createdProducts.length
            });
        }
        console.log(`Uploaded ${createdProducts.length} RajMeena products into Atlas!`);
    } catch (error) {
        console.error("Error seeding products:", error);
        if (res) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }
};
