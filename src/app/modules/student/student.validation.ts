// import Joi from 'joi';

// // Username schema
// const usernameSchema = Joi.object({
//   firstName: Joi.string()
//     .trim()
//     .max(20)
//     .required()
//     .custom((value, helpers) => {
//       const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
//       if (firstNameStr !== value) {
//         return helpers.message(`"${value}" is not valid`);
//       }
//       return value;
//     }, 'Custom capitalization validation'),
  
//   middleName: Joi.string().trim().required(),

//   lastName: Joi.string()
//     .required()
//     .custom((value, helpers) => {
//       if (!/^[A-Za-z]+$/.test(value)) {
//         return helpers.message(`"${value}" is not valid`);
//       }
//       return value;
//     }, 'Alphabet-only validation')
// });

// // Guardian schema
// const guardianSchema = Joi.object({
//   fatherName: Joi.string().required(),
//   fatherContact: Joi.string().required(),
//   fatherOccupation: Joi.string().required(),
//   motherContact: Joi.string().required(),
//   motherName: Joi.string().required(),
//   motherOccupation: Joi.string().required()
// });

// // Local Guardian schema
// const localGuardianSchema = Joi.object({
//   name: Joi.string().required(),
//   occupation: Joi.string().required(),
//   contactnumber: Joi.string().required(),
//   address: Joi.string().required()
// });

// // Student schema
// const studentSchema = Joi.object({
//   id: Joi.string().required(),
  
//   name: usernameSchema.required(),
  
//   gender: Joi.string().valid('male', 'female', 'other').required(),
  
//   dateOfBirth: Joi.string().optional(), // Optional field
  
//   email: Joi.string()
//     .email()
//     .required()
//     .messages({ 'string.email': '"{#value}" is not a valid email' }),
  
//   contact: Joi.string().required(),
  
//   emergencyno: Joi.string().required(),
  
//   blood: Joi.string().valid('A+', 'A-', 'B+', 'O+', 'AB+', 'O-', 'AB-', 'B-').optional(),
  
//   presentaddress: Joi.string().required(),
  
//   permanentaddress: Joi.string().required(),
  
//   guardian: guardianSchema.required(),
  
//   localguardian: localGuardianSchema.required(),
  
//   profileImg: Joi.string().uri().optional(), // Assuming profileImg is a URL
  
//   isActive: Joi.string().valid('active', 'blocked').default('active')
// });

// export default studentSchema;
import { PassThrough } from 'stream';
import { z } from 'zod';

// Username schema
const usernameSchema = z.object({
  firstName: z.string()
    .trim()
    .max(20, { message: "Maximum length for firstName is 20 characters" })
    .refine(value => value.charAt(0) === value.charAt(0).toUpperCase(), {
      message: "First letter must be capitalized"
    }),
  
  middleName: z.string().trim().nonempty({ message: 'Middle name is required' }),

  lastName: z.string()
    .nonempty({ message: 'Last name is required' })
    .refine(value => /^[A-Za-z]+$/.test(value), { 
      message: 'Last name must contain only alphabetic characters' 
    })
});

// Guardian schema
const guardianSchema = z.object({
  fatherName: z.string().nonempty({ message: 'Father name is required' }),
  fatherContact: z.string().nonempty({ message: 'Father contact is required' }),
  fatherOccupation: z.string().nonempty({ message: 'Father occupation is required' }),
  motherContact: z.string().nonempty({ message: 'Mother contact is required' }),
  motherName: z.string().nonempty({ message: 'Mother name is required' }),
  motherOccupation: z.string().nonempty({ message: 'Mother occupation is required' })
});

// Local Guardian schema
const localGuardianSchema = z.object({
  name: z.string().nonempty({ message: 'Local guardian name is required' }),
  occupation: z.string().nonempty({ message: 'Occupation is required' }),
  contactnumber: z.string().nonempty({ message: 'Contact number is required' }),
  address: z.string().nonempty({ message: 'Address is required' })
});

// Student schema
const studentSchema = z.object({
  id: z.string().nonempty({ message: 'ID is required' }),
  password:z.string().max(30),
  name: usernameSchema,
  
  gender: z.enum(['male', 'female', 'other'], { 
    errorMap: () => ({ message: 'Gender must be one of male, female, or other' }) 
  }),

  dateOfBirth: z.string().optional(),

  email: z.string()
    .email({ message: 'Invalid email address' })
    .nonempty({ message: 'Email is required' }),
  
  contact: z.string().nonempty({ message: 'Contact is required' }),
  
  emergencyno: z.string().nonempty({ message: 'Emergency number is required' }),

  blood: z.enum(['A+', 'A-', 'B+', 'O+', 'AB+', 'O-', 'AB-', 'B-']).optional(),

  presentaddress: z.string().nonempty({ message: 'Present address is required' }),
  
  permanentaddress: z.string().nonempty({ message: 'Permanent address is required' }),

  guardian: guardianSchema,
  
  localguardian: localGuardianSchema,
  
  profileImg: z.string().url({ message: 'Invalid URL format for profile image' }).optional(),
  
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleted:z.boolean().default(false)
});

export default studentSchema;
