import mercury from "@mercury-js/core";
export const Asset = mercury.createModel("Asset", {
  name: {
    type: "string",
  },
  type: {
    type: "enum",
    enumType: "string",
    enum: ["MEDIA", "WEBCONFIG"],
    default: "MEDIA",
  },
  path: {
    type: "string",
  },
  altText: {
    type: "string",
  },
  description: {
    type: "string",
  },
});
