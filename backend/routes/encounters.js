import express from 'express';
import pool from '../db.js';
import { v4 as uuidv4 } from 'uuid';
import { syncEncounterToFirebase } from '../firebaseService.js';


const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await pool.query(`
      SELECT 
            e.encounter_id,
            e.patient_id,
            p.first_name AS patient_first_name,
            p.last_name AS patient_last_name,
            e.doctor_id,
            d.first_name AS doctor_first_name,
            d.last_name AS doctor_last_name,
            e.visit_date,
            e.symptoms,
            e.diagnosis,
            e.treatment,
            e.note
        FROM encounters e
        JOIN patients p ON e.patient_id = p.patient_id
        LEFT JOIN doctors d ON e.doctor_id = d.doctor_id
        ORDER BY e.visit_date DESC

    `);
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching encounters:', err);
        res.status(500).json({ error: 'Failed to fetch encounters' });
    }
});

router.post('/', async (req, res) => {
  const p = req.body;

  try {
    const insertResult = await pool.query(
      `INSERT INTO encounters (
        encounter_id, patient_id, doctor_id, symptoms, diagnosis, treatment, note
      ) VALUES (
        uuid_generate_v4(), $1, $2, $3, $4, $5, $6
      ) RETURNING *`,
      [
        p.patient_id,
        p.doctor_id,
        p.symptoms,
        p.diagnosis,
        p.treatment,
        p.note || null
      ]
    );

    const inserted = insertResult.rows[0];

    const detailResult = await pool.query(
      `SELECT 
         e.encounter_id,
         e.patient_id,
         p.first_name AS patient_first_name,
         p.last_name AS patient_last_name,
         e.doctor_id,
         d.first_name AS doctor_first_name,
         d.last_name AS doctor_last_name,
         e.visit_date,
         e.symptoms,
         e.diagnosis,
         e.treatment,
         e.note
       FROM encounters e
       JOIN patients p ON e.patient_id = p.patient_id
       LEFT JOIN doctors d ON e.doctor_id = d.doctor_id
       WHERE e.encounter_id = $1`,
      [inserted.encounter_id]
    );

    const encounterFull = detailResult.rows[0];

    // ✅ Sync ไปยัง Firebase
    await syncEncounterToFirebase(encounterFull);

    res.status(201).json(encounterFull);
  } catch (err) {
    console.error('Error inserting encounter:', err);
    res.status(500).json({ error: 'Insert failed' });
  }
});


export default router;
