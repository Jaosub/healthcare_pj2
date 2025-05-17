
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import PatientList from '@/components/patients/PatientList';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { User, Patient } from '@/types';
import { getPatients, deletePatient } from '@/services/api';
import { Plus } from 'lucide-react';
import PatientForm from '@/components/patients/PatientForm';

import { createPatient, updatePatient } from '@/services/api';

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAction, setIsLoadingAction] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { toast } = useToast();
  const navigate = useNavigate();

  // Check for user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!storedUser || !token) {
      navigate('/login');
      return;
    }

    try {
      setUser(JSON.parse(storedUser));
    } catch (error) {
      console.error('Failed to parse user:', error);
      navigate('/login');
    }
  }, [navigate]);

  // Fetch patients when user is loaded
  useEffect(() => {
    if (user) {
      fetchPatients();
    }
  }, [user]);


  useEffect(() => {
    console.log("patients state:", patients);
  }, [patients]);

  const fetchPatients = async () => {
    setIsLoading(true);
    try {
      const data = await getPatients();
      setPatients(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถดึงข้อมูลผู้ป่วยได้",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleViewPatient = (id: string) => {
    navigate(`/patients/${id}`);
  };

  const handleEditPatient = (id: string) => {
    setSelectedPatientId(id);
    setIsEditDialogOpen(true);
  };

  const handleDeletePatient = (id: string) => {
    setSelectedPatientId(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeletePatient = async () => {
    if (!selectedPatientId) return;

    setIsLoadingAction(true);
    try {
      await deletePatient(selectedPatientId);
      setPatients(patients.filter(patient => patient.patient_id !== selectedPatientId));
      toast({
        title: "ลบข้อมูลสำเร็จ",
        description: "ลบข้อมูลผู้ป่วยเรียบร้อยแล้ว",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "ลบข้อมูลไม่สำเร็จ",
        description: "เกิดข้อผิดพลาดในการลบข้อมูลผู้ป่วย",
      });
    } finally {
      setIsLoadingAction(false);
      setIsDeleteDialogOpen(false);
      setSelectedPatientId(null);
    }
  };

  const handleAddPatient = async (data: any) => {
    setIsLoadingAction(true);
    try {
      const payload = {
        patient_id: data.patient_id,
        first_name: data.firstName,
        last_name: data.lastName,
        birth_date: data.dateOfBirth,
        gender: data.gender,
        phone: data.phone,
        email: data.email,
        weight: Number(data.weight),
        height: Number(data.height),
        blood_type: data.bloodType,
      };

      console.log("Sending payload to API:", payload);
      const res = await createPatient(payload);
      setPatients([res, ...patients]);
      toast({
        title: "เพิ่มข้อมูลสำเร็จ",
        description: "เพิ่มข้อมูลผู้ป่วยใหม่เรียบร้อยแล้ว",
      });
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error("Add patient failed:", error);
      toast({
        variant: "destructive",
        title: "เพิ่มข้อมูลไม่สำเร็จ",
        description: "เกิดข้อผิดพลาดในการเพิ่มข้อมูลผู้ป่วย",
      });
    } finally {
      setIsLoadingAction(false);
    }
  };


  // const handleAddPatient = async (data: Omit<Patient, 'patient_id'>) => {
  //   setIsLoadingAction(true);
  //   try {
  //     const res = await createPatient(data); // ← สร้างผู้ป่วยผ่าน API จริง
  //     setPatients([res, ...patients]);

  //     toast({
  //       title: "เพิ่มข้อมูลสำเร็จ",
  //       description: "เพิ่มข้อมูลผู้ป่วยใหม่เรียบร้อยแล้ว",
  //     });

  //     setIsAddDialogOpen(false);
  //   } catch (error) {
  //     toast({
  //       variant: "destructive",
  //       title: "เพิ่มข้อมูลไม่สำเร็จ",
  //       description: "เกิดข้อผิดพลาดในการเพิ่มข้อมูลผู้ป่วย",
  //     });
  //   } finally {
  //     setIsLoadingAction(false);
  //   }
  // };

  const handleUpdatePatient = async (data: any) => {
    if (!selectedPatientId) return;

    setIsLoadingAction(true);
    try {
      const payload = {
        first_name: data.firstName,
        last_name: data.lastName,
        birth_date: data.dateOfBirth,
        gender: data.gender,
        phone: data.phone,
        email: data.email,
        weight: data.weight,
        height: data.height,
        blood_type: data.bloodType,
      };

      await updatePatient(selectedPatientId, payload);

      const updatedPatients = patients.map(patient =>
        patient.patient_id === selectedPatientId
          ? { ...patient, ...payload }
          : patient
      );

      setPatients(updatedPatients);

      toast({
        title: "อัปเดตข้อมูลสำเร็จ",
        description: "อัปเดตข้อมูลผู้ป่วยเรียบร้อยแล้ว",
      });

      setIsEditDialogOpen(false);
      setSelectedPatientId(null);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "อัปเดตข้อมูลไม่สำเร็จ",
        description: "เกิดข้อผิดพลาดในการอัปเดตข้อมูลผู้ป่วย",
      });
    } finally {
      setIsLoadingAction(false);
    }
  };


  const selectedPatient = patients.find(patient => patient.patient_id === selectedPatientId);

  if (!user) {
    return null; // Or a loading spinner
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header
          username={user.name}
          hospital={user.hospital}
          onLogout={handleLogout}
        />

        <main className="flex-1 overflow-y-auto p-6 bg-muted">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">แดชบอร์ดข้อมูลผู้ป่วย</h1>
              <p className="text-muted-foreground">ระบบจัดการข้อมูลผู้ป่วยระหว่างโรงพยาบาล</p>
            </div>

            <Button onClick={() => setIsAddDialogOpen(true)} className="health-gradient">
              <Plus className="h-4 w-4 mr-2" />
              เพิ่มผู้ป่วยใหม่
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="stats-card flex items-center">
              <div className="p-4 bg-blue-100 rounded-full mr-4">
                <svg className="h-6 w-6 text-healthcare-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">จำนวนผู้ป่วยทั้งหมด</p>
                <p className="text-2xl font-bold">{patients.length}</p>
              </div>
            </div>

            {/* <div className="stats-card flex items-center">
              <div className="p-4 bg-green-100 rounded-full mr-4">
                <svg className="h-6 w-6 text-healthcare-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">การนัดหมายวันนี้</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div> */}

            {/* <div className="stats-card flex items-center">
              <div className="p-4 bg-purple-100 rounded-full mr-4">
                <svg className="h-6 w-6 text-healthcare-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">ผู้ป่วยรายใหม่เดือนนี้</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div> */}
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">กำลังโหลดข้อมูล...</p>
            </div>
          ) : (
            <PatientList
              patients={patients}
              onViewPatient={handleViewPatient}
              onEditPatient={handleEditPatient}
              onDeletePatient={handleDeletePatient}
            />
          )}
        </main>
      </div>

      {/* Add Patient Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>เพิ่มข้อมูลผู้ป่วยใหม่</DialogTitle>
            <DialogDescription>
              กรอกข้อมูลผู้ป่วยให้ครบถ้วน
            </DialogDescription>
          </DialogHeader>

          <PatientForm
            onSubmit={handleAddPatient}
            isLoading={isLoadingAction}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Patient Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>แก้ไขข้อมูลผู้ป่วย</DialogTitle>
            <DialogDescription>
              แก้ไขข้อมูลผู้ป่วยตามต้องการ
            </DialogDescription>
          </DialogHeader>

          {selectedPatient && (
            <PatientForm
              patient={selectedPatient}
              onSubmit={handleUpdatePatient}
              isLoading={isLoadingAction}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ยืนยันการลบข้อมูลผู้ป่วย</AlertDialogTitle>
            <AlertDialogDescription>
              คุณต้องการลบข้อมูลผู้ป่วยนี้ใช่หรือไม่? การกระทำนี้ไม่สามารถยกเลิกได้
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoadingAction}>ยกเลิก</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeletePatient} disabled={isLoadingAction} className="bg-red-500 hover:bg-red-600">
              {isLoadingAction ? "กำลังลบ..." : "ลบ"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Dashboard;
