import mercury from "@mercury-js/core";
mercury.hook.before("CREATE_BLOG_RECORD", async function (this: any) {
  console.log(JSON.stringify(this.options.args.input));
  const title = this.options.args.input.title;
  const isPinned = this.options.args.input.pin;

  try {
    const blogModel = mercury.db.Blog.mongoModel;
    const blogs = await blogModel.find({});
    console.log(blogs, "blogs");
    const existingTitles = blogs.map((blog: { title: string }) =>
      blog.title.toLowerCase()
    );
    if (existingTitles.includes(title.toLowerCase())) {
      throw new Error(
        `A blog with the title "${title}" already exists. Please choose a different title.`
      );
    }
    if (isPinned) {
      const pinnedBlogsCount = await blogModel.countDocuments({ pin: true });
      if (pinnedBlogsCount >= 5) {
        throw new Error(
          "Cannot pin more than 5 blogs. Please unpin a blog before pinning a new one."
        );
      }
    }
    let slug = title.replaceAll(" ", "-");
    slug = slug.replace(/[^a-z0-9-]/g, "");
    this.options.args.input.slug = slug;
  } catch (error: any) {
    throw new Error(error.message);
  }
});
mercury.hook.before("UPDATE_BLOG_RECORD", async function(this: any) {
  const title = this.options?.args?.input?.title;
  const isPinned = this.options?.args?.input?.pin;

  try {
    const blogModel = mercury.db.Blog.mongoModel;

    if (isPinned) {
      const pinnedBlogsCount = await blogModel.countDocuments({ pin: true });
      if (pinnedBlogsCount >= 5) {
        throw new Error("Cannot pin more than 5 blogs. Please unpin a blog before pinning a new one.");
      }
    }

    if (title) {
      let slug = title
        .toString()
        .toLowerCase()
        .replaceAll(" ", "-");
      slug = slug.toString().toLowerCase().replace(/[^a-z0-9-]/g, '');
      this.options.args.input.slug = slug;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
});
