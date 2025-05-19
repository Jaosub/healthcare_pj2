// services/firebase.ts
import { collection, getDocs } from "firebase/firestore";
import  db from "../lib/firebaseClient";

export async function fetchEncountersFromFirebase() {
  const snapshot = await getDocs(collection(db, "encounters"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
