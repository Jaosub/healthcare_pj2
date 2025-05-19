// firebaseService.js
import admin from 'firebase-admin';
import fs from 'fs';

// โหลด key
const serviceAccount = JSON.parse(fs.readFileSync('./firebase-key.json'));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
const patientsCollection = db.collection('patients');

export async function syncPatientToFirebase(patientData, source = 'HIS1') {
  try {
    await patientsCollection.doc(patientData.patient_id).set({
      ...patientData,
      source,
      updated_at: new Date().toISOString()
    });
    console.log(`[Firebase] Synced patient ${patientData.patient_id}`);
  } catch (err) {
    console.error('[Firebase] Error syncing patient:', err);
  }
}
export async function syncEncounterToFirebase(encounterData) {
  try {
    await db.collection('encounters').doc(encounterData.encounter_id).set({
      ...encounterData,
      synced_at: new Date().toISOString(),
      source: 'HIS1'
    });

    console.log(`[Firebase] Synced encounter ${encounterData.encounter_id}`);
  } catch (err) {
    console.error('[Firebase] Error syncing encounter:', err);
  }
}


