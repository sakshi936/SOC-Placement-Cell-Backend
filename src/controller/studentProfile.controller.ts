import mongoose from "mongoose";
import { studentProfileModel } from "../models/studentProfile.model";
import { Request, Response } from "express";
// create a student profile

// export const testingRoute = (req: Request, res: Response) => {
// 	res.send("YUP Working ProperllY !!!!!");
// 	return;
// };

//  create student profile
export const createProfile = async (req: Request, res: Response) => {
	try {
		const profile = await studentProfileModel.create(req.body);

		res.status(201).send({ message: "Student created successfully", profile });
		return;
	} catch (error) {
		res.status(500).send({ message: "Error creating student profile", error: (error as Error).message });
		return;
	}
};

// get student profile by login id

// export const getStudentProfileByUserId = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;

//         // Validate MongoDB ObjectId
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             res.status(400).json({ message: "Invalid ID format" });
//             return;
//         }

//         // Finding student by MongoDB _id
//         const student = await studentProfileModel.findById(id);

//         if (!student) {
//             res.status(404).json({ message: "Student profile not found" });
//             return;
//         }

//         // Return student profile if found
//         res.status(200).json({ message: "Student Profile Found!", student });
//         return;
//     } catch (error) {
//         res.status(500).json({
//             message: "Error: No student found",
//             error: (error as Error).message,
//         });
//         return;
//     }
// };

export const getStudentProfileByUserId = async (req: Request, res: Response) => {
	try {
		// finding student by (mongodb) registration id
		const student = await studentProfileModel.findOne(req.body.id);
		//  return student profile if student profile found
		res.status(201).json({ message: "Student Profile Found!", student });
		return;
	} catch (error) {
		res.status(500).json({ message: "Error: no student found", error: (error as Error).message });
		return;
	}
};

//  get all students
export const getAllStudents = async (req: Request, res: Response) => {
	try {
		const students = await studentProfileModel.find();
		res.status(201).json({ message: "All students details fetched successfully", students });
	} catch (error) {
		res.status(500).json({ message: "Error to fetching students data!", error: (error as Error).message });
		return;
	}
};

// Update a student by ID
export const updateStudent = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const updatedStudent = await studentProfileModel.findByIdAndUpdate(id, req.body, {
			new: true,
		});

		if (!updatedStudent) {
			res.status(404).json({ message: "Student not found" });
			return;
		}

		res.status(200).json({
			message: "Student Profile updated successfully",
			student: updatedStudent,
		});
		return;
	} catch (error) {
		res.status(500).json({ message: "Error: student profile update failed!", error: error.message });
		return;
	}
};
