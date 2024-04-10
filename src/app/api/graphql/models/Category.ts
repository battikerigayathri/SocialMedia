import mercury from "@mercury-js/core";
export const Category = mercury.createModel("Category", {
  name: {
    type: "string",
    require: true,
  },
  status: {
    type: "enum",
    enumType: "string",
    enum: [
      "ACTIVE",
      "IN_ACTIVE"
    ],
    default: "IN_ACTIVE"
  },
  subCategory: {
    type: "virtual",
    ref: "Category",
    localField: "_id",
    foreignField: "parent",
    many: false,
  },
  parent: {
    type: "relationship",
    ref: "Category",
    required: false
  }
});
