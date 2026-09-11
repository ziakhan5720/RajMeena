import crypto from 'crypto';
import user from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyEmail } from "../emailVerify/verifyEmail.js";
import { Session } from "../models/sessionModel.js";
import { sendOTPMail } from "../emailVerify/sendOTPMail.js";
export const register = async(req, res)=>{
    try {
        const {firstName, lastName, email, password}= req.body;
        if( !firstName || !lastName|| !email|| !password){
            return res.status(400).json({
                success:false,
                message:"All Feilds are required"
            })
        }
        const existinguser= await user.findOne({email})
        if(existinguser){
            return res.status(400).json({
                success:false,
                message:"User already exists"
            })
        }
        const hashPassword = await bcrypt.hash(password, 8)
        const newUser=await user.create({
            firstName,
            lastName,
            email,
            password: hashPassword
        }) 
        const token = jwt.sign({id:newUser._id}, process.env.SECRET_KEY,{expiresIn:'10m'})
        verifyEmail(token, email)
        newUser.token= token
        await newUser.save();
const safeUser = (({password, token, otp, otpExpiry, resetPasswordToken, resetPasswordExpiry, ...rest}) => rest)(newUser.toObject());
        return res.status(201).json({
            success:true,
            message:'user registered successfully',
            user:safeUser
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const verify = async (req, res)=>{
    try {
        const authHeader = req.headers.authorization
        if(!authHeader|| !authHeader.startsWith("Bearer ")){
            return res.status(400).json({
                success:false,
                message:"authorization token is missing or invalid"
            })
        }
        const token= authHeader.split(" ")[1]
        let decoded
        try {
            decoded= jwt.verify(token, process.env.SECRET_KEY)
        } catch (error) {
            if(error.name==="TokenExpiredError"){
                return res.status(400).json({
                     success:false,
                    message:"The registration token has expired"
                })
               
            }
            return res.status(400).json({
                success:false,
                message:"token verification failed"
            })
        }
        const existinguser= await user.findById(decoded.id)
        if(!existinguser){
            return res.status(400).json({
                success:false,
                message:"user does not found"
            })
        }
        existinguser.token=null
        existinguser.isVerified= true
        await existinguser.save()
        return res.status(200).json({
            success:true,
            message:"Email Verified"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message :error.message
        })
    }
}

export const reVerify = async(req, res)=>{
    try {
        const {email}= req.body;
        const existingUser= await user.findOne({email});
        if(!existingUser){
            return res.status(400).json({
                success:false,
                message: "User not found"
            })
        }
       const token = jwt.sign({id:existingUser._id}, process.env.SECRET_KEY,{expiresIn:'10m'})
        verifyEmail(token, email)
        existingUser.token= token
        await existingUser.save()
        return res.status(200).json({
            success:true,
            message:"email verification sent again successfully",
            token:existingUser.token
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const login = async(req, res)=>{
    try {
        const {email, password}= req.body;
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message:"all feilds are required"
            })
        }
        const existingUser= await user.findOne({email})
        if(!existingUser){
            return res.status(400).json({
                success:false,
                message: "User don't exists"
            })
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password)
        if(!isPasswordValid){
            return res.status(400).json({
                success:false,
                message:"Invalid Credentials"
            })
        }
        if(existingUser.isVerified=== false){
             return res.status(400).json({
                success:false,
                message:"Verify your account then login"
        })
    }   
   
     const accessToken= jwt.sign({id:existingUser._id}, process.env.SECRET_KEY, {expiresIn:'10d'})
      const refreshToken= jwt.sign({id:existingUser._id}, process.env.SECRET_KEY, {expiresIn:'30d'})

      existingUser.isLoggedIn = true
      await existingUser.save()

      const existingSession= await Session.findOne({userId:existingUser._id})
      if(existingSession){
        await Session.deleteOne({userId:existingUser._id})
      }

      await Session.create({userId:existingUser._id})
      const safeLoginUser = (({password, token, otp, otpExpiry, resetPasswordToken, resetPasswordExpiry, ...rest}) => rest)(existingUser.toObject());
      return res.status(200).json({
        success:true,
        message:`Welcome back, ${existingUser.firstName}`,
        user:safeLoginUser,
        accessToken,
        refreshToken
      })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const logout = async(req, res)=>{
    try {
        const userId= req.id
        await Session.deleteMany({userId:userId})
        await user.findByIdAndUpdate(userId,{isLoggedIn:false})
        return res.status(200).json({
            success: true,
            message: "User logged out successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const forgetPassword= async(req, res)=>{
    try {
        const {email}=req.body;
        const User =await user.findOne({email})
        if(!User){
            return res.status(400).json({
                success:false,
                message:"user not found"
            })
        }
        const otp= Math.floor(100000+ Math.random()*900000).toString()
        const otpExpiry= new Date(Date.now()+10*60*1000)
        User.otp= otp
        User.otpExpiry=otpExpiry

        await User.save()
        await sendOTPMail(otp,email)
        return res.status(200).json({
            success:true,
            message:"Otp send successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
     } )}
}

export const verifyOTP= async(req, res)=>{
    try {
        const {otp}= req.body;
        const email=req.params.email;
        if(!otp){
            return res.status(400).json({
                success:false,
                message:'otp is required'
            })
        }
        const User= await user.findOne({email})
        if(!User){
            return res.status(400).json({
                success:false,
                message:"user not found"
            })
        }
        if(!User.otp|| !User.otpExpiry){
            return res.status(400).json({
                success:false,
                message:'otp is not generated or already verified'
            })
        }
        if(User.otpExpiry< new Date()){
            return res.status(400).json({
                success:false,
                message:"otp expired please request for new otp"
        })
    }
    if(otp !== User.otp){
        return res.status(400).json({
            success:false,
            message:"otp is invalid"
        })
    }
    User.otp=null
    User.otpExpiry=null
    // Generate a secure reset token valid for 10 minutes
    const plainToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(plainToken).digest('hex');
    User.resetPasswordToken = hashedToken;
    User.resetPasswordExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await User.save()
    return res.status(200).json({
        success:true,
        message:'otp verified successfully',
        resetToken: plainToken
    })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
     } )
    }
}
export const changePassword = async(req, res)=>{
    try {
        const {resetToken, newPassword, confirmPassword} = req.body;
        const {email} = req.params;

        if(!resetToken || !newPassword || !confirmPassword){
            return res.status(400).json({
                success:false,
                message:"resetToken, newPassword, and confirmPassword are all required"
            });
        }
        if(newPassword !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Passwords do not match"
            });
        }
        if(newPassword.length < 8){
            return res.status(400).json({
                success:false,
                message:"Password must be at least 8 characters"
            });
        }

        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        const User = await user.findOne({
            email,
            resetPasswordToken: hashedToken,
            resetPasswordExpiry: { $gt: new Date() }
        });
        if(!User){
            return res.status(400).json({
                success:false,
                message:"Invalid or expired reset token"
            });
        }

        User.password = await bcrypt.hash(newPassword, 10);
        User.resetPasswordToken = null;
        User.resetPasswordExpiry = null;
        await User.save();
        return res.status(200).json({
            success:true,
            message:"Password changed successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}
export const allUser = async(req, res)=>{
    try {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
        const skip = (page - 1) * limit;
        const [users, totalUsers] = await Promise.all([
            user.find().select('-password -token -otp -otpExpiry -resetPasswordToken -resetPasswordExpiry').skip(skip).limit(limit),
            user.countDocuments()
        ]);
        return res.status(200).json({
            success:true,
            users,
            totalUsers,
            totalPages: Math.ceil(totalUsers / limit),
            currentPage: page
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

export const getUserbyId= async(req, res)=>{
    try {
        const {userId}= req.params;
        // Only allow the user themselves or an admin
        if(req.user._id.toString() !== userId && req.user.role !== 'admin'){
            return res.status(403).json({
                success:false,
                message:"Forbidden"
            });
        }
        const User= await user.findById(userId).select("-password -otp -otpExpiry -token -resetPasswordToken -resetPasswordExpiry")
        if(!User){
            return res.status(404).json({
                success:false,
                message:"user not found"
            })
        }
        return res.status(200).json({
            success:true,
            User,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { firstName, lastName, address, city, zipCode, phoneNo } = req.body;
        const User = await user.findById(req.id);
        if (!User) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        if (firstName !== undefined) User.firstName = firstName;
        if (lastName !== undefined) User.lastName = lastName;
        if (address !== undefined) User.address = address;
        if (city !== undefined) User.city = city;
        if (zipCode !== undefined) User.zipCode = zipCode;
        if (phoneNo !== undefined) User.phoneNo = phoneNo;

        await User.save();

        const updatedUser = await user.findById(req.id).select("-password -otp -otpExpiry -token");

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}