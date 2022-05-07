const express = require('express');
const router = express.Router();
const voterController = require('../controller/voterController');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('../mongoConnect/connection')
const User = require('../model/admin');
router.get('/', (req, res, next) => {
    res.send('<h1 style ="display:block;margin-top:30px;color:blue;text-align:center">Welcome to Dashboard</h1>');
});
router.post('/register', async (req, res, next) => {
    const { name, email, password, cpassword } = req.body;
    if (!name || !email || !password || !cpassword) {
        return res.status(422).json({ message: "Please fill all the required field" });
    };
    //USING ASYNC-AWAIT FUNCTION 
    try {
        const alreadyExist = await User.findOne({ email: email });
        //-->FIRST PROMISE
        if (alreadyExist) {
            return res.status(422).json({ error: "Email already exist" });
        }
        else if (password != cpassword) {
            res.status(422).json({ message: "Password doesn't match" });
        } else {
            const user = new User({ name, email, password, cpassword });
            const registered = await user.save();//-->SECOND PROMISE
            if (registered) {
                res.status(201).json({ message: "user created successfully" });
            }
        }
    } catch (err) {
        console.log(err);
    }
});
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ err: "Fill the required field" });
        }
        const userLogin = await User.findOne({ email: email });
        const isMatch = await bcrypt.compare(password, userLogin.password);
        let token = await userLogin.generateAuthToken();
        res.cookie('jwtoken', token, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly: false// change it to true when deployed
        });
        if (!isMatch) {
            res.json({ error: "Email or Password is incorrect" });
        } else {
            res.json({ message: "logged-in successfully" });
        }
    }
    catch (err) {
        console.log(err);

    }
});
const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jwttoken;
        const verifyToken = jwt.verify(token, process.enc.SECRET_KEY);
        const adminUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token });
        if (!adminUser) { res.send(401).json({ message: "User account doesn't exist" }); }
        req.token = token;
        req.adminUser = adminUser;
        req.userID = adminUser._id;
    }
    catch (err) {
        res.status(401).json({ message: "Unauthorized User" });
    }
    next();
};

router.get('/get-all', voterController.fetchAllVoters);
router.post('/edit',voterController.addVoter);
router.get('/:id', voterController.getVoter);
router.put('/edit/:id', voterController.updateVoter);
router.delete('/edit/:id', voterController.deleteVoter);
router.get('/logout', (req, res) => {
console.log("user logged out");
    res.clearCookie('jwtoken');
    res.status(200).json({message:'User logged out'});
});
module.exports = router;