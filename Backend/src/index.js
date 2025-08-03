import {app} from  "./app.js"
import dotenv from "dotenv";
import connectDB from "./db/connection.js"

dotenv.config({
    path: "./env"
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 3000 ,() => {
        console.log("\nServer is Running at PORT: ", process.env.PORT)
    })
})
.catch((error) => {
    console.error("\nMONGODB CONNECTION FAILED !!! ", error);
})