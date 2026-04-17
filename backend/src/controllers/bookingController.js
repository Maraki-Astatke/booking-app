import pool from "../db/db.js";

export async function createBooking(req, res) {
  try {
    const { destination_id, booking_date, travelers } = req.body;
    const user_id = req.user.id;

    const destResult = await pool.query(
      'SELECT price FROM destinations WHERE id = $1',
      [destination_id]
    );

    if (destResult.rows.length === 0) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    const total_price = parseFloat(destResult.rows[0].price) * parseInt(travelers);

    const result = await pool.query(
      `INSERT INTO bookings (user_id, destination_id, start_date, number_of_guests, total_price, status)
       VALUES ($1, $2, $3, $4, $5, 'confirmed')
       RETURNING *`,
      [user_id, destination_id, booking_date, travelers, total_price]
    );

    res.status(201).json({ booking: result.rows[0] });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ message: error.message });
  }
}

export async function getUserBookings(req, res) {
  try {
    const user_id = req.user.id;
    const user_role = req.user.role;
    
    let query;
    let params;
    
    // If admin, get all bookings from all users
    if (user_role === 'admin') {
      query = `
        SELECT b.*, d.title, d.location, d.image_url, u.full_name as user_name
        FROM bookings b
        JOIN destinations d ON b.destination_id = d.id
        JOIN users u ON b.user_id = u.id
        ORDER BY b.created_at DESC
      `;
      params = [];
    } else {
      // Regular user - get only their bookings
      query = `
        SELECT b.*, d.title, d.location, d.image_url 
        FROM bookings b
        JOIN destinations d ON b.destination_id = d.id
        WHERE b.user_id = $1
        ORDER BY b.created_at DESC
      `;
      params = [user_id];
    }

    const result = await pool.query(query, params);
    res.json({ bookings: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function cancelBooking(req, res) {
  try {
    const { id } = req.params;
    const user_id = req.user.id;

    const result = await pool.query(
      `UPDATE bookings 
       SET status = 'cancelled' 
       WHERE id = $1 AND user_id = $2 AND status != 'cancelled'
       RETURNING *`,
      [id, user_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Booking not found or already cancelled' });
    }

    res.json({ booking: result.rows[0], message: 'Booking cancelled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}