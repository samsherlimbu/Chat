const User = require("../models/usermodel");

const getUser = async (req, res) => {
    try {
        const loggedInUser = req.user._id;

        // Ensure loggedInUser exists
        if (!loggedInUser) {
            return res.status(400).send({ error: "Logged-in user not found." });
        }

        // Fetch users excluding the logged-in user
        const filteredUser = await User.find({ _id: { $ne: loggedInUser } }).select("-password");

        res.status(200).send(filteredUser);
    } catch (error) {
        console.log("Error in sidebar user:", error.message);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

module.exports = getUser;
