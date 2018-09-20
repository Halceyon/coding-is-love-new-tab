export default {
  sub: (name, func) => {
    chrome.runtime.onMessage.addListener(
      (request, sender, sendResponse) => {
        if (request.name === name) {
          const response = func(request);
          sendResponse(response);
        } else {
          sendResponse('thx');
        }
      },
    );
  },
  pub: (name, data) => {
    const msg = {
      name,
      data,
    };
    chrome.runtime.sendMessage(msg);
  },
};
