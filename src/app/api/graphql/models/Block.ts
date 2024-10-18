import mercury from "@mercury-js/core";
export const Block=mercury.createModel("Block",{
    blockedBy:{
        type:"relationship",
        ref:"User"
    },
    blockedUser:{
        type:"relationship",
        ref:"User"
    }
})