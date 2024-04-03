import mercury from "@mercury-js/core";
import { User } from "./models";
import { GraphQLError } from "graphql";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default {
    Query: {
        hello: (root: any, { name }: { name: string }, ctx: any) => {
            return `Hello ${name || "World"}`;
        },
    },
    Mutation: {
        login: async (root: any, { email, password }: { email: string, password: string }, ctx: any) => {
            try {
                
                let UserSchema=mercury.db.User
                const user = await UserSchema.mongoModel.findOne({ email });
                if (!user) {
                    throw new Error('Invalid email or password');
                }
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) {
                    throw new Error('Invalid  password');
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
                    token:token
                };
            } catch (error: any) {
                throw new GraphQLError(error.message);
            }
        }
    }
}
