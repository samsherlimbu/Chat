const jwt = require('jsonwebtoken');

const generateTokenandSetCookie = (userId,res) =>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '15d'});
    res.cookie("jwt",token,{
        maxAge:15 *24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'strict',  //only allow cookies to be sent over https in production environment
        secure : process.env.NODE_ENV  !== "development", // only send cookies over https in production environment
    })
}

module.exports = generateTokenandSetCookie;