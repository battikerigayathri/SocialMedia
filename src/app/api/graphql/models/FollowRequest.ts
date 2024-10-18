import mercury from "@mercury-js/core";
export const FollowRequest=mercury.createModel("FollowRequest",{
    sender:{
        type:"relationship",
        ref:"User"
    },
    receiver:{
        type:"relationship",
        ref:"User"
    }
})