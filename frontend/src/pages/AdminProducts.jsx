import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function AdminProducts() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Redirect if not admin
    if (user && user.role !== 'admin') {
      navigate('/dashboard');
      return;
    }
    fetchPendingProducts();
  }, [user, navigate]);

  async function fetchPendingProducts() {
    try {
      const response = await fetch("http://localhost:5001/api/products/pending", {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Failed to fetch pending products", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleApprove(productId) {
    try {
      const response = await fetch(`http://localhost:5001/api/products/${productId}/approve`, {
        method: "PUT",
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        setProducts(products.filter(p => p.id !== productId));
        setMessage("Product approved successfully!");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      console.error("Failed to approve product", error);
    }
  }

  async function handleReject(productId) {
    if (!confirm("Are you sure you want to reject this product?")) return;
    
    try {
      const response = await fetch(`http://localhost:5001/api/products/${productId}/reject`, {
        method: "DELETE",
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        setProducts(products.filter(p => p.id !== productId));
        setMessage("Product rejected and removed!");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      console.error("Failed to reject product", error);
    }
  }

  if (user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate("/")}>
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <span className="text-white text-xl">✈</span>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              Admin Panel
            </span>
          </div>

          <div className="flex items-center gap-3">
            <ModeToggle />
            <Link to="/dashboard">
              <Button variant="outline" className="rounded-xl">
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Pending Product Approvals
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Review and approve products submitted by users before they appear in the marketplace
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mt-2"></div>
        </div>

        {message && (
          <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-xl">
            {message}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800">
            <div className="text-7xl mb-4">✅</div>
            <p className="text-gray-600 dark:text-gray-400 text-lg">No pending products to approve</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="rounded-2xl border border-gray-200 dark:border-slate-800 shadow-lg overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4 h-48 md:h-auto overflow-hidden bg-gray-100">
                    <img 
                      src={product.image_url || "https://via.placeholder.com/400x300?text=No+Image"} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => e.target.src = "https://via.placeholder.com/400x300?text=No+Image"}
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white">{product.name}</h2>
                        <p className="text-sm text-gray-500 mt-1">📍 {product.country || "Ethiopia"}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-emerald-600">${product.price}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mt-3">{product.description}</p>
                    
                    <div className="mt-4 p-3 bg-gray-50 dark:bg-slate-800 rounded-xl">
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Seller Information:</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Name: {product.seller_name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Email: {product.seller_email}</p>
                      {product.seller_phone && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">Phone: {product.seller_phone}</p>
                      )}
                      {product.seller_telegram && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">Telegram: {product.seller_telegram}</p>
                      )}
                    </div>
                    
                    <div className="flex gap-3 mt-4">
                      <Button 
                        onClick={() => handleApprove(product.id)}
                        className="rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white"
                      >
                        ✓ Approve
                      </Button>
                      <Button 
                        onClick={() => handleReject(product.id)}
                        variant="outline" 
                        className="rounded-xl text-red-500 border-red-300 hover:bg-red-50"
                      >
                        ✗ Reject
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminProducts;