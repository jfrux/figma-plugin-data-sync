figma.showUI(__html__, {
  width: 600,
  height: 400
});

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
    
    const matchingInstance = node.children.filter((item) => {
      return item.type !== type;
    });

    if (matchingInstance.length) {
      matchingInstance.forEach((item) => {
        deepFindByNameAndType(item, name, type, foundItems);
      });
    }
  }
}

function fetchImageBlob(data) {
    sendMessage('fetch-image', data);
}

const indexKeysFromSelection = (node, keyIndex) => {
  if (node.children) {
    node.children.forEach((child) => {
      
      if (child.name.indexOf('#') >= 0) {
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
const clientVariables = [
  ['lastUsedUrl',''],
  ['json_url',''],
  ['lastUsedText',''],
  ['csv_text',''],
  ['csv_header',false],
  ['json_text',''],
  ['activeTab','json']
];



const handlers = {
  'cancel': (msg) => {
    figma.closePlugin();
  },
  'set-client-variables': (payload) => {
    const keys = Object.keys(payload);
    keys.forEach((key) => {
      let value = payload[key];
      figma.clientStorage.setAsync(key,value);
    });
  },
  'get-client-variables': () => {
    console.log("Requesting client variables");
    Promise.all(clientVariables.map((variable) => {
      let key = variable[0];
      let defaultValue = variable[1];
      return figma.clientStorage.getAsync(key).then((value) => {
        if (!value) {
          value = variable[1];
        }
        return { key, value };
      });
    })).then((results) => {
      let resultObj = {};
      console.log("Sending client variables to UI",results);
      results.forEach((result) => {
        resultObj[result.key] = result.value;
      });
      sendMessage('receive-client-variables',resultObj);
    });
  },
  'image-blob-response': (payload) => {
    const node = figma.getNodeById(payload.id);
    const newImage = figma.createImage(payload.imageBuffer);
    const fills = clone(node.fills);

    fills.forEach((fill) => {
      if (fill.type === 'IMAGE') {
        fill.imageHash = newImage.hash;
      }
    });

    node.fills = fills;
  },

  'sync': (payload) => {
    const { type, keys, rawData, data, dataType, json_url } = payload;
    let currentPage = figma.currentPage;
    let currentSelection = currentPage.selection;

    if (!data) {
      sendMessage('sync-error','No data was found in the response...');
    }
    if (!currentSelection) {
      currentSelection = [currentPage]
    }


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
            const recordValue = record[indexKey];
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
    
    setTimeout(() => {
      figma.closePlugin();
    },5000);
  }
}

const receiveMessage = (event) => {
  const { type, payload } = event;
  if (!type) {
    return;
  }
  console.log(`[app] Receive message`, type, payload);
  if (type) {
    handlers[type](payload);
  }
}

const sendMessage = (type,payload = null) => {
  console.log(`[app] Send message`, type, payload);
  figma.ui.postMessage({
    type,
    payload
  });
}

figma.ui.onmessage = receiveMessage;
