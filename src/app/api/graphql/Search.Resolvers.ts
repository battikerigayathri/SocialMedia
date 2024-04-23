import mercury from "@mercury-js/core";
import { User } from "./models";
import { GraphQLError } from "graphql";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Redis from "ioredis";
import * as dotenv from "dotenv";
dotenv.config();
// declare type RedisClientType = import("ioredis").RedisClientType;
import nodemailer from "nodemailer";
export const RedisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD,
});
const getTransporter = () => {
  return nodemailer.createTransport({
    // Configure your email service provider here
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "prashanthberi00@gmail.com",
      pass: "atbkmetroanqoisf",
    },
  });
};
export default {
  Query: {
    hello: (root: any, { name }: { name: string }, ctx: any) => {
      return `Hello ${name || "World"}`;
    },
  },
  Mutation: {
   login: async (
 root: any,
 { userName, password }: { userName: string, password: string },
 ctx: any
) => {
 try {
    const  UserSchema = mercury.db.User;
  
    const user = await UserSchema.mongoModel.findOne({
      userName
    });
    if (!user) {
      throw new Error("Invalid  username and/or password");
    }
     const isPasswordValid = await bcrypt.compare(password, user.password);
     console.log(isPasswordValid,password,user.password);
     
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.SECRET_TOKEN_KEY!,
      { expiresIn: "30d" }
    );
    return {
      msg: "User successfully logged in",
      token: token,
    };
 } catch (error: any) {
    throw new GraphQLError(error.message);
 }
},

    forgetPassword: async (
      root: any,
      { email ,verificationCode}: { email: string,verificationCode:string },
      ctx: any
    ) => {
      try {
        const  UserSchema = mercury.db.User;
        const user = await UserSchema.mongoModel.findOne({ email });
        if (!user) {
          throw new Error("Invalid email");
        }

        const verificationCode = regenerateVerificationCode();
          await RedisClient.set(email, verificationCode);
           sendVerificationEmail(email, verificationCode+"");
          return {
            
          msg: "Code has been sent to your email",
          code: verificationCode,
        };
      } catch (error: any) {
        throw new GraphQLError(error.message);
      }
      },    
  resetPassword :async (root:any, { email, otp, newPassword }:{email:string,otp:string,newPassword:string}, ctx:any) => {
 try {
    const UserSchema = mercury.db.User;
     const storedOtp = await RedisClient.get(email);
     console.log(storedOtp,"stored");
    if (storedOtp !== otp.toString()) {
 throw new Error("Invalid OTP");
}
     const hashedPassword = await bcrypt.hash(newPassword, 10);
     console.log(hashedPassword);
    const user = await UserSchema.mongoModel.update(
      { email },
      { password: hashedPassword }
    );
    if (!user) {
      throw new Error("User not found");
    }
    return {
      msg: "Password has been reset successfully",
    };
 } catch (error:any) {
    throw new GraphQLError(error.message);
 }
}
  },
};

async function sendVerificationEmail(email:string, verificationCode:string) {
  const transporter = getTransporter();
  console.log("--------------------");
  // Send an email with a link that includes the verification token
  const mailOptions = {
    from: "prashanthberi00@gmail.com",
    to: email,
    subject: "Email Verification",
    text: `Click the following link to verify your email: http://localhost:8005/verify/${verificationCode}`,
  };

  // console.log("trasnporter", transporter)
  const info = await transporter.sendMail(mailOptions);
  console.log("info", info);
}
function regenerateVerificationCode() {
  return Math.floor(1000 + Math.random() * 9000); // Generate a new random 4-digit code
}