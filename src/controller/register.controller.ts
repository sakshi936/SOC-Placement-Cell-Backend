import { StudentLogin } from "../models/studentLoginData.model";
import { Request, Response } from "express";

export const registerStundent = async (req: Request, res: Response) => {
	try {
		const { name, email, dob, course } = req.body;

		if (!name || !email || !dob || !course) return res.status(400).send({ message: "all feilds are required!" });

		const newStudent = await StudentLogin.create({
			name,
			dob,
			email,
			course,
		});

		res.status(201).json({ messgae: "Student Successfully added!" });
	} catch (error) {
		res.status(500).json({ message: "Server error", error: (error as Error).message });
	}
};
