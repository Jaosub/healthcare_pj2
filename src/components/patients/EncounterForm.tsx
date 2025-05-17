import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

// 🔧 สร้าง schema
const encounterFormSchema = z.object({
  patient_id: z.string().min(1, { message: 'จำเป็นต้องระบุรหัสผู้ป่วย' }),
  doctor_id: z.string().min(1, { message: 'จำเป็นต้องระบุรหัสแพทย์' }),
  symptoms: z.string().min(1, { message: 'กรุณาระบุอาการ' }),
  diagnosis: z.string().min(1, { message: 'กรุณาระบุการวินิจฉัย' }),
  treatment: z.string().min(1, { message: 'กรุณาระบุการรักษา' }),
  note: z.string().optional()
});

type EncounterFormValues = z.infer<typeof encounterFormSchema>;

interface EncounterFormProps {
  onSubmit: (values: EncounterFormValues) => void;
  isLoading: boolean;
}

const EncounterForm = ({ onSubmit, isLoading }: EncounterFormProps) => {
  const form = useForm<EncounterFormValues>({
    resolver: zodResolver(encounterFormSchema),
    defaultValues: {
      patient_id: '',
      doctor_id: '',
      symptoms: '',
      diagnosis: '',
      treatment: '',
      note: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="patient_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>รหัสผู้ป่วย</FormLabel>
              <FormControl>
                <Input placeholder="ใส่ patient_id (13 หลัก)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="doctor_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>รหัสแพทย์</FormLabel>
              <FormControl>
                <Input placeholder="ใส่ doctor_id (13 หลัก)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="symptoms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>อาการ</FormLabel>
              <FormControl>
                <Textarea placeholder="เช่น มีไข้ ไอ เจ็บคอ..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="diagnosis"
          render={({ field }) => (
            <FormItem>
              <FormLabel>การวินิจฉัย</FormLabel>
              <FormControl>
                <Textarea placeholder="เช่น หวัด, ไข้หวัดใหญ่" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="treatment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>การรักษา</FormLabel>
              <FormControl>
                <Textarea placeholder="เช่น ให้ยาลดไข้, พักผ่อน" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>หมายเหตุ (ถ้ามี)</FormLabel>
              <FormControl>
                <Textarea placeholder="หมายเหตุเพิ่มเติม..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'กำลังบันทึก...' : 'บันทึกการรักษา'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EncounterForm;
