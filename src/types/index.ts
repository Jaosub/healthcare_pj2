
export interface User {
  id: string;
  username: string;
  name: string;
  role: 'doctor' | 'admin';
  hospital: string;
}

export type Patient = {
  patient_id: string;     // CHAR(13)
  first_name: string;
  last_name: string;
  birth_date: string;     // ISO string จาก PostgreSQL
  gender: 'male' | 'female';
  phone: string;
  email: string;
  weight: number;
  height: number;
  blood_type: 'A' | 'B' | 'AB' | 'O';

  created_at: string; // ✅ ต้องเป็น snake_case แบบตรงกับ DB
  updated_at: string;
};

export type Encounter = {
  encounter_id: string;
  patient_id: string;
  patient_first_name: string;
  patient_last_name: string;
  doctor_id: string;
  doctor_first_name: string | null;
  doctor_last_name: string | null;
  visit_date: string;
  symptoms: string;
  diagnosis: string;
  treatment: string;
  note: string | null;
};

export type Doctor = {
  doctor_id: string;           // CHAR(13)
  first_name: string;
  last_name: string;
  gender: 'male' | 'female';
  specialty: string | null;    // อนุญาตให้ null ถ้าไม่ระบุ
  license_number: string | null;
  phone: string | null;
  email: string | null;

  // สำหรับระบบล็อกอิน
  email_auth: string;
  pass_auth: string;           // ควรเข้ารหัสแล้วใน backend
};

export interface Hospital {
  id: string;
  name: string;
  code: string;
  address: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}


// export interface Patient {
//   id: string;
//   hn: string; // Hospital Number
//   firstName: string;
//   lastName: string;
//   idCard: string; // Thai ID Card Number
//   dateOfBirth: string;
//   gender: 'male' | 'female' | 'other';
//   phone: string;
//   address: string;
//   bloodType?: string;
//   allergies?: string[];
//   medicalConditions?: string[];
//   createdAt: string;
//   updatedAt: string;
//   hospitalId: string;
// }