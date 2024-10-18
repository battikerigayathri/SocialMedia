import mercury from "@mercury-js/core";
export const Comment=mercury.createModel("Comment",{
    description:{
        type:"string"
    },
    post:{
        type:"relationship",
        ref:"Post"
    },
    commentedBy:{
        type:"relationship",
        ref:"User"
    },
    likes:{
        type:"virtual",
        ref:"Like",
        localField:"_id",
        foreignField:"comment",
        many:true
    }
})