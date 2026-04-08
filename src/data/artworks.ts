export interface Artwork {
  id: number;
  title: string;
  artist: string;
  year: string;
  category: string;
  image: string;
  price?: string;
  rating?: number;
  featured?: boolean;
}

export interface Artist {
  id: number;
  name: string;
  bio: string;
  specialty: string;
  image: string;
  works: number;
}

export interface ShopItem {
  id: number;
  title: string;
  price: string;
  originalPrice?: string;
  image: string;
  rating: number;
  category: string;
  badge?: "Sale" | "Sold";
}

export const artworks: Artwork[] = [
  { id: 1, title: "Golden Hour", artist: "Elena Vasquez", year: "2024", category: "Oil on Canvas", image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&q=75", price: "$4,200" },
  { id: 2, title: "Silent Waters", artist: "Marcus Chen", year: "2023", category: "Watercolor", image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=75", price: "$2,800" },
  { id: 3, title: "Urban Fragments", artist: "Aisha Nkosi", year: "2024", category: "Mixed Media", image: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&q=75", price: "$6,500" },
  { id: 4, title: "Reverie", artist: "Elena Vasquez", year: "2023", category: "Oil on Canvas", image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=75", price: "$5,100" },
  { id: 5, title: "Dusk Geometry", artist: "Luca Ferretti", year: "2024", category: "Acrylic", image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&q=75", price: "$3,400" },
  { id: 6, title: "The Quiet Room", artist: "Marcus Chen", year: "2024", category: "Photography", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=75", price: "$1,900" },
];

export const featuredArtworks: Artwork[] = [
  { id: 7, title: "Eternal Bloom", artist: "Elena Vasquez", year: "2024", category: "Oil on Canvas", image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=1200&q=75", price: "$12,000", featured: true },
  { id: 8, title: "Midnight Sonata", artist: "Aisha Nkosi", year: "2024", category: "Mixed Media", image: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=1200&q=75", price: "$8,500", featured: true },
  { id: 9, title: "Solstice", artist: "Luca Ferretti", year: "2023", category: "Acrylic", image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=1200&q=75", price: "$7,200", featured: true },
];

export const artists: Artist[] = [
  { id: 1, name: "Elena Vasquez", bio: "Madrid-born painter exploring light and emotion through oil.", specialty: "Oil on Canvas", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=75", works: 24 },
  { id: 2, name: "Marcus Chen", bio: "Shanghai-based artist blending Eastern philosophy with Western form.", specialty: "Watercolor & Photography", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=75", works: 18 },
  { id: 3, name: "Aisha Nkosi", bio: "Lagos-born mixed media artist challenging perception and identity.", specialty: "Mixed Media", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=75", works: 31 },
  { id: 4, name: "Luca Ferretti", bio: "Florentine painter with a modern take on classical geometry.", specialty: "Acrylic & Sculpture", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=75", works: 15 },
];

export const shopItems: ShopItem[] = [
  { id: 1, title: "Brochure",    price: "15$",  image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=75",  rating: 0, category: "Books" },
  { id: 2, title: "Small Rug",   price: "57$",  image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=75",  rating: 0, category: "Accessories" },
  { id: 3, title: "Sculpture",   price: "25$",  originalPrice: "30$", image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=75", rating: 0, category: "Objects", badge: "Sale" },
  { id: 4, title: "Mug",         price: "9$",   image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&q=75", rating: 0, category: "Objects", badge: "Sold" },
  { id: 5, title: "Linen Bag",   price: "29$",  image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=75", rating: 0, category: "Accessories" },
  { id: 6, title: "Art Print",   price: "45$",  image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=75", rating: 0, category: "Prints" },
  { id: 7, title: "Musea Book",  price: "17$",  image: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&q=75",  rating: 0, category: "Books" },
  { id: 8, title: "Winslow Bag", price: "17$",  image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=600&q=75",  rating: 2, category: "Accessories" },
];
