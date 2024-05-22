import mercury from "@mercury-js/core";

mercury.hook.before("CREATE_CATEGORY_RECORD", function (this: any) {
    console.log(this.options.args.input,"categpryyy");
    
  console.log(JSON.stringify(this.options.args.input));
  const title = this.options.args.input.name;
console.log(title);

  this.options.args.input.slug = title
    .toString()
    .toLowerCase()
    .replaceAll(" ", "-");
});
mercury.hook.before("UPDATE_CATEGORY_RECORD", function (this: any) {
    const title = this.options?.args?.input?.name;
    if (title) {
        this.options.args.input.slug = title
            .toString()
            .toLowerCase()
            .replaceAll(" ", "-");
    }
});