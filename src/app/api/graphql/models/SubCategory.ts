import mercury from "@mercury-js/core";
export const SubCategory = mercury.createModel("SubCategory", {
  subCategoryName: {
    type: "string",
  },

  status: {
    type: "enum",
    enumType: "string",
    enum: ["ACTIVE", "IN_ACTIVE"],
    default: "IN_ACTIVE",
  },
});
