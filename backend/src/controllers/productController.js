import pool from "../db/db.js";

// Get all approved products (for marketplace page)
export async function getApprovedProducts(req, res) {
  try {
    const result = await pool.query(
      `SELECT p.*, u.full_name as seller_name
       FROM products p
       JOIN users u ON p.seller_id = u.id
       WHERE p.status = 'approved'
       ORDER BY p.created_at DESC`
    );
    res.json({ products: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

// Get pending products (for admin only)
export async function getPendingProducts(req, res) {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: "Admin access required" });
    }

    const result = await pool.query(
      `SELECT p.*, u.full_name as seller_name, u.email as seller_email
       FROM products p
       JOIN users u ON p.seller_id = u.id
       WHERE p.status = 'pending'
       ORDER BY p.created_at DESC`
    );
    res.json({ products: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

// Create a new product (user submits)
export async function createProduct(req, res) {
  try {
    const { name, description, price, image_url, country, seller_phone, seller_telegram } = req.body;
    const seller_id = req.user.id;

    const result = await pool.query(
      `INSERT INTO products (name, description, price, image_url, country, seller_id, seller_phone, seller_telegram, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'pending')
       RETURNING *`,
      [name, description, price, image_url, country, seller_id, seller_phone, seller_telegram]
    );

    res.status(201).json({ 
      product: result.rows[0], 
      message: "Product submitted for admin approval" 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

// Approve a product (admin only)
export async function approveProduct(req, res) {
  try {
    const { id } = req.params;
    
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: "Admin access required" });
    }

    const result = await pool.query(
      `UPDATE products 
       SET status = 'approved' 
       WHERE id = $1 
       RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ product: result.rows[0], message: "Product approved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

// Reject/Delete a product (admin only)
export async function rejectProduct(req, res) {
  try {
    const { id } = req.params;
    
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: "Admin access required" });
    }

    const result = await pool.query(
      `DELETE FROM products WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product rejected and removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

// Get user's own products
export async function getUserProducts(req, res) {
  try {
    const user_id = req.user.id;

    const result = await pool.query(
      `SELECT * FROM products WHERE seller_id = $1 ORDER BY created_at DESC`,
      [user_id]
    );
    res.json({ products: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}