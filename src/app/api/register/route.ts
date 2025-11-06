import bcrypt from 'bcrypt';
import dbConnection from "@/lib/dbconnection";
import User from "@/database/models/users";



export async function POST(req:Request) {
    const { email, password, username } = await req.json();

    await dbConnection();

    const userExists = await User.findOne({email});
    if (userExists){
        return Response.json({error: "Email already exists"}, {status: 400});
    }

    const hashed = await bcrypt.hash(password, 10);

    await User.create({
        email,
        username,
        password: hashed,
        role: "user",
    });
    return Response.json({ message: "User registered successfully" }, {status: 201});
}