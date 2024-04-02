import mercury from "@mercury-js/core";
export const Category = mercury.createModel("Category", {
  categoryName: {
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
      default:"IN_ACTIVE"
  },
  subCategory: {
    type: "relationship",
    ref: "SubCategory",
    many:true,
  },
});
