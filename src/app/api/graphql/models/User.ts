import mercury from "@mercury-js/core";
export const User = mercury.createModel("User", {
  firstName: {
    type: "string",
    require: true,
  },
  lastName: {
    type: "string",
    required: true,
  },
  userName:{
       type:"string",
       required:true
  },
  email: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    bcrypt: true,
  },
  role: {
    type: "enum",
    enumType: "string",
    enum: ["ADMIN", "USER", "ANONYMOUS"],
  },
  status: {
    type: "enum",
    enumType: "string",
    enum: ["ACTIVE", "IN_ACTIVE"],
    default: "IN_ACTIVE",
  },
});
