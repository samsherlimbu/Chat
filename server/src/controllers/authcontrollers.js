const User = require('../models/usermodel')
const bcrypt = require('bcrypt');
const generateTokenandSetCookie = require('../utils/generateToken');
const saltRounds = 10;



//for singup
const signup = async (req, res) => {
    try {
        const {fullName,username,password,confirmpassword,gender} =req.body;
     
        if(password !== confirmpassword) {
            return res.status(400).json({ error: 'Passwords do not match.' });
        }
        const user = await User.findOne({username});
        if(user){
            return res.status(400).json({ error: 'Username already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const boyprofilepic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlprofilepic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullName,
            username,
            password:hashedPassword,
            gender,
            profilePic: gender === 'male'? boyprofilepic : girlprofilepic
        })

       if ( newUser){
        generateTokenandSetCookie(newUser._id,res )
        await newUser.save();
         return res.status(201).json({
            _id : newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic });
       }else{
        res.status(400).json({error:"Invalid user data"})
       }

    } catch (error) {
        console.log('error in the singup controller',error.message);
        res.status(500).json({error:"internal server error"});
        
    }
  };
  

  //for login
  const login = async (req, res) => {
    try {
      const {username,password} = req.body;
      const user = await User.findOne({username})
      const passwordIsCorrect = await bcrypt.compare(password,user?.password || "");

      if(!user ||!passwordIsCorrect){
        return res.status(401).json({error: 'Invalid username or password.'});
      }
      generateTokenandSetCookie(user._id,res )

      return res.status(201).json({
        _id : user._id,
        fullName: user.fullName,
        username: user.username,
        token: user.token,
        profilePic: user.profilePic });

    } 
    catch (error) {
      console.log('error in the login controller',error.message);
      res.status(500).json({error:"internal server error"});
      
    }

  };
  


  // for logout
  const logout = async (req, res) => {
    try {
      res.cookie("jwt","",{maxAge:0});
      res.status(200).json({message:"successfully logged out"});
    } catch (error) {
      console.log('error in the logout controller',error.message);
      res.status(500).json({error:"internal server error"});
    }
  };
  
  module.exports = { signup, login, logout };
  