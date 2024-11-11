import mongoose from "mongoose";

const connectDB = async () => {
	const dburl = process.env.MONGODB_URI.toString();
	try {
		const connectionInstance = await mongoose.connect(dburl);
		console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
	} catch (error) {
		console.log("MONGODB connection FAILED In DB", error);
		process.exit(1);
	}
};

export default connectDB;
