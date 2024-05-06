import mercury from "@mercury-js/core";

mercury.hook.before("CREATE_BLOG_RECORD", function (this: any) {
  console.log(JSON.stringify(this.options.args.input));
    const title = this.options.args.input.title;
    const slug = title.toString().toLowerCase().replace(/[^a-z0-9-]/g, '');
    this.options.args.input.slug = slug
    .toString()
    .toLowerCase()
    .replaceAll(" ", "-");
});

mercury.hook.before("UPDATE_BLOG_RECORD", function (this: any) {
  const title = this.options?.args?.input?.title;
  if (title) {
    const slug = title.toString().toLowerCase().replace(/[^a-z0-9-]/g, '');
    this.options.args.input.slug = slug
      .toString()
      .toLowerCase()
      .replaceAll(" ", "-");
  }
});
