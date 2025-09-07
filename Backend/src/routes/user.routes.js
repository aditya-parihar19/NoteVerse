import { Router } from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { 
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
  forgotPassword,
  resetPassword,
  deleteUser,
  getAllUsers 
} from "../controllers/user.controller.js"

const router = Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/forgot-password").post(forgotPassword)
router.route("/reset-password").patch(resetPassword)
router.route("").get(getAllUsers)

// Secure routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/delete").delete(verifyJWT, deleteUser)

export default router;