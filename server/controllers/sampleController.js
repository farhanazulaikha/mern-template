const SampleModel = require('../models/SampleModels');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// sample to verify user
const verifyUser = async(req, res, next) => {
    try {
        const token = req.cookies.token;
        const { id } = req.params;
        let foundUser;

        if(!token) {
            return res.status(401).json("the token was not available")
        }
        else {
            foundUser = await SampleModel.findOne({_id: id});
            if(foundUser) {
                return res.status(200).json({
                    message: "Success",
                })
            }
            jwt.verify(token, "jwt-secret-key", (err, decoded) => {
                if(err) return res.status(401).json("Token is wrong");
                next();
            })
        }

       }
    catch(err) {
        return res.status(500).json(err);
    }
}

// sample to register user
const registerUser = async(req, res) => {

    const {fullName, email, password} = req.body;

    SampleModel.findOne({email: email}).
    then(foundUser => {
        if(foundUser) {
            res.status(400).json({
                message: "Unsuccesful"
            })
        }
        else {
            bcrypt.hash(password, 10)
            .then(hash => {
                SampleModel.create({fullName, email, password: hash})
                .then(result => {
                    const token = jwt.sign({id: result._id}, "jwt-secret-key", {expiresIn: "1d"});
                    res.cookie("token", token);
                    res.status(200).json({
                        message: "Success",
                        id: result._id,
                        fullName: result.fullName,
                        token
                })}
            )
            .catch(err => res.status(500).json(err));
        })
        }
    })
}

// sample to log in user
const signInUser = async(req, res) => {

    const {email, password} = req.body;

    SampleModel.findOne({email: email}).
    then(foundUser => {
        if(foundUser) {
            bcrypt.compare(password, foundUser.password, (err, response) => {
                if(response) {
                    const token = jwt.sign({id: foundUser._id}, "jwt-secret-key", {expiresIn: "1d"})
                    res.cookie("token", token);
                    res.status(200).json({
                        message: "Success",
                        id: foundUser._id,
                        fullName: foundUser.fullName,
                        token
                    })
                }
                else {
                    res.status(400).json("password is incorrect")
                }
            })
        }
        else {
            res.status(400).json("No record existed")
        }
    })
}

module.exports = {
    signInUser,
    verifyUser,
    registerUser
}