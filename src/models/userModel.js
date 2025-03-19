import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    image: String
});

const UserModel = mongoose.model("auth", UserSchema);
export default UserModel;  // ✅ Use ES module export
