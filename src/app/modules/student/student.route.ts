import express from "express";
import { StudentControllers } from "./student.controller";

const router = express.Router()
// will call controller function 
router.post('/create-student',StudentControllers.createStudent)
router.get("/",StudentControllers.getallstudents)
router.get("/:studentId",StudentControllers.getastudents) //studentIdthese should match other params
export const StudentRoutes = router;