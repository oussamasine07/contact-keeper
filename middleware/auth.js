const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
    const token = req.header("x-auth-token");

    if (!token) {
        res.status(500).json({msg: "access denied, Invalid Token"})
    }

    try {
        const decoded = jwt.verify(token, config.get("jwtSecret"));
        req.user = decoded.user
        next()
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "there was an error" });
    }
}