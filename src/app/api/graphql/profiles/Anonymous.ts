import mercury from "@mercury-js/core";
const rules = [
  {
    modelName: "User",
    access: {
      create: false,
      read: true,
      update: false,
      delete: false,
    },
  },
];
export const AnonymousProfile=mercury.access.createProfile('ANONYMOUS',rules)