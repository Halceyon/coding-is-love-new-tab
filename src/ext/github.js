export default {
  name: 'github',
  token: null,
  authUrl: `https://github.com/login/oauth/authorize/?client_id=4a5d9ed94b71567890da&redirect_uri=https://${chrome.runtime.id}.chromiumapp.org&scope=repos`,
  auth: (data) => {
    this.token = data.code;
    return this.token;
  },
};
