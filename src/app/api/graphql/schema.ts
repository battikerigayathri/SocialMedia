const typeDefs = `
  type Query {
    hello(name: String): String,
  }
  type Mutation{
  login(userName:String,password:String):loginResponse
    forgetPassword(email:String):forgetPasswordResponse
    verifyOtp(email:String,otp:String):verifyResponse
     resetPassword(email: String,  newPassword: String): ResetPasswordResponse
  }
  type loginResponse{
msg:String
token:String
role: String

  }
  type forgetPasswordResponse{
   msg:String
otp:String
email:String
  }
  type ResetPasswordResponse {
 msg: String
}
type verifyResponse{
  msg:String
}
`;
export default typeDefs;