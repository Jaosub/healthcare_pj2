import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.post('/sync', async (req, res) => {
  const data = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO fromfire (
        id, patient_id, doctor_id, diagnosis, symptoms, treatment, source
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7
      ) ON CONFLICT (id) DO NOTHING
      RETURNING *`,
      [
        data.id,
        data.patient_id,
        data.doctor_id,
        data.diagnosis,
        data.symptoms,
        data.treatment,
        data.source || 'unknown'
      ]
    );

    res.status(201).json(result.rows[0] || { message: "Already synced" });
  } catch (err) {
    console.error('Sync error:', err);
    res.status(500).json({ error: 'Sync failed' });
  }
});

export default router;
