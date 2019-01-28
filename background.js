var port = chrome.runtime.connectNative("tech.knode.utility");

var curDate = new Date();
function genericOnClick(info, tab) {
	var curDate = new Date();
	port.postMessage( {msg: "Clicked updated context menu @" + curDate + "at pageUrl:" + info.pageUrl} );
	
  console.log("Clicked context menu @[" + curDate + "], item; [" + info.menuItemId + "] was clicked");
  // console.log("info: " + JSON.stringify(info));
  // console.log("tab: " + JSON.stringify(tab));

  // chrome.runtime.sendMessage({message: "clicked_browser_action"}, (response) => {
  //   console.log("response received: ["+ response.message + "]");
  // })
  chrome.tabs.query({ active: true, currentWindow: true}, function(tabs)
  {
    chrome.tabs.sendMessage(tabs[0].id, {message: "clicked_browser_action", info: curDate.toString()}, function(response){ 
      port.postMessage( {msg: "Received response with message - " + response.message} );
      console.log("received response from content js: " + response.message);
    })
  });

}
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    console.log("received message from content js: " + request.message);
	  port.postMessage( {msg: "Received input from dialog @" + curDate + "at pageUrl:" + request.message} );

    sendResponse({farewell: "goodbye"});

  });

// Create one test item for each context type.
// var contexts = ["page","selection","link","editable","image","video","audio"];
console.log("Initializing context menue items - " + curDate.toString());
chrome.contextMenus.create({"title": "Save selected", "contexts": ["all"], "onclick": genericOnClick});