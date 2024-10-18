import mercury from "@mercury-js/core";
export const Follower=mercury.createModel("Follower",{
    follower:{
        type:"relationship",
        ref:"User"
    },
    following:{
        type:"relationship",
        ref:"User"
    }
})