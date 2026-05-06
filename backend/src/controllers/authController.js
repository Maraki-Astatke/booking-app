import bcrypt from "bcrypt";
import crypto from "crypto";
import pool from "../db/db.js";
import generateToken from "../utils/generateToken.js";
import {
  sanitizeInput,
  sanitizeEmail,
  isStrongPassword,
} from "../utils/authValidation.js";

export async function registerUser(req, res) {
  try {
    console.log("1. register route hit", req.body);
    
    // SIMPLIFIED - bypass validation for testing
    const fullName = req.body.fullName;
    const username = req.body.username;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;

    console.log("2. Data extracted:", { fullName, username, email, phone });

    if (!fullName || !username || !email || !phone || !password) {
      console.log("3. Missing fields");
      return res.status(400).json({ message: "All fields are required" });
    }
    console.log("4. All fields present");

    console.log("5. Hashing password...");
    const passwordHash = await bcrypt.hash(password, 10);
    console.log("6. Password hashed");

    console.log("7. Checking existing user...");
    const existingUser = await pool.query(
      `SELECT id FROM users WHERE email = $1 OR username = $2 OR phone = $3`,
      [email, username, phone]
    );
    console.log("8. Existing user check complete. Found:", existingUser.rows.length);

    if (existingUser.rows.length > 0) {
      console.log("9. User already exists");
      return res.status(409).json({ message: "User already exists" });
    }
    console.log("10. User does not exist - proceeding");

    console.log("11. Inserting user into database...");
    const result = await pool.query(
      `INSERT INTO users 
      (full_name, username, email, phone, password_hash, role)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, full_name, username, email, phone, role`,
      [fullName, username, email, phone, passwordHash, 'user']
    );
    console.log("12. User inserted successfully:", result.rows[0]);

    console.log("13. Generating JWT token...");
    const token = generateToken(result.rows[0]);
    console.log("14. Token generated successfully");

    console.log("15. Registration complete - sending response");
    return res.status(201).json({
      message: "User registered successfully",
      token: token,
      user: result.rows[0],
    });
  } catch (error) {
    console.error("!!! REGISTRATION ERROR !!!");
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    return res.status(500).json({ 
      message: "Server error", 
      error: error.message 
    });
  }
}

export async function verifyEmail(req, res) {
  try {
    console.log("Verify email hit with token:", req.params.token);
    const token = sanitizeInput(req.params.token);

    const result = await pool.query(
      `SELECT id FROM users
       WHERE verification_token = $1
       AND verification_token_expires_at > NOW()
       AND is_verified = FALSE`,
      [token]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Invalid or expired verification token" });
    }

    await pool.query(
      `UPDATE users
       SET is_verified = TRUE,
           verification_token = NULL,
           verification_token_expires_at = NULL,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $1`,
      [result.rows[0].id]
    );

    return res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Verify email error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function loginUser(req, res) {
  try {
    console.log("Login attempt for:", req.body.login);
    const login = sanitizeInput(req.body.login);
    const password = req.body.password ? req.body.password.trim() : "";

    if (!login || !password) {
      return res.status(400).json({ message: "Login and password are required" });
    }

    const result = await pool.query(
      `SELECT * FROM users
       WHERE email = $1 OR username = $1 OR phone = $1`,
      [login]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = result.rows[0];
    console.log("User found:", user.id);

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    console.log("Password matched");

    const token = generateToken(user);
    console.log("Login successful for user:", user.id);

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        fullName: user.full_name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function getCurrentUser(req, res) {
  try {
    const result = await pool.query(
      `SELECT id, full_name, username, email, phone, role, is_verified, created_at
       FROM users WHERE id = $1`,
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user: result.rows[0] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function getTotalUsers(req, res) {
  try {
    const result = await pool.query('SELECT COUNT(*) FROM users');
    res.json({ count: parseInt(result.rows[0].count) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}