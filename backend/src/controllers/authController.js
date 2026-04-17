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
      console.log("register route hit", req.body);
    const fullName = sanitizeInput(req.body.fullName);
    const username = sanitizeInput(req.body.username);
    const email = sanitizeEmail(req.body.email);
    const phone = sanitizeInput(req.body.phone);
    const password = req.body.password ? req.body.password.trim() : "";

    if (!fullName || !username || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!isStrongPassword(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters and include uppercase, lowercase, number, and symbol",
      });
    }

    const existingUser = await pool.query(
      `SELECT id FROM users WHERE email = $1 OR username = $2 OR phone = $3`,
      [email, username, phone]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        message: "Email, username, or phone already exists",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);

    const result = await pool.query(
      `INSERT INTO users 
      (full_name, username, email, phone, password_hash, verification_token, verification_token_expires_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, full_name, username, email, phone, role, is_verified, created_at`,
      [
        fullName,
        username,
        email,
        phone,
        passwordHash,
        verificationToken,
        verificationTokenExpiresAt,
      ]
    );

    return res.status(201).json({
      message: "User registered successfully. Please verify your email.",
      user: result.rows[0],
      verificationToken,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function verifyEmail(req, res) {
  try {
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
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function loginUser(req, res) {
  try {
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

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // if (!user.is_verified) {
    //   return res.status(403).json({ message: "Please verify your email first" });
    // }

    const token = generateToken(user);

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
    console.error(error);
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