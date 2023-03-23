const express = require("express");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const connection = require("../config/sqlConnection");
require("dotenv").config();
const router = express();

router.post(
    "/userRegister",
    body("name").notEmpty().withMessage("Name Field Is Mandatory"),
    body("email").isEmail().withMessage("Invalid Email"),
    body("mobile").isLength({ min: 10 }).withMessage("Mobile Number Must be 10 Digits"),
    body("password").isLength({ min: 6 }).withMessage("Password must contain at least Six Charecters"),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.errors);
            return res.status(200).json({ errors: errors.array() });
        }
        const { name, email, mobile, password } = req.body;
        try {
            const query = `SELECT * FROM users WHERE address='${email}'`;

            connection.query(query, async (error, result) => {
                if (result.length != 0) {
                    return res.status(200).json({ message: "Email Already Exist" });
                }
                if (error) {
                    console.error(error);
                    return res.status(500).json({ message: "Internal server error" });
                }
                if (result.length === 0) {
                    const sql = `INSERT IGNORE INTO users (name, address, phone, password) VALUES ('${name}', '${email}','${mobile}', '${password}');`;
                    connection.query(sql, function (err, result) {
                        if (err) throw err;
                        return res.status(200).json({ successmessage: "Registration Success" });
                    });
                }
            });
        } catch (error) {
            console.log(error.message);
        }
    }
);

router.post("/userLogin", (req, res) => {
    const { email, password } = req.body;
    try {
        const query = `SELECT * FROM users WHERE address='${email}'`;

        connection.query(query, async (error, result) => {
            if (error) {
                console.error(error); 
                return res.status(500).json({ message: "Internal server error" });
            }
            if (result.length === 0) {
                return res.status(200).json({ errMsg: "Enter A Valid Email" });
            }
 
            const user = result[0];
            if (password === user.password) {
                const token = jwt.sign({ id: email }, process.env.JWT_SECRET, { expiresIn: "5h" });
                return res.status(200).json({ userData:user, token: token });
            } else {
                return res.status(200).json({ errMsg: "Invalid password" });
            }
        });
    } catch (error) {
        console.log(error.message);
    }
});

module.exports = router;
