import { Schema, model, connect } from 'mongoose';
import { Guardian, LocalGuardian, Student, UserName } from './student.interface';
const usernameSchema = new Schema<UserName>({
    firstName: {
        type: String,
        required: true,
      },
      middleName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
})
const guardianschema = new Schema <Guardian>({
    fatherName: { type: String, required: true },
    fatherContact: { type: String, required: true },
    fatherOccupation: { type: String, required: true },
    motherContact: { type: String, required: true },
    motherName: { type: String, required: true },
    motherOccupation: { type: String, required: true },
})
const localguardianschema = new Schema <LocalGuardian>({
    name: { type: String, required: true },
    occupation: { type: String, required: true },
    contactnumber: { type: String, required: true },
    address: { type: String, required: true },
})
const studentSchema = new Schema<Student>({
  id: { type: String },
  name: usernameSchema,
  gender: ['male', 'female'],
  dateOfBirth: String,
  email: { type: String, required: true },
  contact: { type: String, required: true },
  emergencyno: { type: String, required: true },
  blood: ['A+', 'A-', 'B+', 'O+', 'AB+', 'O-', 'AB-', 'O+', 'B-'],
  presentaddress: { type: String, required: true },
  permanentaddress: { type: String, required: true },
  guardian: guardianschema,
  localguardian: localguardianschema,
  profileImg: { type: String },
  isActive: ['active', 'blocked'],
});

// model 
export const StudentModel = model<Student>('Student', studentSchema);