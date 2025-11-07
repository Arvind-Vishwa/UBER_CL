const express=require('express');
const router=express.Router();
const userController=require('../controllers/user.controller');
const {body}=require('express-validator');


router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name will be at leat 3 character'),
    body('password').isLength({min:6}).withMessage('Password must be correct')
],userController.registerUser);




module.exports=router;