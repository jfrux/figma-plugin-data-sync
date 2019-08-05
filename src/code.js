// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.
// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser enviroment (see documentation).
// This shows the HTML page in "ui.html".
figma.showUI(__html__);
function clone(val) {
  const type = typeof val
  if (val === null) {
    return null
  } else if (type === 'undefined' || type === 'number' ||
             type === 'string' || type === 'boolean') {
    return val
  } else if (type === 'object') {
    if (val instanceof Array) {
      return val.map(x => clone(x))
    } else if (val instanceof Uint8Array) {
      return new Uint8Array(val)
    } else {
      let o = {}
      for (const key in val) {
        o[key] = clone(val[key])
      }
      return o
    }
  }
  throw 'unknown'
}
const deepFindByNameAndType = function(node, name, type, foundItems) {
  // console.log("Searching node ",node);
  if (node.children) {
    node.children.forEach((item) => {
      if (item.name === name && item.type === type) {
        foundItems.push(item);
      }
    });
    console.log("foundItems:",foundItems);
    
    const matchingInstance = node.children.filter((item) => {
      return item.type !== type;
    });
    console.log("matchingInstance",matchingInstance);
    if (matchingInstance.length) {
      matchingInstance.forEach((item) => {
        deepFindByNameAndType(item, name, type, foundItems);
      });
    }
  }
}

function fetchImageBlob(data) {
    figma.ui.postMessage({
      type: 'fetch-image',
      data
    });
}

const indexKeysFromSelection = (node, keyIndex) => {
  if (node.children) {
    node.children.forEach((child) => {
      
      if (child.name.indexOf('#') >= 0) {
        console.log("childName",child.name);
        console.log("childType",child.type);
        console.log("------");
        const name = child.name.replace('#','');
        if (!keyIndex.hasOwnProperty(name)) {
          keyIndex[name] = [];
        }
        keyIndex[name].push({
          id: child.id,
          type: child.type
        });
      }
    });

    const matchingInstance = node.children.filter((item) => {
      return item.name.indexOf('#') == -1;
    });

    if (matchingInstance.length) {
      matchingInstance.forEach((item) => {
        indexKeysFromSelection(item, keyIndex);
      });
    }
  }
}
const handlers = {
  'image-blob-response': (msg) => {
    const node = figma.getNodeById(msg.data.id);
    const newImage = figma.createImage(msg.data.imageBuffer);
    console.log(node.id);
    console.log(node.name);
    console.log(newImage);
    const fills = clone(node.fills);
    fills.forEach((fill) => {
      if (fill.type === 'IMAGE') {
        fill.imageHash = newImage.hash;
      }
    });

    node.fills = fills;
  },
  'new-feed': (msg) => {
    console.log("rawData:",msg.rawData);
    console.log("keys:",msg.keys);
    const { type, keys, rawData, data, dataType } = msg;
    let currentPage = figma.currentPage;
    console.log("currentPage:",currentPage);
    let currentSelection = currentPage.selection;
    if (!currentSelection) {
      currentSelection = [currentPage]
    }
    console.log("currentSelection",currentSelection);

    let keyIndex = {};
    let indexKeys;
    currentSelection.forEach((selection) => {
      indexKeysFromSelection(selection,keyIndex);
    });
    
    indexKeys = Object.keys(keyIndex);
    if (indexKeys.length) {
      data.forEach((record,index) => {
        const recordKeys = Object.keys(record);
        indexKeys.forEach((indexKey) => {
          if (keyIndex[indexKey][index]) {
            console.log(record);
            console.log(indexKey);
            const recordValue = record[indexKey];
            console.log("recordValue",recordValue);
            if (!recordValue) {
              return;
            }
            if (
                (
                recordValue.startsWith("http") ||
                recordValue.startsWith("https")
                ) && 
                (
                  recordValue.endsWith(".gif") || 
                  recordValue.endsWith(".jpg") || 
                  recordValue.endsWith(".png")
                )
            ) {
              keyIndex[indexKey][index].fillType = "image";
            } else {
              keyIndex[indexKey][index].fillType = "text";
            }

            keyIndex[indexKey][index].value = recordValue;
          }
        });
      });
    }
    // keys.forEach((key) => {
    //   deepFindByNameAndType(selection, key, 'TEXT', foundItems);
    // });
    console.log("keyIndex",keyIndex);
    indexKeys.forEach((indexKey) => {
      const keyArray = keyIndex[indexKey];

      if (keyArray.length) {
        keyArray.forEach((keyArrayItem) => {
          const node = figma.getNodeById(keyArrayItem.id);
          console.log("Processing node:", node, node.id, node.name);
          if (keyArrayItem.fillType === 'text') {
            figma.loadFontAsync(node.fontName).then(() => {
              node.characters = keyArrayItem.value;
              node.name = "#" + indexKey;
            });
          } else if (keyArrayItem.fillType === 'image') {
            // let blob = await fetch(url).then(r => r.blob());
            console.log("Fetch Image Request...");
            fetchImageBlob(clone(keyArrayItem));
          };
        });
      }
    });
    // if (foundItems.length) {
    
    // }
    // data.forEach((item) => {
    //   Object.keys(item).forEach((key) => {
    //       // const figmaElement = figma.getNodeById("#" + key.trim());
          
    //   });
    // });
    

    
    
    // var request = new XMLHttpRequest();
    // request.open('GET', msg.json_url, true);

    // request.onload = function() {
    //   if (this.status >= 200 && this.status < 400) {
    //     // Success!
    //     var data = JSON.parse(this.response);
    //     console.log(data);
    //   } else {
    //     // We reached our target server, but it returned an error

    //   }
    // };

    // request.onerror = function() {
    //   // There was a connection error of some sort
    // };

    // request.send();
  }
}
// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
    // One way of distinguishing between different types of messages sent from
    // your HTML page is to use an object with a "type" property like this.
    if (msg.type) {
      handlers[msg.type](msg);
    }
    // const nodes = [];
    // for (let i = 0; i < ; i++) {
    //     const rect = figma.createRectangle();
    //     rect.x = i * 150;
    //     rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
    //     figma.currentPage.appendChild(rect);
    //     nodes.push(rect);
    // }
    // figma.currentPage.selection = nodes;
    // figma.viewport.scrollAndZoomIntoView(nodes);
    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
    setTimeout(() => {
      figma.closePlugin();
    },5000);
    
};
