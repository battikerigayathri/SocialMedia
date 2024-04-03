import mercury from "@mercury-js/core";
export const Blog = mercury.createModel("Blog", {
    title: {
    type: "string",
    },
    author: {
      type: "relationship",
      ref:"User"
    },
    content: {
      type:"string"
    },
    keywords: {
     type:"string"
    },
    fav: {
        type:"string"
    },
    pin: {
        type:"string"
    },
    category: {
        type: "relationship",
        ref:"Category"
    }
});
