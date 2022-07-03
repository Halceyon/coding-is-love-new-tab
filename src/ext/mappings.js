export default {
  nasa: (items) => items.map((item) => ({
    title: item.title,
    imageUrl: item.enclosure.url,
    description: item.contentSnippet,
  })),
};
