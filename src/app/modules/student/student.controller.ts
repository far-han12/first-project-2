import { TStudent } from './student.interface';
import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import Joi from 'joi';
import { z } from 'zod';
import studentSchema from './student.validation';

// import studentSchema from './student.validation';
const createStudent = async (req: Request, res: Response) => {
  try {
    // creating a schema validation using Zod

    const { student: studentData } = req.body;
    //         // data validation using joi
    // data validation using Zod
    const zodparsedData = studentSchema.parse(studentData);

    // const{value,error}=studentSchema.validate(studentData)
    const result = await StudentServices.createStudentIntoDB(zodparsedData);
    // console.log({error});
    // console.log({value});
    // if(error){
    //   res.status(500).json({
    //     success: false,
    //     message: "Failed to create student",
    //     error:error.details
    //   });
    // }

    // console.log(req.body); // Extract student data from the request body
    // Call the service function to send this data to the database

    // Send response
    res.status(200).json({
      success: true,
      message: 'Created successfully',
      data: result,
    });
  } catch (error:any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message:error.message || 'Failed to create student',
      error: error,
    });
  }
};
const getallstudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getallstudentsfromDB();

    // Send response
    res.status(200).json({
      success: true,
      message: 'all students are retrieved successfully',
      data: result,
    });
  } catch (error:any) {
    // Handle errors gracefully
    res.status(500).json({
      success: false,
      message: "Failed to create student",
      error: error.message,
    });
  }
};
const getastudents = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.getasinglestudents(studentId);

    // Send response
    res.status(200).json({
      success: true,
      message: 'a students are retrieved successfully',
      data: result,
    });
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: "Failed to create student",
      error: error.message,
    });
  }
};
const deletestudentsingle = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.deleteastudents(studentId);

    // Send response
    res.status(200).json({
      success: true,
      message: 'a students is deleted successfully',
      data: result,
    });
  } catch (error:any) {
    res.status(500).json({
      success: false,
      message: "Failed to delete student",
      error: error.message,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getallstudents,
  getastudents,
  deletestudentsingle
};
