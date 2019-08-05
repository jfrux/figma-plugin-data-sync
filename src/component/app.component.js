import React, { Component } from "react";
import s from "./app.component.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      'processing': false,
      'last-used-url': null,
      'error': null
    };
    window.onmessage = async (event) => {
      if (!event.data.pluginMessage) {
        return;
      }
      const type = event.data.pluginMessage.type;
      const data = event.data.pluginMessage.data;
    
      if (type) {
        await this.messageHandlers[type](data);
      }
    }
    this.getClientVariable('last-used-url');
  }
  getClientVariable = (key) => {
    parent.postMessage({ pluginMessage: { 
      type: 'get-client-variable',
      data: key
  }}, '*');
  }
  messageHandlers = {
    'new-feed-error': async (data)  => {
      this.setState({
        'error': data
      });
    },
    'receive-client-variable': async (data) => {
      console.log(`Received client variable for ${data.key}=${data.value}`)
      this.setState({
        [data.key]: data.value
      });
    },
    'fetch-image': async (data) => {
      // console.log("Received image request",JSON.stringify(data));
      await this.getImageAsArrayBuffer(data.value).then((arrbuffer) => {
        // console.log(arrbuffer);
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
  
  startDownload = async (imageUrl) => {
    // console.log("Attempting to download image...", imageUrl);
    return new Promise((resolve,reject) => {
      let downloadedImg = new Image;
      downloadedImg.crossOrigin = "Anonymous";
      downloadedImg.addEventListener("load", () => {
        // console.log("Downloaded image:",downloadedImg);
        resolve(downloadedImg);
      }, false);
      downloadedImg.src = imageUrl;
      // console.log("Image:",downloadedImg);
    });
  }
  
  getImageAsArrayBuffer = async (url) => {
    const image = await this.startDownload(url);
    // console.log("image returned:",image);
    return await new Promise((resolve, reject) => {
      let canvas = document.createElement("canvas");
      let context = canvas.getContext("2d");
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image,0,0,image.width,image.height);
      // console.log("Image width:",image.width);
      // console.log("Image height:",image.height);
      
      canvas.toBlob(blob => {
        const reader = new FileReader()
        reader.onload = () => resolve(new Uint8Array(reader.result))
        reader.onerror = () => reject(new Error('Could not read from blob'))
        reader.readAsArrayBuffer(blob)
      });
    });
  }

  getJson = (url) => {
    // console.log("[feedle] Requesting JSON data from " + url);
    return fetch(url).then((resp) => {
      console.log("[feedle] Response",resp);
      if (resp.status !== '200') {
        this.setState({
          'error': 'Could not extract any data from the JSON response... ensure your server is returning a 200 status message, has CORS enabled, and doesn\'t require authentication.'
        });
        throw new Error("Could not get data from API...");
      }
      return resp.json();
    }).then((data) => {
      if (!data) {
        this.setState({'error': 'No data was found in the API response...'});
      };
      
      return data;
    })
  }

  onContinue = () => {
    const textbox = document.getElementById('json_url');
    const json_url = textbox.value;
    let keys = {};
    let data;
    let dataType = "array";
    this.setState({
      'error': null,
      'processing': true
    });
    this.getJson(json_url).then((rawData) => {
      // console.log("getJson response:",rawData);
      if (Array.isArray(rawData)) {
        // console.log("Data is array... grab first row for key map");
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
          json_url,
          rawData
        } }, '*')
      } else {
        this.setState({
          'processing': false,
          'error': 'Could not find any keys to map within response...\n Ensure response is basic JSON Array containing records of JSON Objects with same key-value pairs or Single Object of Key/Values'
        });
      }
    }).catch((e) => {
      this.setState({
        'processing': false,
        'error': `${e.message}`
      });
    });
  }

  onCancel = () => {
    parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
  }

  render() {
    const lastUsedUrl = this.state['last-used-url'];
    const { processing, error } = this.state;
    
    if (processing) {
      return (<div className="loading">Processing... Please wait...</div>);
    }

    return (
      <div>
        {error && 
          <div className="error">{error}</div>
        }
        <input type="text" name="json_url" id="json_url" defaultValue={lastUsedUrl} placeholder="https://api.example.com/data.json" />
        <button type="button" name="continue" id="continue-btn" onClick={this.onContinue}>Continue</button>
        <button type="button" name="cancel" id="cancel-btn" onClick={this.onCancel}>Cancel</button>
      </div>
    );
  }
}
export default App;