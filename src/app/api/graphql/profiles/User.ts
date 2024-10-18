import mercury from "@mercury-js/core";
const rules = [
  {
    modelName: "User",
    access: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
  },
];
export const UserProfile=mercury.access.createProfile('USER',rules)