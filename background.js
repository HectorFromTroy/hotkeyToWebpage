"use strict";

chrome.runtime.onMessage.addListener(
  request => {
    console.log(request)
    if(request.message === "open_new_tab") {
      chrome.tabs.create({
        "url": request.url
      });
    }
  }
);