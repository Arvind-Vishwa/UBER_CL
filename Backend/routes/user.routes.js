const express=require('express');
const router=express.Router();
const userController=require('../controllers/user.controller');
const authMiddleware=require('../middlewares/auth.middleware');
const {body}=require('express-validator');


router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name will be at leat 3 character'),
    body('password').isLength({min:6}).withMessage('Password must be correct')
],userController.registerUser);

router.post('/login',[
    body('Email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Enter valid Password')
],
    userController.loginUser
)

router.get('/profile',authMiddleware.authUser,userController.getUserProfile);

router.get('/logout',authMiddleware.authUser,userController.logoutUser);


module.exports=router;