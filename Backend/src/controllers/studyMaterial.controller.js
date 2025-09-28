import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from  "../utils/ApiResponse.js"
import { StudyMaterial } from "../models/studyMaterial.model.js"
import { uploadOnCloudinary, deleteFromCloudinary } from  "../utils/cloudinary.js"
import { isValidObjectId } from "mongoose"

const getAllMaterial = asyncHandler( async(req, res) => {
  const { title, type, semester, course, branch, subject, page = 1, per = 10,  sort = 'asc'} = req.query

  const match = {}

  if(title) match.title = { $regex: title, $options: "i" };
  if(type) match.type = type 
  if(semester) match.semester = semester
  if(course) match.course = course
  if(branch) match.branch = branch
  if(subject) match.subject = subject

  const sortOrder = sort === "asc" ? 1 :  -1
  const skip = (parseInt(page) - 1) * parseInt(per);

  const pipeline = [
  { $match: match },
  { $sort: { createdAt: sortOrder } },
  { $skip: skip },
  { $limit: parseInt(per) },
  { $project: {
      title: 1,
      type: 1,
      subject: 1,
      branch: 1,
      semester: 1,
      file: 1,
      uploaded_by: 1,
      createdAt: 1
  }}
  ];
  
  const study_materials = await StudyMaterial.aggregate(pipeline);

  res.json(new ApiResponse(200, study_materials, "Study materials fetched successfully"));
})

const uploadMaterial = asyncHandler( async(req, res) => {

  const { title, type, subject, course, branch, semester} = req.body
  
  if([title, type, subject, course, branch, semester].some( (field) => field?.trim() === "" )){
    throw new ApiError(400, "All fields are required")
  }

  console.log(req?.files)
  const fileLocalPath = req?.files?.file[0]?.path
  
  if(!fileLocalPath){
    throw new  ApiError(400, "File is required")
  }

  const file = await uploadOnCloudinary(fileLocalPath)

if(!file) {
    throw  new ApiError(500, "Something went wrong, while uploading file")
  }

  const study_material = await StudyMaterial.create({
    title, 
    type, 
    subject, 
    course, 
    branch, 
    semester,
    file: file.url,
    uploaded_by: req.user._id
  })

  if(!study_material) throw new ApiError(500, "Something went wrong, while saving material")

  res.json(
    new ApiResponse(201, study_material, "Material uploaded successfully")
  )

})

const updateMaterial = asyncHandler( async(req, res) => {

  const { materialID } = req.params
  const { title, type, subject, course, branch, semester } = req.body
  const newFilePath = req?.file?.path

  if(!materialID || !isValidObjectId(materialID)){
    throw new ApiError(400, "Invalid material id")
  }

  if([title, type, subject, course, branch, semester].some( (field) => !field || field.trim() === "")){
    throw new ApiError(400, "All fields are required")
  }

  if(!newFilePath){
    throw new ApiError(400, "File is required")
  }

  const study_material = await StudyMaterial.findById(materialID)
  
  if(!study_material){
    throw new ApiError(404, "Material not found")
  }

  if(!study_material.uploaded_by.equals(req.user._id)){
    throw new ApiError(403, "You are not authorized to update material")
  }

  const cloudinary_result = await deleteFromCloudinary(study_material?.file)

  if(cloudinary_result !== "ok"){
    throw new ApiError(500, "Failed to delete old file from Cloudinary")
  }

  const new_file = await uploadOnCloudinary(newFilePath)

  if(!new_file){
    throw new ApiError(500, "Something went wrong, while uploading file")
  }

  const new_study_material = await StudyMaterial.updateOne({
    title,
    type,
    subject,
    course,
    branch,
    semester,
    file: new_file.url,
    uploaded_by: req.user._id
  })

  if(!new_study_material){
    throw new ApiError(500, "Something went wrong, while updating material")
  }

  res.json(
    new ApiResponse(200, "Material updated successfully")
  )
})

const getMaterial = asyncHandler( async(req, res) => {

  const { materialID } = req.params
  
  if(!materialID || !isValidObjectId(materialID)){
    throw new ApiError(400, "Invalid material id")
  }

  const study_material = await StudyMaterial.findById(materialID)

  if(!study_material){
    throw new ApiError(404, "Study material not found")
  }

  res.json(
    new ApiResponse(200, study_material, "Study material fetched successfully")
  )
})

const deleteMaterial = asyncHandler( async(req, res) => {

  const { materialID } = req.params

  if(!materialID || !isValidObjectId(materialID)){
    throw  new ApiError(400, "Invalid material id")
  }

  const study_material = await StudyMaterial.findById(materialID)

  if(!study_material){
    throw new  ApiError(404, "Study material not found")
  }

  if(!study_material.uploaded_by.equals(req.user._id)){
    throw new  ApiError(403, "You are not authorized to delete this file")
  }

  const cloudinary_result = await deleteFromCloudinary(study_material.file)

  if(cloudinary_result !== "ok"){
    throw new ApiError(500, "Failed to delete file from Cloudinary")
  }
  await StudyMaterial.deleteOne({ _id: materialID })

  res.json(
    new ApiResponse(200, "Study material deleted successfully")
  )
})

export {
  getAllMaterial,
  uploadMaterial,
  updateMaterial,
  getMaterial,
  deleteMaterial
}