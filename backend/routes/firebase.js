// import express from 'express';
// import admin from 'firebase-admin';

// const router = express.Router();
// const db = admin.firestore();

// // ดึง patient ของโรงพยาบาลอื่น (ไม่ใช่ของตัวเอง)
// router.get('/external-patients/:source', async (req, res) => {
//   const source = req.params.source;

//   try {
//     const snapshot = await db.collection('patients')
//       .where('source', '!=', source)
//       .get();

//     const patients = snapshot.docs.map(doc => doc.data());
//     res.json(patients);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to fetch external patients' });
//   }
// });

// // ดึง encounter ของโรงพยาบาลอื่น
// router.get('/external-encounters/:source', async (req, res) => {
//   const source = req.params.source;

//   try {
//     const snapshot = await db.collection('encounters')
//       .where('source', '!=', source)
//       .get();

//     const encounters = snapshot.docs.map(doc => doc.data());
//     res.json(encounters);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to fetch external encounters' });
//   }
// });

// export default router;
