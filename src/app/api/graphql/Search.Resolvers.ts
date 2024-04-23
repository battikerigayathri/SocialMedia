import mercury from "@mercury-js/core";
import { User } from "./models";
import { GraphQLError } from "graphql";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Redis from "ioredis";
import * as dotenv from "dotenv";
dotenv.config();
// declare type RedisClientType = import("ioredis").RedisClientType;

export const RedisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD,
});

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
      { email }: { email: string },
      ctx: any
    ) => {
      try {
        const  UserSchema = mercury.db.User;
        const user = await UserSchema.mongoModel.findOne({ email });
        if (!user) {
          throw new Error("Invalid email");
        }

        const otp = Math.floor(Math.random() * 90000) + 10000;
        await RedisClient.set(email, otp);
        return {
          msg: "Token has been sent to your email",
          code: otp,
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
    
    const user = await UserSchema.mongoModel.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
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
