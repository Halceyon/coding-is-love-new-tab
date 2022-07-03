import queryString from 'query-string';
import bus from '../ext/bus';
import asana from '../ext/asana';
import github from '../ext/github';

// allowing console for background page
/* eslint-disable no-console */

// handle oauth connections
const connect = (provider) => {
  if (provider.token === null) {
    chrome.identity.launchWebAuthFlow({
      url: provider.authUrl,
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

bus.sub('github.auth.requested', () => {
  connect(github);
});

bus.sub('asana.auth.requested', () => {
  connect(asana);
});

console.log('background loaded');
