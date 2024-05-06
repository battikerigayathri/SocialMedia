import mercury from "@mercury-js/core";

mercury.hook.before("CREATE_BLOG_RECORD", function (this: any) {
  console.log(JSON.stringify(this.options.args.input));
  const title = this.options.args.input.title;
  let slug = title
    .toString()
    .toLowerCase()
    .replaceAll(" ", "-");
  slug.toString().toLowerCase().replace(/[^a-z0-9-]/g, '');
  this.options.args.input.slug = slug;
});

mercury.hook.before("UPDATE_BLOG_RECORD", function (this: any) {
  const title = this.options?.args?.input?.title;
  if (title) {
    let slug = title
      .toString()
      .toLowerCase()
      .replaceAll(" ", "-");
    slug.toString().toLowerCase().replace(/[^a-z0-9-]/g, '');
    this.options.args.input.slug = slug;
  }
});
