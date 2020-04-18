"use strict";

// window.addEventListener("keydown", event =>{
//  if((event.ctrlKey || event.metaKey) && event.code == 'KeyY'){
//     chrome.runtime.sendMessage({
//       "message": "open_new_tab", 
//       "url": "https://www.youtube.com/"
//     });
//   }
// });

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  console.log(request.message);
});