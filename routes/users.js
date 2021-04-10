const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const route = express.Router();

// bringing the user model
const User = require("../models/User");

//@api          Post /api/auth
//@desc         register a user
//@access       Public
route.post(
  "/",
  [
    check("name", "please enter your name in the field")
      .not()
      .isEmpty(),
    check("email", "please add add your email in the field")
      .not()
      .isEmpty(),
    check("email", "please inter a valid email").isEmail(),
    check(
      "password",
      "please make sure that your password is at least 6 characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    // create the errors array
    const errors = validationResult(req);

    // check if there is any error
    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }

    try {
      const { name, email, password } = req.body;

      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: "this Email is already exist" });
      } else {
        user = new User({ name, email, password });
        // generate a salt
        const salt = await bcryptjs.genSalt(10);
        // hash the password
        user.password = await bcryptjs.hash(password, salt);
        await user.save();

        // create the payload for the token
        const payload = {
          user: {
            id: user.id
          }
        }

        // sign the token 
        jwt.sign(payload, config.get("jwtSecret"), {
          expiresIn: 360000
        }, (err, token) => {
          if (err) throw err;
          res.json({ token });
        });
      }

    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "there was an error" });
    }
  }
);

module.exports = route;
