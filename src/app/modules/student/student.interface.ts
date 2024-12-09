import { TStudent } from './student.interface';
import { Schema, model, connect, Model } from 'mongoose';
import studentSchema from './student.validation';
export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContact: string;
  motherName: string;
  motherOccupation: string;
  motherContact: string;
};
export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};
export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactnumber: string;
  address: string;
};
export type TStudent = {
  id: string;
  name: TUserName;
  password:string;
  gender: 'male' | 'female' | 'other'; //union type literal
  dateOfBirth?: string;
  contact: string;
  emergencyno: string;
  blood?: 'A+' | 'A-' | 'B+' | 'O+' | 'AB+' | 'O-' | 'AB-' | 'O+' | 'B-';
  presentaddress: string;
  permanentaddress: string;
  email: string;
  avatar?: string;
  guardian: TGuardian;
  localguardian: TLocalGuardian;
  profileImg?: string;
  isActive: 'active' | 'blocked';
  isDeleted: boolean
};













// /for creating static
export interface StudentModel extends Model<TStudent> {
  isUserExist(id: string): Promise<TStudent | null>;

}

// for creating instance
// export type StudentMethod = {
//   isUserExist(id: string): Promise<TStudent | null>;
// };
// export type StudentModel = Model<TStudent, {}, StudentMethod>;
