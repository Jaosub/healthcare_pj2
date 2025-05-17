import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Encounter, User } from '@/types';
import { getEncounters } from '@/services/api';
import EncounterCard from '@/components/patients/EncounterCard';
import { Plus } from 'lucide-react';
import EncounterList from '@/components/patients/EncounterList';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import EncounterForm from '@/components/patients/EncounterForm';
import { createEncounter } from '@/services/api'; // ต้องสร้างฟังก์ชันนี้ใน api.ts


const DashboardPatient = () => {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isLoadingAction, setIsLoadingAction] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [encounters, setEncounters] = useState<Encounter[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

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

    useEffect(() => {
        if (user) {
            fetchEncounters();
        }
    }, [user]);

    const fetchEncounters = async () => {
        setIsLoading(true);
        try {
            const data = await getEncounters();
            setEncounters(data);
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'เกิดข้อผิดพลาด',
                description: 'ไม่สามารถดึงข้อมูลการรักษาได้',
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

    const handleAddEncounter = async (data: any) => {
        setIsLoadingAction(true);
        try {
            const res = await createEncounter(data);
            setEncounters([res, ...encounters]);
            toast({ title: 'เพิ่มข้อมูลสำเร็จ', description: 'บันทึกการรักษาเรียบร้อยแล้ว' });
            setIsAddDialogOpen(false);
        } catch (error) {
            toast({ title: 'เพิ่มข้อมูลล้มเหลว', variant: 'destructive' });
        } finally {
            setIsLoadingAction(false);
        }
    };


    if (!user) return null;

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
                            <h1 className="text-2xl font-bold text-gray-900">แดชบอร์ดข้อมูลการรักษา</h1>
                            <p className="text-muted-foreground">ระบบจัดการข้อมูลการรักษาผู้ป่วย</p>
                        </div>

                        <Button onClick={() => setIsAddDialogOpen(true)} className="health-gradient">
                            <Plus className="h-4 w-4 mr-2" />
                            เพิ่มข้อมูลการรักษา
                        </Button>

                    </div>

                    {isLoading ? (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">กำลังโหลดข้อมูล...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <EncounterList encounters={encounters} />
                        </div>
                    )}
                </main>
            </div>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogContent className="sm:max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>เพิ่มข้อมูลการรักษา</DialogTitle>
                        <DialogDescription>
                            กรอกข้อมูลการรักษาผู้ป่วยให้ครบถ้วน
                        </DialogDescription>
                    </DialogHeader>

                    <EncounterForm
                        onSubmit={handleAddEncounter}
                        isLoading={isLoadingAction}
                    />
                </DialogContent>
            </Dialog>

        </div>
    );
};

export default DashboardPatient;
