import mercury from "@mercury-js/core";
export const Story=mercury.createModel("Story",{
    user:{
        type:"relationship",
        ref:"User"
    }
})