
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Patient } from '@/types';

interface PatientCardProps {
  patient: Patient;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const PatientCard = ({ patient, onView, onEdit, onDelete }: PatientCardProps) => {
  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between items-center">
          <span>
            {patient.first_name} {patient.last_name}
          </span>
          {/* <span className="text-xs font-normal bg-healthcare-light text-healthcare-primary px-2 py-1 rounded-full">
            HN: {patient.hn}
          </span> */}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="text-sm space-y-1">
          <div className="flex justify-between">
            <span className="text-muted-foreground">เลขประจำตัว:</span>
            <span>{patient.patient_id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">วันเกิด:</span>
            <span>{new Date(patient.birth_date).toLocaleDateString('th-TH')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">เพศ:</span>
            <span>{patient.gender === 'male' ? 'ชาย' : patient.gender === 'female' ? 'หญิง' : 'อื่นๆ'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">เบอร์โทร:</span>
            <span>{patient.phone}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-3 flex justify-between">
        <Button variant="ghost" size="sm" onClick={() => onView(patient.patient_id)}>
          <FileText className="h-4 w-4 mr-1" />
          <span>ดูข้อมูล</span>
        </Button>
        <div className="space-x-1">
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => onEdit(patient.patient_id)}>
            <Edit className="h-4 w-4 text-blue-600" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => onDelete(patient.patient_id)}>
            <Trash2 className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PatientCard;
