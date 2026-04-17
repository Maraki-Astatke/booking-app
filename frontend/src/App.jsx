import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Destinations from "./pages/Destinations";
import DestinationDetail from "./pages/DestinationDetail";
import AdminAddDestination from "./pages/AdminAddDestination";
import FAQ from "./pages/FAQ";
import ProtectedRoute from "./routes/ProtectedRoute";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Marketplace from "./pages/Marketplace";
import AddProduct from "./pages/AddProduct";
import AdminProducts from "./pages/AdminProducts";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/destinations" element={<Destinations />} />
      <Route path="/destination/:id" element={<DestinationDetail />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-product"
        element={
          <ProtectedRoute>
            <AddProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/products"
        element={
          <ProtectedRoute>
            <AdminProducts />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/add-destination"
        element={
          <ProtectedRoute>
            <AdminAddDestination />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;