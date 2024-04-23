import mercury from "@mercury-js/core";

mercury.hook.before("CREATE_BLOG_RECORD", function (this: any) {
  console.log(JSON.stringify(this.options.args.input));
    const title = this.options.args.input.title;
    
    this.options.args.input.slug = title
    .toString()
    .toLowerCase()
    .replaceAll(" ", "-");
});

mercury.hook.before("UPDATE_BLOG_RECORD", function (this: any) {
  const title = this.options?.args?.input?.title;
  if (title) {
    this.options.args.input.slug = title
      .toString()
      .toLowerCase()
      .replaceAll(" ", "-");
  }
});
