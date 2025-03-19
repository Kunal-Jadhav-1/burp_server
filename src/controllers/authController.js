import dotenv from "dotenv";
dotenv.config({ path: "./src/.env" });

import axios from "axios";
import jwt from "jsonwebtoken";
import { oauth2client } from "../utils/googleConfig.js";
import UserModel from "../models/userModel.js";

export const googleLogin = async (req, res) => {
    try {
        const { code } = req.query;

        if (!code) {
            return res.status(400).json({ error: "Authorization code is missing" });
        }

        console.log("Received Google Auth Code:", code);

        // Exchange code for access token
        const googleRes = await oauth2client.getToken(code);
        oauth2client.setCredentials(googleRes.tokens);

        console.log("Google OAuth Response:", googleRes.tokens);

        // Fetch user info from Google
        const userRes = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`);

        console.log("User Data Response:", userRes.data);

        if (!userRes.data || !userRes.data.email) {
            return res.status(400).json({ error: "User data missing in response" });
        }

        const { name, email, picture } = userRes.data;
        
        let user = await UserModel.findOne({ email });
        if (!user) {
            user = await UserModel.create({ name, email, image: picture });
        }

        const { _id } = user;
        const token = jwt.sign({ _id, email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TIMEOUT });

        console.log("User successfully logged in:", user);

        return res.status(200).json({
            message: "Success",
            token,
            user
        });

    } catch (err) {
        console.error("❌ Google Login Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
