import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { email_auth, pass_auth } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM doctors WHERE email_auth = $1 AND pass_auth = $2',
      [email_auth, pass_auth]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
    }

    const doctor = result.rows[0];

    // ✅ Mock token (ถ้าใช้ JWT จริง สามารถใส่เพิ่มได้)
    const token = 'mock-jwt-token';

    // ✅ กำหนดรูปแบบข้อมูลที่จะส่งกลับ
    res.json({
      user: {
        id: doctor.doctor_id,
        username: doctor.email_auth,
        name: `${doctor.first_name} ${doctor.last_name}`,
        role: 'doctor',
        hospital: doctor.specialty || 'Hospital',
      },
      token
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในระบบ' });
  }
});

export default router;
