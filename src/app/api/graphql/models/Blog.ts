import mercury from "@mercury-js/core";
export const Blog = mercury.createModel("Blog", {
  title: {
    type: "string",
  },
  status: {
    type: "enum",
    enumType: "string",
    enum: [
      "PUBLISH",
      "DRAFT",
      "TRASH"
    ],
    default: "DRAFT"
  },
  author: {
    type: "relationship",
    ref: "User"
  },
  description: {
    type: "string"
  },
  thumbnail: {
    type: "relationship",
    ref: "Asset"
  },
  content: {
    type: "string"
  },
  metaTitle: {
    type: "string"
  },
  metaDescription: {
    type: "string"
  },
  keywords: {
    type: "string",
    many: true
  },
  featured: {
    type: "boolean"
  },
  pin: {
    type: "boolean"
  },
  category: {
    type: "relationship",
    ref: "Category",
    many: true
  }
});
