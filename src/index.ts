import express from "express";
import { Express, Request, Response, NextFunction } from "express";
// const cors = require('cors');
import cors from "cors";
import connectDB from "./db";
import dotenv from "dotenv";
import { StudentLogin } from "./models/studentLoginData.model";
import { LoginReqBody, studentData } from "./types";
import studentRoutes from "./routers/studentProfile.route";
dotenv.config({
	path: "./.env",
});

const PORT = process.env.PORT || 7000;
const app: Express = express();
app.use(express.json());

app.use(cors({
	origin: 'http://localhost:3000', // Allow requests from this origin
	methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
	credentials: true, // If your frontend requires cookies or authorization headers
}));

// Database connection
connectDB()
	.then(() => {
		app.on("errror", (error) => {
			console.log("ERROR on Express app: ", error);
			throw error;
		});
		app.listen(PORT, () => {
			console.log(`Server is running at port : ${PORT}`);
		});
	})
	.catch((err) => {
		console.log("MONGO db connection failed !!!", err);
	});

app.get("/api/login", (req: Request, res: Response) => {
	res.send("Successfully Loggedin with TypeScript");
});

// POST request to search for a student by email and match the password with DOB
app.post("/api/login", async (req: Request, res: Response) => {
	try {
		// Cast req.body to LoginReqBody
		const { email, password } = req.body as LoginReqBody;

		// console.log(email);
		// console.log(password);
		// res.status(200).send({ message: "Login successful" });

		// Check if both email and password are provided
		if (!email || !password) {
			res.status(400).send({ message: "Email and password are required" });
			return;
		}

		// Find the student by email
		const student = await StudentLogin.findOne({ email }); // StudentLogin Model
		if (!student) {
			res.status(404).send({ message: "Student not found with this email id!! " });
			return;
		}

		// Check if the provided password matches the student's DOB
		const formattedDOB = new Date(student.dob).toISOString().split("T")[0]; // Format DOB as 'YYYY-MM-DD'
		if (password !== formattedDOB) {
			res.status(401).send({ message: "Invalid password" });
			return;
		}

		// If the email and password match, return success
		res.status(200).send({ message: "Login successful", student });
		return;
	} catch (error) {
		res.status(500).send({ message: "Server error", error: (error as Error).message });
		return;
	}
});

// POST request to register a student by email, DOB, name and course
app.post("/api/register", async (req: Request, res: Response) => {
	try {
		const students = req.body; // students must be an array of students

		students.forEach((student: studentData) => {
			if (!student.name || !student.email || !student.dob || !student.course) res.status(400).send({ message: "all feilds are required!" });
		});
		// if (!name || !email || !dob || !course) res.status(400).send({ message: "all feilds are required!" });

		const newStudent = await StudentLogin.insertMany(students);

		res.status(200).send({ messgae: "Student Successfully added!" });
		return;
	} catch (error) {
		res.status(500).send({ message: "Server error", error: (error as Error).message });
		return;
	}
});

// Routes
app.use("/api/student", studentRoutes); // Use the student routes
