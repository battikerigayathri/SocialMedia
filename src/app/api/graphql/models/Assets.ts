import mercury from "@mercury-js/core";
export const Assets = mercury.createModel("Assets", {
    assetName: {
        type: "string",
    },
    assetType: {
        type:"string",
    },
    assetPath: {
        type:"string"
    }
});
