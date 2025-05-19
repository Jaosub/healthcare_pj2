import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const EncounterForm = () => {
  const [formData, setFormData] = useState({
    patient_id: '',
    doctor_id: '',
    symptoms: '',
    diagnosis: '',
    treatment: '',
    note: '',
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/encounters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: 'เพิ่ม Encounter สำเร็จ',
          description: 'ข้อมูลถูกบันทึกและส่งไป Firebase แล้ว',
        });
        setFormData({
          patient_id: '',
          doctor_id: '',
          symptoms: '',
          diagnosis: '',
          treatment: '',
          note: '',
        });
        setIsDialogOpen(false);
      } else {
        toast({
          variant: 'destructive',
          title: 'บันทึกไม่สำเร็จ',
          description: data.error || 'เกิดข้อผิดพลาดบางอย่าง',
        });
      }
    } catch (err) {
      console.error('Error:', err);
      toast({
        variant: 'destructive',
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถเชื่อมต่อกับ Backend ได้',
      });
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header username="หมอ A" hospital="HIS1" onLogout={() => {}} />

        <main className="flex-1 overflow-y-auto p-6 bg-muted">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">เพิ่ม Encounter</h1>
              <p className="text-muted-foreground">กรอกข้อมูล Encounter ของผู้ป่วย</p>
            </div>
            <Button onClick={() => setIsDialogOpen(true)} className="health-gradient">
              เพิ่ม Encounter
            </Button>
          </div>
        </main>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>เพิ่ม Encounter ใหม่</DialogTitle>
            <DialogDescription>กรอกข้อมูลการรักษาให้ครบถ้วน</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="patient_id" placeholder="Patient ID" required value={formData.patient_id} onChange={handleChange} className="w-full p-2 border" />
            <input name="doctor_id" placeholder="Doctor ID" required value={formData.doctor_id} onChange={handleChange} className="w-full p-2 border" />
            <textarea name="symptoms" placeholder="Symptoms" value={formData.symptoms} onChange={handleChange} className="w-full p-2 border" />
            <textarea name="diagnosis" placeholder="Diagnosis" value={formData.diagnosis} onChange={handleChange} className="w-full p-2 border" />
            <textarea name="treatment" placeholder="Treatment" value={formData.treatment} onChange={handleChange} className="w-full p-2 border" />
            <textarea name="note" placeholder="Note" value={formData.note} onChange={handleChange} className="w-full p-2 border" />
            <Button type="submit" className="w-full bg-blue-500 text-white">ส่งข้อมูล</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EncounterForm;