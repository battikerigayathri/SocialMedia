import mercury from "@mercury-js/core";
import { User } from "./models";
import { GraphQLError } from "graphql";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// declare type RedisClientType = import("ioredis").RedisClientType;
import nodemailer from "nodemailer";
import { RedisClient } from "./services/redis";

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
      { userName, password }: { userName: string; password: string, role: string },
      ctx: any
    ) => {
      try {
        const UserSchema = mercury.db.User;

        const user = await UserSchema.mongoModel.findOne({
          userName,
        });
        //  console.log(user,"loginuser");

        if (!user) {
          throw new Error("Invalid  username and/or password");
        }

        const isPasswordValid = await user.verifyPassword(password);
        //  console.log(isPasswordValid.password, "isvalidpassword");
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
          role: user.role
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
        const UserSchema = mercury.db.User;
        const user = await UserSchema.mongoModel.findOne({ email });
        //   console.log(user,"forgetPassword");

        if (!user) {
          throw new Error("Invalid email");
        }
        const otp = generateVerificationCode();
        await RedisClient.set(email, otp);
        sendVerificationEmail(email, otp + "");
        return {
          msg: "Otp has been sent to your email",
          otp: otp,
          email: email,
        };
      } catch (error: any) {
        throw new GraphQLError(error.message);
      }
    },
    verifyOtp: async (
      root: any,
      { email, otp }: { email: string; otp: string },
      ctx: any
    ) => {
      try {
        const storedOtp = await RedisClient.get(email);
        //  console.log(storedOtp, "stored");
        if (storedOtp !== otp.toString()) {
          throw new Error("Invalid OTP");
        }
        return {
          msg: "Otp verified Successfully",
        };
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    resetPassword: async (
      root: any,
      { email, newPassword }: { email: string; newPassword: string },
      ctx: any
    ) => {
      try {
        const updatedUser = await mercury.db.User.mongoModel.findOneAndUpdate(
          { email },
          { password: newPassword },
          { new: true }
        );
// console.log(updatedUser,"update");

        if (!updatedUser) {
          throw new Error("User not found");
        }

        return {
          msg: "Password has been reset successfully",
        };
      } catch (error: any) {
        throw new GraphQLError(error.message);
      }
    },
  },
};

async function sendVerificationEmail(email:string, otp:string) {
  const transporter = getTransporter();
    //   console.log("--------------------

  // Send an email with a link that includes the verification token
  const mailOptions = {
    from: "prashanthberi00@gmail.com",
    to: email,
    subject: "Email Verification",
    text: `Click the following link to verify your email: http://localhost:8005/verify/${otp}`,
  };

  // console.log("trasnporter", transporter)
  const info = await transporter.sendMail(mailOptions);
//   console.log("info", info);
}
function generateVerificationCode() {
  return Math.floor(1000 + Math.random() * 9000); // Generate a new random 4-digit code
}

