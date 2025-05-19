import express from 'express'; 
import pool from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM patients ORDER BY created_at DESC');
  res.json(result.rows);
});

router.post('/', async (req, res) => {
  const p = req.body;
  console.log('Patient data received:', p);

  //   const patient_id = String(Math.floor(Math.random() * 1e13)).padStart(13, '0');

  try {
    const result = await pool.query(
      `INSERT INTO patients (
        patient_id, first_name, last_name, birth_date,
        gender, phone, email, weight, height, blood_type
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
      ) RETURNING *`,
      [
        p.patient_id,
        p.first_name,
        p.last_name,
        p.birth_date,
        p.gender,
        p.phone,
        p.email,
        p.weight,
        p.height,
        p.blood_type
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error inserting patient:', err);
    res.status(500).json({ error: 'Insert failed' });
  }
});

router.delete('/:id', async (req, res) => {
  await pool.query('DELETE FROM patients WHERE patient_id = $1', [req.params.id]);
  res.sendStatus(204);
});

router.put('/:id', async (req, res) => {
  const p = req.body
  await pool.query(
    `UPDATE patients SET 
      first_name = $1,
      last_name = $2,
      birth_date = $3,
      gender = $4,
      phone = $5,
      email = $6,
      weight = $7,
      height = $8,
      blood_type = $9,
      updated_at = NOW()
    WHERE patient_id = $10`,
    [
      p.first_name,
      p.last_name,
      p.birth_date,
      p.gender,
      p.phone,
      p.email,
      p.weight,
      p.height,
      p.blood_type,
      req.params.id
    ]
  );


  res.sendStatus(204);
});
export default router;