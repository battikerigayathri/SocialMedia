import mercury from "@mercury-js/core";
export const Profile = mercury.createModel("Profile", {
  firstName: {
    type: "string",
    require: true,
  },
  lastName: {
    type: "string",
    required: true,
  },
  
  
});
