import mercury from "@mercury-js/core"
export const Post=mercury.createModel("Post",{
    description:{
        type:"string"
    },
    user:{
        type:"relationship",
        ref:"User"
    },
    likes:{
        type:"virtual",
        ref:"Like",
        localField:"_id",
        foreignField:"post",
        many:true
    }
})