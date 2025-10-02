import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { errorHandler } from "./middlewares/errorHandler.middleware.js"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())

// Routes import
import userRoutes from "./routes/user.routes.js"
import studyMaterialRoutes from "./routes/studyMaterial.routes.js"

// Define routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/studyMaterials", studyMaterialRoutes)

app.use(errorHandler)

export {app}