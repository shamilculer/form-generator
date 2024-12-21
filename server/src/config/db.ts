import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("Established connection with MongoDB")
    } catch (error) {
        console.error("Error establishing connection with MongoDB", error);
        process.exit(1)
    }
}

export default connectDb