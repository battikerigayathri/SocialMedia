import { startServerAndCreateNextHandler } from "@as-integrations/next";
import mercury from "@mercury-js/core";
import { ApolloServer } from "@apollo/server";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { applyMiddleware } from "graphql-middleware";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import "./models";
import CombinedResolvers from "./resolvers";
import typeDefs from './schema';
import { serialize } from 'cookie';
import cors from 'cors';


mercury.connect(process.env.DB_URL);

const resolvers = mergeResolvers(CombinedResolvers);
const schema = applyMiddleware(
  makeExecutableSchema({
    typeDefs: mergeTypeDefs([typeDefs, mercury.schema]),
    resolvers: mergeResolvers([resolvers, mercury.resolvers]),
  })
);

var corsOptions = {
  origin: '*',
  credentials: true
};
// cors(corsOptions)

const server = new ApolloServer({
  schema,
  // cors: corsOptions
});

const handler = startServerAndCreateNextHandler(server,
  {
    context: async (req, res) => ({
      ...req,
      user: { role: "ANONYMOUS" },
      // setCookie: (name, value, options) => {
      //   const cookie = serialize(name, value, options);
      //   res.setHeader('Set-Cookie', cookie);
      // },
    }),

  });

export async function GET(request) {
  return handler(request);
}

export async function POST(request) {
  return handler(request);
}