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
  {
    modelName: "Category",
    access: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },
  },
  {
    modelName: "SubCategory",
    access: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },
  },
  {
    modelName: "Assets",
    access: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },
  },
  {
    modelName: "Blog",
    access: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },
  },
  {
    modelName: "Setting",
    access: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },
  },
  {
    modelName: "Profile",
    access: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },
  },
];
export const UserProfile=mercury.access.createProfile('USER',rules)