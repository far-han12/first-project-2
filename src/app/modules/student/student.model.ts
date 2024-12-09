import { Schema, model, connect } from 'mongoose';
import validator from 'validator';
import bcrypt from "bcrypt"
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentMethod,
  StudentModel,
  TUserName,
} from './student.interface';
import config from '../../config';
import { boolean } from 'joi';
const usernameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'Name is required'],
    trim: true, //removes space
    // maxlength:[20,"max allowed name is 20"],
    //   validator:{validate:function (value:string) {
    //     const firstNameStr = value.charAt(0).toUpperCase() +value.slice(1)
    //    return firstNameStr === value
    //          //custom validator
    //   } ,message:"{VALUE} is not valid"
    // }
  },
  middleName: {
    type: String,
    trim: true,
    required: [true, 'Name is required'],
  },
  lastName: {
    type: String,
    required: [true, 'Name is required'],
    // validate:{
    //   validator: (value:string) => {
    //     return validator.isAlpha(value)
    //   },message:"{VALUE} is not valid"
    // },
  },
});
const guardianschema = new Schema<TGuardian>({
  fatherName: { type: String, required: true },
  fatherContact: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  motherContact: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
});
const localguardianschema = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactnumber: { type: String, required: true },
  address: { type: String, required: true },
});
const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true ,maxlength:20 },
  name: { type: usernameSchema, required: true },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      // message:"the gender field can only be one of the following:'male','female,'other "
      message: '{VALUE} is not valid',
    },
    required: true,
  },
  dateOfBirth: String,
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => {
        return validator.isEmail(value);
      },
      message: '{VALUE} is not valid email',
    },
  },
  contact: { type: String, required: true },
  emergencyno: { type: String, required: true },
  blood: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'O+', 'AB+', 'O-', 'AB-', 'O+', 'B-'],
  },
  presentaddress: { type: String, required: true },
  permanentaddress: { type: String, required: true },
  guardian: { type: guardianschema, required: true },
  localguardian: { type: localguardianschema, required: true },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
  isDeleted:{
    type:Boolean,
default:false
  }
},{
  toJSON:{
    virtuals:true
  }
});

// virtual
studentSchema.virtual("fullName").get(function(){
  return (
    ` ${this.name.firstName}  ${this.name.middleName } ${this.name.lastName}`
  )
})




// pre save middleware / hook:will work on create() save()

studentSchema.pre("save",async function(next){

  // console.log(this, 'pre hook: we will save the data ');
  
  const user = this; //current document 
  // hashing password and save into db
 user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_round))
 next();
})


// post save middlewares/ hook
studentSchema.post("save",function(doc,next){
  doc.password=''
  console.log( 'post hook: we saved the data ');

  next()
})
// query middleware
studentSchema.pre('find',function(next){
  // console.log(this);
  this.find({isDeleted:{$ne:true}})
  next()
})

studentSchema.pre('findOne',function(next){
  // console.log(this);
  this.find({isDeleted:{$ne:true}})
  next()
})
// query middleware
// [{ '$match': { id: 'STUhjfdg' } }],[{ '$match': { isDELETED:{$ne:true}  }]
studentSchema.pre('aggregate',function(next){
  this.pipeline().unshift({$match:{isDeleted:{$ne:true}}});

  next()
})


// creating a custom static method
studentSchema.statics.isUserExist = async function (id:string) {
  const exisitinguser = await Student.findOne({id})
  return exisitinguser
}


// creating a custom instace 
// studentSchema.methods.isUserExist= async function(id:string){
//   const exisitinguser = await Student.findOne({id})
//   return exisitinguser
// }

// model
export const Student = model<TStudent , StudentModel>('Student', studentSchema);
