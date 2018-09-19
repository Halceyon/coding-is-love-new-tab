import RssParser from 'rss-parser';

const p = new RssParser();

export default {
  items: [],
  get: () => p.parseURL('https://www.nasa.gov/rss/dyn/lg_image_of_the_day.rss'),
};
