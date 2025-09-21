import { Router } from  "express"
import { verifyJWT } from  "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"
import {
  getAllMaterial,
  uploadMaterial,
  updateMaterial,
  getMaterial,
  deleteMaterial
} from  "../controllers/studyMaterial.controller.js"

const router = Router()

router.route("").get(getAllMaterial)
router.route("/upload").post(verifyJWT, upload.fields([{ name: "file", maxCount: 1 }]) ,uploadMaterial)
router.route("/update/:materialId").patch(verifyJWT, updateMaterial)
router.route("getMaterial/:materialId").get(getMaterial)
router.route("delete/:materialId").delete(verifyJWT, deleteMaterial)

export default router