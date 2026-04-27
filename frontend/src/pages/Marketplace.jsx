import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function Marketplace() {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState("all");

  const countries = [
    { name: "All", value: "all" },
    { name: "Oromo", value: "Oromo" },
    { name: "Amhara", value: "Amhara" },
    { name: "Tigray", value: "Tigray" },
    { name: "Afar", value: "Afar" },
    { name: "Somali", value: "Somali" },
    { name: "Harari", value: "Harari" },
    { name: "Gurage", value: "Gurage" },
  ];

  useEffect(() => {
    async function fetchProducts() {
      try {
        // const res = await fetch("http://localhost:5001/api/products");
        const res = await fetch("https://booking-production-a1ed.up.railway.app/api/products");
       
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Failed to load products", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = selectedCountry === "all" 
    ? products 
    : products.filter(p => p.country === selectedCountry);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.location.href = "/"}>
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <span className="text-white text-xl">✈</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              MakiTravel
            </span>
          </div>

          <div className="flex items-center gap-3">
            <ModeToggle />
            <Link to="/">
              <Button variant="outline" className="rounded-xl">
                Home
              </Button>
            </Link>
            {token && (
              <Link to="/add-product">
                <Button className="rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white">
                  + Sell Item
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            Ethiopian Cultural Marketplace
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Discover unique handcrafted items from different regions of Ethiopia
          </p>
        </div>

        {/* Filter by Country */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {countries.map((country) => (
              <button
                key={country.value}
                onClick={() => setSelectedCountry(country.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCountry === country.value
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/50"
                }`}
              >
                {country.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-7xl mb-4">🛍️</div>
            <p className="text-gray-600 dark:text-gray-400 text-lg">No products found</p>
            {token && (
              <Link to="/add-product">
                <Button className="mt-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white">
                  Be the first to sell an item
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="rounded-2xl border border-gray-200 dark:border-slate-800 shadow-lg overflow-hidden hover:shadow-xl transition-all">
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={product.image_url || "https://via.placeholder.com/400x300?text=No+Image"} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => e.target.src = "https://via.placeholder.com/400x300?text=No+Image"}
                  />
                  <div className="absolute top-3 right-3 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {product.price}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-white">
                    📍 {product.country || "Ethiopia"}
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-gray-800 dark:text-white">{product.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                    {product.description}
                  </p>
                  <div className="pt-2 border-t border-gray-100 dark:border-slate-800">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Sold by: {product.seller_name}</p>
                    <div className="flex gap-3 mt-2">
                      {product.seller_phone && (
                        <a 
                          href={`tel:${product.seller_phone}`}
                          className="text-xs bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded-full text-emerald-600 hover:bg-emerald-50 transition"
                        >
                          📞 Call
                        </a>
                      )}
                      {product.seller_telegram && (
                        <a 
                          href={`https://t.me/${product.seller_telegram.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded-full text-sky-500 hover:bg-sky-50 transition"
                        >
                          💬 Telegram
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Marketplace;