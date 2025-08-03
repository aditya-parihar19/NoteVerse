import mongoose, { mongo } from  "mongoose"

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`)
        console.log("\nMONGODB CONNECTED! ||DB HOST", connection.connection.host)
    } catch (error) {
        console.error("\nMongodb Connection FAILED !! ", error);
        process.exit(1)
    }
}

export default connectDB