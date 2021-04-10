const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const config = require("config");

const route = express.Router();

// load the user model
const User = require("../models/User");

//@api          Get /api/users
//@desc         get the loged in user
//@access       Private
route.get("/", auth, async (req, res) => {
    try {   
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(400).json({msg: "there is no user"})
        }
        res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "there was an error" });
    }
  
});

//@api          Post /api/auth
//@desc         log the user in
//@access       Private
route.post(
  "/",
  [
    check("email", "please fill int the field with the right email").isEmail(),
    check("password", "please apssword is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    try {
      const { email, password } = req.body;

      // fetch the user form the database
      let user = await User.findOne({ email });
      // check if there is a user with the registered email
      if (!user) {
        return res
          .status(400)
          .json({ msg: "there is NO user with this email" });
      } else {
        // make a match for the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ msg: "incorrect Password" });
        } else {
          // create the payload
          const payload = {
            user: {
              id: user.id
            }
          };

          // sign the jwt
          jwt.sign(
            payload,
            config.get("jwtSecret"),
            {
              expiresIn: 360000
            },
            (err, token) => {
              if (err) throw err;
              res.json({ token });
            }
          );
        }
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "there was an error" });
    }
  }
);

module.exports = route;
