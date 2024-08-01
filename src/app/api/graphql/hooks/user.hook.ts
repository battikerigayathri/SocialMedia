import mercury from "@mercury-js/core";

// Hook before creating a user record
mercury.hook.before("CREATE_USER_RECORD", async function (this: any) {
  const { userName, firstName, lastName, email } = this.options.args.input;

  try {
    const userModel = mercury.db.User.mongoModel;
    const existingUsers = await userModel.find({
      $or: [
        { userName },
        { firstName },
        { lastName },
        { email }
      ]
    });
    for (const user of existingUsers) {
      if (user.userName === userName) {
        throw new Error(`A user with the username "${userName}" already exists.`);
      }
      if (user.email === email) {
        throw new Error(`A user with the email "${email}" already exists.`);
      }
      if (user.firstName === firstName) {
        throw new Error(`A user with the first name "${firstName}" already exists.`);
      }
      if (user.lastName === lastName) {
        throw new Error(`A user with the last name "${lastName}" already exists.`);
      }
      
    }
    
  } catch (error: any) {
    console.error("Error creating user:", error);
    throw new Error("Unable to create user. " + error.message);
  }
});
