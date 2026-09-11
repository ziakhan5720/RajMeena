import express from "express";
import { allUser, changePassword, forgetPassword, getUserbyId, login, logout, register, reVerify, verify, verifyOTP, updateProfile } from "../controllers/userController.js";
import { isAdmin, isAuthenticated } from "../middleware/isAuthenticated.js";
import { authRateLimiter } from "../middleware/rateLimiter.js";

const router = express.Router()
router.post(`/register`, authRateLimiter, register)
router.post(`/verify`, verify)
router.post(`/reVerify`, authRateLimiter, reVerify)
router.post(`/login`, authRateLimiter, login)
router.post(`/logout`,isAuthenticated, logout)
router.post('/forget_password', authRateLimiter, forgetPassword)
router.post('/verify_otp/:email', authRateLimiter, verifyOTP)
router.post('/change_password/:email', authRateLimiter, isAuthenticated, changePassword)
router.get('/alluser',isAuthenticated,isAdmin, allUser)
router.get('/getuser/:userId', isAuthenticated, getUserbyId)
router.put('/update', isAuthenticated, updateProfile)
export default router