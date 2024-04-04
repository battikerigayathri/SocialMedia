import mercury from "@mercury-js/core";
export const Assets = mercury.createModel("Assets", {
    name: {
        type: "string",
    },
    type: {
        type: "string",
    },
    path: {
        type: "string"
    },
    altText: {
        type: "string"
    },
    description: {
        type: "string"
    }
});
