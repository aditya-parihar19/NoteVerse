import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from  "../utils/ApiResponse.js"
import { User } from "../models/user.model.js"
import jwt from "jsonwebtoken"

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    user.save({validateBeforeSave: false})

    return {accessToken, refreshToken}

  } catch (error) {
    throw new ApiError(500, "Something went wrong, while generating access and refresh token!")
  }
}

const options = {
  httpOnly: true,
  secure: true
}

const registerUser = asyncHandler( async (req, res) => {
  // console.log(req)
  const { name, email, password, role } = req.body

  if([name, email, password].some((field) => field?.trim() === "")){
    throw new ApiError(400, "All field are required")
  }

  const existedUser = await User.findOne({email})

  if(existedUser){
    throw new ApiError(409, "User with email already exists")
  }

  const user = await User.create({
    name, email, password, role
  })

  const createdUser = await User.findById(user._id).select("-refresh_token")

  if(!createdUser){
    throw new ApiError(500, "something went wrong while registering user");
  }

  res.status(201).json(
    new ApiResponse(200, createdUser, "User registered successfully")
  )

})

const loginUser = asyncHandler( async (req, res) => {

  const { email, password } = req.body

  if(!email){
    throw new  ApiError(400, "Email must be required")
  }

  const user = await User.findOne({email})

  if(!user){
    throw new ApiError(404, "user does not exist")
  }
  const isPasswordCorrect = await user.isPasswordCorrect(password)

  if(!isPasswordCorrect){
    throw new ApiError(401, "Invalid user credentials")
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

  const loggedinUser = await User.findById(user._id).select("-password -refreshToken")

  return  res.status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json( new ApiResponse (200, {loggedinUser, accessToken, refreshToken}, "User Logged In successfull"))

})

const logoutUser = asyncHandler( async (req, res) => {

  await User.findByIdAndUpdate(
    req.user._id,
    { $unset: { refreshToken: 1 } },
    { new: true }
  );

  res.status(200)
  .clearCookie("accessToken", options)
  .clearCookie("refreshToken", options)
  .json(
    new ApiResponse(200, {}, "User Logged out successfully!")
  )
})

const refreshAccessToken = asyncHandler( async (req, res) => {

  const incomingRefreshToken = req.cookies?.refreshToken || req.body.refreshToken

  if(!incomingRefreshToken){
    throw new ApiError(401, "Unauthorized request")
  }

  try {
    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

    const user = await User.findById(decodedToken?._id)
    if(!user){
      throw new ApiError(401, "Invalid refresh-token")
    }

    if(incomingRefreshToken !== user?.refreshToken){
      throw new ApiError(401, "Refresh token is expired or used")
    }

    const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshToken(user._id)

    res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", newRefreshToken, options)
    .json(
      new ApiResponse(200, {accessToken, refreshToken: newRefreshToken}, "Access token refreshed")
    )

  } catch (error) {
    throw new ApiError(401, error.message || "Invalid  refresh-token")
  }
})

const getCurrentUser = asyncHandler( async (req, res) => {
  res.status(200)
  .json(
    new ApiResponse(200, req.user, "User fetched successfully")
  )
})


export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
}