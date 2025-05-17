
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
// import { Textarea } from '@/components/ui/textarea';
import { Patient } from '@/types';

// Define the form schema with Zod
const patientFormSchema = z.object({
  patient_id: z.string().min(1, { message: 'จำเป็นต้องระบุ HN' }),
  firstName: z.string().min(1, { message: 'จำเป็นต้องระบุชื่อ' }),
  lastName: z.string().min(1, { message: 'จำเป็นต้องระบุนามสกุล' }),
  // idCard: z.string().length(13, { message: 'เลขบัตรประชาชนต้องมี 13 หลัก' }),
  dateOfBirth: z.string().min(1, { message: 'จำเป็นต้องระบุวันเกิด' }),
  gender: z.enum(['male', 'female', 'other'], { 
    required_error: 'จำเป็นต้องระบุเพศ',
  }),
  phone: z.string().min(1, { message: 'จำเป็นต้องระบุเบอร์โทรศัพท์' }),
  // address: z.string().min(1, { message: 'จำเป็นต้องระบุที่อยู่' }),
  bloodType: z.string().optional(),
  // allergies: z.string().optional(),
  // medicalConditions: z.string().optional(),
  // hospitalId: z.string(),

  email: z.string().email({ message: 'อีเมลไม่ถูกต้อง' }),
  weight: z.coerce.number().min(0, { message: 'น้ำหนักต้องมากกว่า 0' }),
  height: z.coerce.number().min(0, { message: 'ส่วนสูงต้องมากกว่า 0' }),

});

type PatientFormValues = z.infer<typeof patientFormSchema>;

interface PatientFormProps {
  patient?: Patient;
  onSubmit: (values: PatientFormValues) => void;
  isLoading: boolean;
}

const PatientForm = ({ patient, onSubmit, isLoading }: PatientFormProps) => {
  // Convert allergies and medicalConditions arrays to strings for the form
  const defaultValues: Partial<PatientFormValues> = patient
  ? { ...patient }
  : {};

  // const defaultValues: Partial<PatientFormValues> = patient
  //   ? {
  //       ...patient,
  //       allergies: patient.allergies?.join(', ') || '',
  //       medicalConditions: patient.medicalConditions?.join(', ') || '',
  //     }
  //   : {
  //       hospitalId: 'H001', // Default hospital ID
  //     };

  const form = useForm<PatientFormValues>({
    resolver: zodResolver(patientFormSchema),
    defaultValues,
  });

  const handleSubmit = (values: PatientFormValues) => {
    // Convert the string values back to arrays before submitting
    // const processedValues = {
    //   ...values,
    //   allergies: values.allergies ? values.allergies.split(',').map(item => item.trim()) : [],
    //   medicalConditions: values.medicalConditions ? values.medicalConditions.split(',').map(item => item.trim()) : [],
    // };
    // onSubmit(processedValues as PatientFormValues);
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* <FormField
            control={form.control}
            name="hn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>เลข HN</FormLabel>
                <FormControl>
                  <Input placeholder="เช่น HN001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          
          <FormField
            control={form.control}
            name="patient_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>เลขบัตรประชาชน</FormLabel>
                <FormControl>
                  <Input placeholder="เลขบัตรประชาชน 13 หลัก" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ชื่อ</FormLabel>
                <FormControl>
                  <Input placeholder="ชื่อ" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>นามสกุล</FormLabel>
                <FormControl>
                  <Input placeholder="นามสกุล" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>วันเกิด</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>เพศ</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกเพศ" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">ชาย</SelectItem>
                    <SelectItem value="female">หญิง</SelectItem>
                    <SelectItem value="other">อื่นๆ</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>เบอร์โทรศัพท์</FormLabel>
                <FormControl>
                  <Input placeholder="เช่น 081-234-5678" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="bloodType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>กรุ๊ปเลือด</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกกรุ๊ปเลือด" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="B">B</SelectItem>
                    <SelectItem value="AB">AB</SelectItem>
                    <SelectItem value="O">O</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        {/* <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ที่อยู่</FormLabel>
              <FormControl>
                <Textarea placeholder="ที่อยู่" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>อีเมล</FormLabel>
              <FormControl>
                <Input type="email" placeholder="your@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
/>
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>น้ำหนัก (กก.)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="เช่น 70" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
/>

        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ส่วนสูง (ซม.)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="เช่น 175" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
/>

        {/* <FormField
          control={form.control}
          name="allergies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>การแพ้ยา/อาหาร</FormLabel>
              <FormControl>
                <Textarea placeholder="ระบุการแพ้ยาหรืออาหาร (คั่นด้วยเครื่องหมายคอมม่า)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="medicalConditions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>โรคประจำตัว</FormLabel>
              <FormControl>
                <Textarea placeholder="ระบุโรคประจำตัว (คั่นด้วยเครื่องหมายคอมม่า)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        
        {/* <input type="hidden" {...form.register('hospitalId')} /> */}
        
        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'กำลังบันทึก...' : patient ? 'อัปเดตข้อมูล' : 'เพิ่มข้อมูล'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PatientForm;
