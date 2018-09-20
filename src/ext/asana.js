export default {
  name: 'asana',
  token: null,
  authUrl: `https://app.asana.com/-/oauth_authorize?response_type=token&client_id=826266338994223&redirect_uri=https://${chrome.runtime.id}.chromiumapp.org&state=826266338994223`,
  auth: (data) => {
    this.token = data[`https://${chrome.runtime.id}.chromiumapp.org/#access_token`];
    return this.token;
  },
};
