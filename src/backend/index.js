import queryString from 'query-string';
import nasa from '../ext/nasa';
import bus from '../ext/bus';
import asana from '../ext/asana';
import github from '../ext/github';

/* eslint-disable no-console */

const connect = (provider) => {
  if (provider.token === null) {
    chrome.identity.launchWebAuthFlow({
      url: provider.url,
      interactive: true,
    }, (redirectURL) => {
      const search = redirectURL.substring(redirectURL.indexOf('?'));
      const data = queryString.parse(search);
      const token = provider.auth(data);
      console.log(data);
      bus.pub(`${provider.name}.auth.completed`, token);
    });
  } else {
    bus.pub(`${provider.name}.auth.completed`, provider.token);
  }
  console.log(provider.url);
};

const init = () => {
  connect(github);
  connect(asana);
};

const refresh = () => {
  nasa.get().then((feed) => {
    console.log(feed);
    bus.pub('nasa', feed.items);
  });
};

bus.sub('page.loaded', () => {
  init();
  refresh();
});

init();
console.log('background loaded');
