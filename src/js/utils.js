export function slugify(input) {
  if (!input) return "";
  // make lower case and trim
  var slug = input.toLowerCase().trim();
  // remove accents from charaters
  slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  // replace invalid chars with spaces
  slug = slug.replace(/[^a-z0-9\s-]/g, " ").trim();
  // replace multiple spaces or hyphens with a single hyphen
  slug = slug.replace(/[\s-]+/g, "-");
  return slug;
}

const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
};
export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-GB", options);
}

export function formatBlogPosts(
  posts,
  { filterOutFuturePosts = true, sortByDate = true, limit = undefined } = {}
) {
  const filteredPosts = posts.reduce((acc, post) => {
    const { date, draft } = post.frontmatter;

    //filter out future posts
    if (filterOutFuturePosts && new Date(date) > new Date()) return acc;

    acc.push(post);

    return acc;
  }, []);

  //sort by date or randomize

  if (sortByDate) {
    filteredPosts.sort(
      (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
    );
  } else {
    filteredPosts.sort(() => Math.random() - 0.5);
  }

  //limit to a number

  if (typeof limit === "number") {
    return filteredPosts.slice(0, limit);
  }
  return filteredPosts;
}
