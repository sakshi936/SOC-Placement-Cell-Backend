import express from "express";
import { Express, Request, Response, NextFunction } from "express";
import connectDB from "./db";
import dotenv from "dotenv";
import { StudentLogin } from "./models/studentLoginData.model";

dotenv.config({
	path: "./.env",
});

const PORT = process.env.PORT || 7000;
const app: Express = express();
app.use(express.json());

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

// app.get("/api/login", (req: Request, res: Response) => {
// 	res.send("Successfully Loggedin with TypeScript");
// });

interface LoginReqBody {
	email: string;
	password: string;
}

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
		}

		// Find the student by email
		const student = await StudentLogin.findOne({ email }); // StudentLogin Model
		if (!student) {
			res.status(404).send({ message: "Student not found with this email id!! " });
		}

		// Check if the provided password matches the student's DOB
		const formattedDOB = new Date(student.dob).toISOString().split("T")[0]; // Format DOB as 'YYYY-MM-DD'
		if (password !== formattedDOB) {
			res.status(401).send({ message: "Invalid password" });
		}

		// If the email and password match, return success
		res.status(200).send({ message: "Login successful", student });
	} catch (error) {
		res.status(500).send({ message: "Server error", error: (error as Error).message });
	}
});

// POST request to register a student by email, DOB, name and course
app.post("/api/register", async (req: Request, res: Response) => {
	try {
		const { name, email, dob, course } = req.body;

		if (!name || !email || !dob || !course) res.status(400).send({ message: "all feilds are required!" });

		const newStudent = await StudentLogin.create({
			name,
			dob,
			email,
			course,
		});

		res.status(201).send({ messgae: "Student Successfully added!" });
	} catch (error) {
		res.status(500).send({ message: "Server error", error: (error as Error).message });
	}
});
