import { Schema, model, connect } from 'mongoose';
export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContact: string;
  motherName: string;
  motherOccupation: string;
  motherContact: string;
};
export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};
export type LocalGuardian = {
  name: string;
  occupation: string;
  contactnumber: string;
  address: string;
};
export type Student = {
  id: string;
  name: UserName;
  gender: 'male' | 'female'; //union type literal
  dateOfBirth?: string;
  contact: string;
  emergencyno: string;
  blood?: 'A+' | 'A-' | 'B+' | 'O+' | 'AB+' | 'O-' | 'AB-' | 'O+' | 'B-';
  presentaddress: string;
  permanentaddress: string;
  email: string;
  avatar?: string;
  guardian: Guardian;
  localguardian: LocalGuardian;
  profileImg?: string;
  isActive: 'active' | 'blocked';
};
