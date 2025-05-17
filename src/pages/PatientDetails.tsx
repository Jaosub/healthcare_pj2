
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Patient } from '@/types';
import { getPatient } from '@/services/api';
import { ArrowLeft, Edit } from 'lucide-react';

const PatientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
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
  
  // Fetch patient details
  useEffect(() => {
    if (user && id) {
      fetchPatientDetails(id);
    }
  }, [user, id]);
  
  const fetchPatientDetails = async (patientId: string) => {
    setIsLoading(true);
    try {
      const data = await getPatient(patientId);
      setPatient(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถดึงข้อมูลผู้ป่วยได้",
      });
      navigate('/dashboard');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };
  
  const handleBack = () => {
    navigate('/dashboard');
  };
  
  const handleEdit = () => {
    // In a real app, we would navigate to edit page or show edit dialog
    navigate(`/patients/${id}/edit`);
  };
  
  if (!user || isLoading) {
    return (
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          {user && (
            <Header 
              username={user.name} 
              hospital={user.hospital} 
              onLogout={handleLogout} 
            />
          )}
          <main className="flex-1 overflow-y-auto p-6 bg-muted">
            <div className="flex justify-center items-center h-full">
              <p className="text-muted-foreground">กำลังโหลดข้อมูล...</p>
            </div>
          </main>
        </div>
      </div>
    );
  }
  
  if (!patient) {
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
            <div className="flex justify-center items-center h-full">
              <p className="text-muted-foreground">ไม่พบข้อมูลผู้ป่วย</p>
            </div>
          </main>
        </div>
      </div>
    );
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
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {patient.first_name} {patient.last_name}
                </h1>
                <p className="text-muted-foreground">HN: {patient.patient_id}</p>
              </div>
            </div>
            
            <Button onClick={handleEdit} variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              แก้ไขข้อมูล
            </Button>
          </div>
          
          <Tabs defaultValue="general" className="space-y-4">
            <TabsList>
              <TabsTrigger value="general">ข้อมูลทั่วไป</TabsTrigger>
              <TabsTrigger value="medical">ข้อมูลสุขภาพ</TabsTrigger>
              <TabsTrigger value="history">ประวัติการรักษา</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">ข้อมูลส่วนตัว</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">ชื่อ-นามสกุล</p>
                      <p>{patient.first_name} {patient.last_name}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">เลขบัตรประชาชน</p>
                      <p>{patient.patient_id}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">วันเกิด</p>
                      <p>{new Date(patient.birth_date).toLocaleDateString('th-TH')}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">เพศ</p>
                      <p>{patient.gender === 'male' ? 'ชาย' : patient.gender === 'female' ? 'หญิง' : 'อื่นๆ'}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">เบอร์โทรศัพท์</p>
                      <p>{patient.phone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="medical" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">ข้อมูลสุขภาพ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">กรุ๊ปเลือด</p>
                      <p>{patient.blood_type || 'ไม่มีข้อมูล'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="history" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">ประวัติการรักษา</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center py-8">
                    ยังไม่มีข้อมูลประวัติการรักษา
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default PatientDetails;
