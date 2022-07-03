export default {
  url: 'https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US',
  get: (data) => `https://www.bing.com${data.images[0].url}`,
};
