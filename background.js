chrome.webRequest.onBeforeSendHeaders.addListener(
    (details) => {
      let headers = {};
      for (let header of details.requestHeaders) {
        if (header.name.toLowerCase() === "authorization") {
          headers["Authorization"] = header.value;
        } else if (header.name.toLowerCase() === "x-client-transaction-id") {
          headers["X-Client-Transaction-Id"] = header.value;
        } else if (header.name.toLowerCase() === "x-client-uuid") {
          headers["X-Client-Uuid"] = header.value;
        }
      }
  
      chrome.storage.local.set({ twitterHeaders: headers }, () => {
        console.log("트위터 헤더 저장됨:", headers);
      });
    },
    { urls: ["https://api.twitter.com/*", "https://api.x.com/*"] },
    ["requestHeaders"]
  );
  