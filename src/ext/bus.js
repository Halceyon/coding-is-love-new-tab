export default {
  sub: (name, func) => {
    chrome.runtime.onMessage.addListener(
      (request, sender, sendResponse) => {
        console.log(request);
        if (request.name === name) {
          func(request);
        }
        sendResponse('thx');
      },
    );
  },
  pub: (name, data) => {
    console.log(name);
    console.log(data);
    const msg = {
      name,
      data,
    };
    chrome.runtime.sendMessage(msg);
  },
};
