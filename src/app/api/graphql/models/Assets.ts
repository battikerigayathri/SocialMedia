import mercury from "@mercury-js/core";
export const Asset = mercury.createModel("Asset", {
  name: {
    type: "string",
  },
  mediaType: {
    type: "enum",
    enumType: "string",
    enum: ["MEDIA", "WEBCONFIG"],
    default: "MEDIA",
  },
  type: {
    type: "string",
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
