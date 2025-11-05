import { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
    username: string;
    email: string,
    password: string;
    role: "admin" | "user";
    createdAt: Date;
}

const UserSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
});

const User = models.User || model<IUser>("User", UserSchema, "Users");

export default User;