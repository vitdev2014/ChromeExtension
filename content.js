var newDate = new Date();
console.log("Intializing extension at " + newDate );

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    var curDate = new Date();
    console.log("Handling request at content part at "+ curDate);

      // <iframe id="headlineFetcher"style="height:100%"></iframe>

    document.body.innerHTML +=`<dialog style="height:40%; border-style: dotted;">
      <div style="position:absolute; top:0px; left:5px;">  
          <button>x</button>
      </div>
      <textarea id="ta" rows="4" cols="10">
        Enter text for message
      </textarea>
    </dialog>`;

    const dialog = document.querySelector("dialog");
    dialog.showModal();
    // const iframe = document.getElementById("headlineFetcher");  
    // iframe.src = chrome.extension.getURL("index.html");
    // iframe.frameBorder = 0;
    dialog.querySelector("button").addEventListener("click", () => {
        var r = document.getElementById("ta").value;
        console.log("Handling input at "+ curDate + ", with input of: " + r);
        var respMesage = 'Entered text at ' + curDate + ": [" + r + "]";
        dialog.close();
        chrome.runtime.sendMessage({message: respMesage}, function(response) {
          console.log("Received resp from cloding dialog: " + response.farewell);
        });
    });
    sendResponse({message: "handling of initiation of dialog completed"});
  }
);
