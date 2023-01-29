var router = require("express").Router();
var userModel = require("./models");
const path = require('path');
const fs = require('fs');
const directoryPath = path.join(__dirname, 'media');



router.get("/health-check", async (req, res)=>{
    res.send({hello: "How are you"})
});

router.post("/register", async (req, res)=>{

    try {
        var {firstName,
        lastName,
        email,
        password} = req.body;

        if (!email) {
            throw "Please provide user email"
        }
        if (!password) {
            throw "Please provide user password"
        }
        var user = await userModel.create({
            firstName,
            lastName,
            email,
            password
        });

        res.status(201).json({
            msg: "user created successfully",
            data: user
        })

    }catch (error) {
        console.log({error})
        res.status(500).json({
            msg: "An error occured",
            error
        });
    }

});

router.post("/login", async (req, res)=>{

    try {
        var {
        email,
        password} = req.body;

        if (!email) {
            throw "Please provide user email"
        }
        if (!password) {
            throw "Please provide user password"
        }
        var user = await userModel.findOne({
            email,
            password
        });

        if (!user) {
            res.status(403).json({
                msg: "login unsuccessful",
                error: "invalid username or password"
            })
        }else {

            res.status(200).json({
                msg: "user login successful",
                data: user
            })

        }

    }catch (error) {
        console.log({error})
        res.status(500).json({
            msg: "An error occured",
            error
        });
    }

});


router.get("/get-files", async (req, res)=>{
    console.log(`${__dirname.split("/").slice(0,-1).join("/")}/media`)
    fs.readdir(`${__dirname.split("/").slice(0,-1).join("/")}/media`, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 

        res.send({files})
    });
});

module.exports = router;