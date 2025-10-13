import { ApplicationError } from "../../../error-handler/applicationError.js";
import bcrypt from 'bcrypt';

export class UserModel{
    constructor(id,name,email,password)
    {
        this.id=id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static async signUp(name,email,password){
        try{
            const newUser = await new UserModel(users.length+1,name,email,password);
            users.push(newUser);
            return newUser;
        }
        catch(error)
        {
            throw new ApplicationError("Something Went Wrong",500);
        }
    }
    static async signIn(email,password)
    {
        try{
            const user = users.find((user)=> user.email ===email && user.password === password);
            if(user)
            {
                return user;
            }
        }
        catch(error)
        {
            throw new ApplicationError("Invalid email or Password",500);
        }
    }
    static findByEmail(email)
    {
        try{
        const user = users.find((u)=>u.email === email);
        return user ||null;
        }
        catch(error)
        {
            throw new ApplicationError("Error finding user by email",500);
        }
    }
    static getAll()
    {
        return users;
    }
    static findById(id)
    {
        try{
            const user = users.find(u=>u.id==id);
            console.log(user);
            return user || null;
        }
        catch(error)
        {
            throw new ApplicationError("Error finding user by user id",500);
        }
    }
}

let users = [
    {
        id:1,
        name:"user1",
        email:"user1@example.com",
        password:"password123",
    },{
        id:2,
        name:"user2",
        email:"user2@example.com",
        password:"$2b$10$eXkFvblAdHrZWlGQxsYqTudOmZDNBsWYez4d5aUVjWeMR8s6G2d7m"
        // password:"password1234"
    }
];

// // Hash passwords using bcrypt
// const saltRounds = 10;

// async function hashUserPasswords() {
//     for (let user of users) {
//         user.password = await bcrypt.hash(user.password, saltRounds);
//     }
//     console.log("Hashed users:", users);
// }

// hashUserPasswords();