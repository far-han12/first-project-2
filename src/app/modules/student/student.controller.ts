import { Student } from './student.interface';
import { Request, Response } from "express"
import { StudentServices } from "./student.service"

const createStudent = async (req:Request,res:Response)=>{
    try {
        const {student : studentData} = req.body; // Extract student data from the request body
        // Call the service function to send this data to the database
        const result = await StudentServices.createStudentIntoDB(studentData);
    
        // Send response
        res.status(200).json({
          success: true,
          message: "Created successfully",
          data: result,
        });
      } catch (error) {
        console.log(error);
        // Handle errors gracefully
        // res.status(500).json({
        //   success: false,
        //   message: "Failed to create student",
        //   error: error.message,
        // });
      }

}
const getallstudents = async (req:Request, res:Response)=>{
  try {

    const result = await StudentServices.getallstudentsfromDB();

    // Send response
    res.status(200).json({
      success: true,
      message: "all students are retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    // Handle errors gracefully
    // res.status(500).json({
    //   success: false,
    //   message: "Failed to create student",
    //   error: error.message,
    // });
  }

}
const getastudents = async (req:Request, res:Response)=>{
  try {
    const {studentId} = req.params

    const result = await StudentServices.getasinglestudents(studentId);

    // Send response
    res.status(200).json({
      success: true,
      message: "a students are retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    // Handle errors gracefully
    // res.status(500).json({
    //   success: false,
    //   message: "Failed to create student",
    //   error: error.message,
    // });
  }

}

export const  StudentControllers ={
    createStudent,
    getallstudents,getastudents
}