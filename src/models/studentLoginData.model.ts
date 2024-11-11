import mongoose from "mongoose";

const studentLoginSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	dob: {
		type: Date,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true, // Ensures email uniqueness
	},
	course: {
		type: String,
		required: true,
	},
});

export const StudentLogin = mongoose.model("StudentLogin", studentLoginSchema);
