
import React, { useState } from 'react';
import PatientCard from './PatientCard';
import { Input } from '@/components/ui/input';
import { Patient } from '@/types';
import { Search } from 'lucide-react';

interface PatientListProps {
  patients: Patient[];
  onViewPatient: (id: string) => void;
  onEditPatient: (id: string) => void;
  onDeletePatient: (id: string) => void;
}

const PatientList = ({ patients, onViewPatient, onEditPatient, onDeletePatient }: PatientListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredPatients = patients.filter(patient => 
    patient.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    // patient.hn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.patient_id.includes(searchTerm)
  );
  
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-10 bg-white"
          placeholder="ค้นหาผู้ป่วยด้วยชื่อ, HN หรือเลขบัตรประชาชน"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {filteredPatients.length === 0 ? (
        <div className="text-center py-12 bg-muted rounded-lg">
          <p className="text-muted-foreground">ไม่พบข้อมูลผู้ป่วยที่ต้องการ</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPatients.map(patient => (
            <PatientCard
              key={patient.patient_id}
              patient={patient}
              onView={onViewPatient}
              onEdit={onEditPatient}
              onDelete={onDeletePatient}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientList;