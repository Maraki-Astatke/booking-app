import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function AddProduct() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
    country: "",
    seller_phone: "",
    seller_telegram: ""
  });

  const countries = [
    { value: "Oromo", label: "Oromo Region" },
    { value: "Amhara", label: "Amhara Region" },
    { value: "Tigray", label: "Tigray Region" },
    { value: "Afar", label: "Afar Region" },
    { value: "Somali", label: "Somali Region" },
    { value: "Harari", label: "Harari Region" },
    { value: "Sidama", label: "Sidama Region" },
    { value: "Gurage", label: "Gurage Zone" },
    { value: "Other", label: "Other" }
  ];

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // const response = await fetch("http://localhost:5001/api/products" 
      const response = await fetch("https://yeshi-app-backend.vercel.app/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price)
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add product");
      }

      setSuccess("Product submitted successfully! Waiting for admin approval.");
      setTimeout(() => {
        navigate("/marketplace");
      }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

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
            <Link to="/marketplace">
              <Button variant="outline" className="rounded-xl">
                ← Back to Marketplace
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-8">
        <Card className="rounded-2xl border border-gray-200 dark:border-slate-800 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-500 px-6 py-4">
            <CardTitle className="text-white text-2xl flex items-center gap-2">
              <span>🛍️</span> Sell Your Item
            </CardTitle>
          </div>
          <CardContent className="p-6">
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
              List your handmade or cultural item for sale. Your listing will be reviewed by an admin before appearing in the marketplace.
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-xl text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-xl text-sm">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Item Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Handmade Oromo Bracelet"
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="3"
                  placeholder="Describe your item, materials used, size, etc."
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-800 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Price (brr) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    step="0.01"
                    min="0"
                    placeholder="e.g., 29.99"
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Region *
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-800 dark:text-white"
                  >
                    <option value="">Select Region</option>
                    {countries.map(c => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-800 dark:text-white"
                />
                <p className="text-xs text-gray-500 mt-1">Upload an image to a free hosting site like Imgur and paste the URL here</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone Number (optional)
                  </label>
                  <input
                    type="tel"
                    name="seller_phone"
                    value={formData.seller_phone}
                    onChange={handleChange}
                    placeholder="+251 91 234 5678"
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Telegram Username (optional)
                  </label>
                  <input
                    type="text"
                    name="seller_telegram"
                    value={formData.seller_telegram}
                    onChange={handleChange}
                    placeholder="@username"
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-800 dark:text-white"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white hover:shadow-lg transition-all py-3"
              >
                {loading ? "Submitting..." : "Submit for Approval"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default AddProduct;