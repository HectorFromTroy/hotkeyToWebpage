"use strict";

let hotkeys;

const getHotkeys = () => {
  console.log("GETTING HOTKEYS")
  chrome.storage.sync.get(null, response => {
    hotkeys = response;
  });  
};

getHotkeys();

window.addEventListener("keydown", event =>{
 if((event.ctrlKey || event.metaKey) && hotkeys[event.code.slice(3)]){
   console.log("KEYDOWN")
    chrome.runtime.sendMessage({
      "message": "open_new_tab",
      "url": hotkeys[event.code.slice(3)]
    });
  }
});

chrome.storage.onChanged.addListener(getHotkeys);

