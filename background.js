"use strict";

chrome.runtime.onMessage.addListener(
  request => {
    if(request.message === "open_new_tab") {
      chrome.tabs.create({
        "url": request.url
      });
    }
  }
);