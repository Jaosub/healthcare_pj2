import { Patient, User, Encounter } from '../types';

// ดึงผู้ป่วยทั้งหมด
export const getPatients = async (): Promise<Patient[]> => {
  const res = await fetch('http://localhost:3001/api/patients');
  if (!res.ok) throw new Error('ไม่สามารถโหลดข้อมูลผู้ป่วย');
  return res.json();
};

// ดึงผู้ป่วยรายเดียว
export const getPatient = async (id: string): Promise<Patient> => {
  const res = await fetch(`http://localhost:3001/api/patients/${id}`);
  if (!res.ok) throw new Error('ไม่สามารถโหลดข้อมูลผู้ป่วยรายนี้');
  return res.json();
};

// ลบผู้ป่วย
export const deletePatient = async (id: string): Promise<void> => {
  const res = await fetch(`http://localhost:3001/api/patients/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('ไม่สามารถลบผู้ป่วย');
};

// ล็อกอิน
export const login = async (email_auth: string, pass_auth: string): Promise<{ user: User; token: string }> => {
  const res = await fetch('http://localhost:3001/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email_auth, pass_auth }),
  });

  if (!res.ok) throw new Error('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');

  return res.json();
};

export const createPatient = async (
  patient: Omit<Patient,'created_at' | 'updated_at'>
): Promise<Patient> => {
  const res = await fetch('http://localhost:3001/api/patients', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patient),
  });

  if (!res.ok) throw new Error('ไม่สามารถเพิ่มข้อมูลผู้ป่วย');

  return res.json();
};

export const updatePatient = async (
  id: string,
  patient: Omit<Patient, 'patient_id' | 'created_at' | 'updated_at'>
): Promise<void> => {
  const res = await fetch(`http://localhost:3001/api/patients/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patient),
  });

  if (!res.ok) throw new Error('ไม่สามารถอัปเดตข้อมูลผู้ป่วย');
};

export const getEncounters = async (): Promise<Encounter[]> => {
  const res = await fetch('http://localhost:3001/api/encounters');
  if (!res.ok) throw new Error('ไม่สามารถโหลดข้อมูลการรักษา');
  return res.json();
};

export const createEncounter = async (
  data: {
    patient_id: string;
    doctor_id: string;
    symptoms: string;
    diagnosis: string;
    treatment: string;
    note?: string;
  }
): Promise<Encounter> => {
  const res = await fetch('http://localhost:3001/api/encounters', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('ไม่สามารถเพิ่มข้อมูลการรักษา');

  return res.json();
};

