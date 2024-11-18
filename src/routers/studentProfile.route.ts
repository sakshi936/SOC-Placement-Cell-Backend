import { Router, Response, Request } from "express";
import { createProfile, getAllStudents, getStudentProfileByUserId, updateStudent } from "../controller/studentProfile.controller";

const router = Router();

// router.get("/createprofile", testingRoute);
router.post("/", createProfile);
router.post("/profile", getStudentProfileByUserId);
router.get("/profiles", getAllStudents);
router.put("/update/:id", updateStudent);
export default router;
