import express from 'express';
import { getAdmins, getMyProfile, login, logout, register, resetPasswordWithoutToken, sendotp, verifyotp } from '../controllers/user.controller.js';
import { isAuthenticated } from '../middleware/authUser.js';

const router=express.Router();

router.post("/ragister",register);
router.post("/login",login);
router.get("/logout",isAuthenticated,logout);
router.get("/myprofile",isAuthenticated,getMyProfile);
router.get("/admin",getAdmins);


router.post("/send-otp",sendotp);
router.post("/verify-otp",verifyotp);
router.post("/reset-password",resetPasswordWithoutToken);


// router.get("/myprofile",isAuthenticated,getMyProfile);

    


export default router;