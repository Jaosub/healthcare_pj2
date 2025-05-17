import React, { useState } from 'react';
import EncounterCard from './EncounterCard';
import { Encounter } from '@/types';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface EncounterListProps {
  encounters: Encounter[];
}

const EncounterList = ({ encounters }: EncounterListProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEncounters = encounters.filter(enc =>
    `${enc.patient_first_name} ${enc.patient_last_name} ${enc.patient_id}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-10 bg-white"
          placeholder="ค้นหาผู้ป่วยจากชื่อ นามสกุล หรือเลขผู้ป่วย"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredEncounters.length === 0 ? (
        <div className="text-center py-12 bg-muted rounded-lg">
          <p className="text-muted-foreground">ไม่พบข้อมูลการรักษาที่ต้องการ</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEncounters.map(encounter => (
            <EncounterCard key={encounter.encounter_id} encounter={encounter} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EncounterList;
