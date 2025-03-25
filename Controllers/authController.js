const User = require('../models/User');

exports.googleLogin = async (req, res) => {
    console.log("Google login called");
    
    try {
        const { _id, name, email, picture } = req.body;

        if (!_id || !email) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        let user = await User.findOne({ email });

        if (!user) {
            user = new User({ googleId: _id, name, email, picture });
            await user.save();
        }

        res.status(200).json({
            success: true,
            user: {
                userId: user._id,
                name: user.name,
                email: user.email,
                picture: user.picture
            }
        });
    } catch (error) {
        console.error("Google login error:", error);
        res.status(500).json({ success: false, error: "Server error" });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const { userId } = req.query; 

        if (!userId) {
            return res.status(400).json({ success: false, error: "User ID is required" });
        }

        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        res.status(200).json({ success: true, profile: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server error" });
    }
};
