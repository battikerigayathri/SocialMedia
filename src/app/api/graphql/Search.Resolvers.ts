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
      user: "shashanksonwane305@gmail.com",
      pass: "jfhucooflemoxuya",
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
          role: user.role,
          user:user.id
        };
      } catch (error: any) {
        throw new GraphQLError(error.message);
      }
    },

    // forgetPassword: async (
    //   root: any,
    //   { email }: { email: string },
    //   ctx: any
    // ) => {
    //   try {
    //     const UserSchema = mercury.db.User;
    //     const user = await UserSchema.mongoModel.findOne({ email });
    //     //   console.log(user,"forgetPassword");

    //     if (!user) {
    //       throw new Error("Invalid email");
    //     }
    //     const otp = generateVerificationCode();
    //     await RedisClient.set(email, otp);
    //     sendVerificationEmail(email, otp + "");
    //     return {
    //       msg: "Otp has been sent to your email",
    //       otp: otp,
    //       email: email,
    //     };
    //   } catch (error: any) {
    //     throw new GraphQLError(error.message);
    //   }
    // },
    forgetPassword: async (
      root: any,
      { email }: { email: string },
      ctx: any
    ) => {
      try {
        const UserSchema = mercury.db.User.mongoModel;
        const userData = await UserSchema.findOne({ email: email });
        if (!userData) throw new Error("Invalid Email");
        const otp = generateVerificationCode();
        const otpExpiry = new Date();
        otpExpiry.setMinutes(otpExpiry.getMinutes() + 10); 
    
        await UserSchema.findOneAndUpdate(
          { email: email },
          { otp: otp, otpExpiry: otpExpiry },
          { new: true }
        );
    
        sendVerificationEmail(email, otp+"");
    
        return {
          msg: "Otp has been sent successfully",
          otp: otp,
          email: email,
        };
      } catch (error: any) {
        throw new GraphQLError(error.message);
      }
    },
   
    // verifyOtp: async (
    //   root: any,
    //   { email, otp }: { email: string; otp: string },
    //   ctx: any
    // ) => {
    //   try {
    //     const storedOtp = await RedisClient.get(email);
    //     //  console.log(storedOtp, "stored");
    //     if (storedOtp !== otp.toString()) {
    //       throw new Error("Invalid OTP");
    //     }
    //     return {
    //       msg: "Otp verified Successfully",
    //     };
    //   } catch (error: any) {
    //     throw new Error(error.message);
    //   }
    // },
    verifyOtp : async (
      root: any,
      { email, otp }: { email: string; otp: string },
      ctx: any
    ) => {
      try {
        const UserSchema = mercury.db.User.mongoModel;
            const userData = await UserSchema.findOne({ email: email });
        if (!userData) throw new Error("User not Found");
            const { otp: storedOtp, otpExpiry } = userData;
        if (!storedOtp || !otpExpiry) {
          throw new Error("OTP has expired. Please click on Resend OTP");
        }
        console.log(otp);
        
                const currentTime = new Date();
        if (currentTime > otpExpiry) {
          throw new Error("OTP has expired. Please click on Resend OTP");
        }
        if (storedOtp !== otp) {
          throw new Error("Invalid OTP!");
        }
        const user = await UserSchema.findOneAndUpdate(
          { email },
          { isVerified: true, otp: otp, otpExpiry: otpExpiry },
          { new: true }
        );
    
        if (!user) {
          return {
            status: 400,
            msg: "User not found",
          };
        }
    
        return {
          msg: "User is Verified Successfully",
          id: user.id,
        };
      } catch (error: any) {
        throw new GraphQLError(error.message);
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
    setNewPassword: async (
      root: any,
      { email, password,previousPassword}: { email: string; password: string ,previousPassword:string},
      ctx: any
    ) => {
      try {
        let userSchema = mercury.db.User;
        const userData = await userSchema.mongoModel.findOne({ email });
        if (!userData) throw new Error("Invalid Email");
        const isPreviousPasswordValid = await userData.verifyPassword(previousPassword);
        if (!isPreviousPasswordValid) {
          throw new GraphQLError("Invalid previous password");
        }
        const isSameAsNewPassword = await userData.verifyPassword(password);
        if (isSameAsNewPassword) {
          throw new GraphQLError("New password is similar to previous password!!");
        }    
        // Update the user's password
        await mercury.db.User.update(
          userData.id,
          { password, isVerified: false },
          { profile: ctx.user.profile }
        );
        
        return {
          id: userData.id,
          msg: "Password Changed Successfully",
        };
      } catch (error: any) {
        throw new GraphQLError(error.message || error);
      }
    },
  },
};

async function sendVerificationEmail(email:string, otp:string) {
  const transporter = getTransporter();
    //   console.log("--------------------

  // Send an email with a link that includes the verification token
  const mailOptions = {
    from: "shashanksonwane305@gmail.com",
    to: email,
    subject: "Email Verification",
    text: `Click the following link to verify your email: ${otp}`,
  };

  // console.log("trasnporter", transporter)
  const info = await transporter.sendMail(mailOptions);
//   console.log("info", info);
}
function generateVerificationCode() {
  return Math.floor(1000 + Math.random() * 9000); // Generate a new random 4-digit code
}

