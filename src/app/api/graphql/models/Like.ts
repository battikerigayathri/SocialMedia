import mercury from "@mercury-js/core";
export const Like=mercury.createModel("Like",{
    post:{
        type:"relationship",
        ref:"Post"
    },
    user:{
        type:"relationship",
        ref:"User"
    },
    comment:{
        type:"relationship",
        ref:"User"
    }
})