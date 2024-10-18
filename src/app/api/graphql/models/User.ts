import mercury from "@mercury-js/core";
export const User = mercury.createModel("User", {
  name: {
    type: "string",
  },
  avatar: {
    type: "string",
  },
  surname: {
    type: "string",
  },
  role: {
    type: "enum",
    enumType: "string",
    enum: ["ADMIN", "USER"],
  },
});
