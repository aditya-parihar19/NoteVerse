import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async function(localFilePath) {
  try {
    if(!localFilePath) return null;

    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "raw"
    })

    console.log("\nFile is uploaded on cloudinary ", result.url);
    fs.unlinkSync(localFilePath);
    return result;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
}

const deleteFromCloudinary = async function(cloudinaryUrl){
  try {
    const publicId = cloudinaryUrl.spilt("/").pop().spilt(".")[0];

    const result = await cloudinary.uploader.destroy(publicId)
    console.log("File deleted from cloudinary", result)
    return result
  } catch (error) {
    console.error("Error while deleting: ",  error)
    return null
  }
}

export  {uploadOnCloudinary, deleteFromCloudinary}