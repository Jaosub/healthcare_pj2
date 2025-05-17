import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Encounter } from '@/types';

interface EncounterCardProps {
    encounter: Encounter;
}

const EncounterCard = ({ encounter }: EncounterCardProps) => {
    return (
        <Card className="card-hover">
            <CardHeader>
                <CardTitle className="text-base font-semibold">
                    ผู้ป่วย: {encounter.patient_first_name} {encounter.patient_last_name} ({encounter.patient_id})
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                    วันที่รักษา: {new Date(encounter.visit_date).toLocaleDateString('th-TH')}
                </p>
                {encounter.doctor_first_name && (
                    <p className="text-sm text-muted-foreground">
                        แพทย์ผู้รักษา: {encounter.doctor_first_name} {encounter.doctor_last_name}
                    </p>
                )}
            </CardHeader>

            <CardContent className="space-y-2 text-sm">
                <div><strong>อาการ:</strong> {encounter.symptoms}</div>
                <div><strong>วินิจฉัย:</strong> {encounter.diagnosis}</div>
                <div><strong>การรักษา:</strong> {encounter.treatment}</div>
                {encounter.note && <div><strong>หมายเหตุ:</strong> {encounter.note}</div>}
            </CardContent>
        </Card>
    );
};

export default EncounterCard;
