const typeDefs = `
  type Query {
    hello(name: String): String,
  }
  type Mutation{
    login(email:String,password:String):loginResponse
  }
  type loginResponse{
msg:String
  }
`
export default typeDefs;