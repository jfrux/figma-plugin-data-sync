import React, { Component } from "react";
import s from "./app.component.css";

const getJson = (url) => {
  console.log("[feedle] Requesting JSON data from " + url);
  return fetch(url).then((resp) => {
    return resp.json();
  }).then((data) => {
    console.log("[feedle] Success",data);
    return data;
  }).catch((e) => {
    console.log("[feedle] Failed to fetch JSON data from " + url,e);
  })
}
async function startDownload(imageUrl) {
  console.log("Attempting to download image...", imageUrl);
  return new Promise((resolve,reject) => {
    let downloadedImg = new Image;
    downloadedImg.crossOrigin = "Anonymous";
    downloadedImg.addEventListener("load", () => {
      console.log("Downloaded image:",downloadedImg);
      resolve(downloadedImg);
    }, false);
    downloadedImg.src = imageUrl;
    console.log("Image:",downloadedImg);
  });
}
async function getImageAsArrayBuffer(url) {
  const image = await startDownload(url);
  console.log("image returned:",image);
  return await new Promise((resolve, reject) => {
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");
    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image,0,0,image.width,image.height);
    console.log("Image width:",image.width);
    console.log("Image height:",image.height);
    
    canvas.toBlob(blob => {
      const reader = new FileReader()
      reader.onload = () => resolve(new Uint8Array(reader.result))
      reader.onerror = () => reject(new Error('Could not read from blob'))
      reader.readAsArrayBuffer(blob)
    });
  });
}
const messageHandlers = {
  'fetch-image': async (data) => {
    console.log("Received image request",JSON.stringify(data));
    await getImageAsArrayBuffer(data.value).then((arrbuffer) => {
      console.log(arrbuffer);
      parent.postMessage({ pluginMessage: { 
        type: 'image-blob-response',
        data: {
          ...data,
          imageBuffer: arrbuffer
        }
    }}, '*');
    });
  }
}

window.onmessage = async (event) => {
  if (!event.data.pluginMessage) {
    return;
  }
  const type = event.data.pluginMessage.type;
  const data = event.data.pluginMessage.data;

  if (type) {
    await messageHandlers[type](data);
  }
}

// document.getElementById('continue').onclick = () => {

// }

// document.getElementById('cancel').onclick = () => {
//   
// }

class App extends Component {

  onContinue = () => {
    const textbox = document.getElementById('json_url');
    const json_url = textbox.value;
    let keys = {};
    let data;
    let dataType = "array";
    getJson(json_url).then((rawData) => {
      console.log("getJson response:",rawData);
      if (Array.isArray(rawData)) {
        console.log("Data is array... grab first row for key map");
        keys = Object.keys(rawData[0]);
        data = rawData;
        dataType = "array";
      } else {
        // if( (typeof A === "object" || typeof A !== 'function') && (A !== null) ) {
        //   keys = Object.keys(rawData);
        //   data = [rawData];
        //   dataType = "object";
        // }
      }
      if (keys) {
        parent.postMessage({ pluginMessage: { 
          type: 'new-feed', 
          keys,
          dataType,
          data,
          rawData
        } }, '*')
      } else {
        alert('Could not find any keys to map within response...\n Ensure response is basic JSON Array containing records of JSON Objects with same key-value pairs or Single Object of Key/Values')
      }
    });
  }

  onCancel = () => {
    parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
  }

  render() {
    return (
      <div>
        <input type="text" name="json_url" id="json_url" defaultValue="https://api-v2.newsy.com/startup" />
        <button type="button" name="continue" id="continue-btn" onClick={this.onContinue}>Continue</button>
        <button type="button" name="cancel" id="cancel-btn" onClick={this.onCancel}>Cancel</button>
      </div>
    );
  }
}
export default App;