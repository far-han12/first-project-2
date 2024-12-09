import { Result } from './../../../../node_modules/arg/index.d';
import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (student: TStudent) => {
    if(await Student.isUserExist(student.id)){
        throw new Error("User already exists")
    }
    
    const result =   await Student.create(student) //built in static method
//   const studentinstance = new Student(student); //create an isntance
//   if(await studentinstance.isUserExist(student.id)){
// throw new Error("User already exists")
//   }
//   const result = await studentinstance.save(); // built in instance method


  return result;
};
const getallstudentsfromDB = async () => {
  const result = await Student.find();
  return result;
};
const getasinglestudents = async (id: string) => {
//   const result = await Student.findOne({ id });
//   return result;
const result = await Student.aggregate([
    {$match:{id:id}}
   
])
return result
};
const deleteastudents = async (id: string) => {
    const result = await Student.updateOne({ id },{isDeleted:true});
    return result;
  };
export const StudentServices = {
  createStudentIntoDB,
  getallstudentsfromDB,
  getasinglestudents,
  deleteastudents
};
