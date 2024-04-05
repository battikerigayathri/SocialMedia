import mercury from "@mercury-js/core";
export const Setting = mercury.createModel("Setting", {
    logo: {
        type: "relationship",
        ref:"Asset"
    },
    title: {
        type:"string"
    }
})