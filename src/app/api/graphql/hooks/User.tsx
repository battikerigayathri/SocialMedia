import mercury from "@mercury-js/core";

mercury.hook.before('GET_USER_RECORD', async function (this: any) {
    // console.log("In get before", this);

})

mercury.hook.after('GET_USER_RECORD', async function (this: any) {
    // console.log("In get after", this);

})


mercury.hook.before('LIST_USER_RECORD', async function (this: any) {
    // console.log("In LIST before", this);

})

mercury.hook.after('LIST_USER_RECORD', async function (this: any) {
    // console.log("In LIST after", this);

})

mercury.hook.after('UPDATE_USER_RECORD', async function (this: any) {
    // console.log("In update after" , this);

})