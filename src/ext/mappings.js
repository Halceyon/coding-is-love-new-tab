import _ from 'lodash';

export default {
  nasa: items => _.map(items, item => ({
    title: item.title,
    imageUrl: item.enclosure.url,
    description: item.contentSnippet,
  })),
};
