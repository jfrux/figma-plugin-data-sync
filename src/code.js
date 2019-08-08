
import defaultState from './constants/default-state.js';

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

async function fetchImageBlob(data) {
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

const getPersistedStorage = async () => {
  console.log("[data-sync-plugin] Retrieving persisted client storage.");
  const stateKeys = Object.keys(defaultState);
  let stateObj = {};
  const results = await Promise.all(stateKeys.map(async (stateKey) => {
    let defaultValue = defaultState[stateKey];
    let value = await figma.clientStorage.getAsync(stateKey);
    if (!value) {
      value = defaultValue;
    }
    return { stateKey, value };
  }))
  results.forEach((result) => {
    stateObj[result.stateKey] = result.value;
  })
  return stateObj;
}

const getCurrentSelection = () => {
  let currentPage = figma.currentPage;
  let selectionType = 'items';
  let currentSelection = currentPage.selection;
  console.log("Current Page:",currentPage);
  console.log("Current Selection:",currentSelection);
  if (!currentSelection.length) {
    selectionType = 'page'
    currentSelection = [currentPage]
  }

  figma.clientStorage.setAsync('currentSelectionType',selectionType);
  figma.clientStorage.setAsync('currentSelection',currentSelection);
  return currentSelection;
}

const getIndexedSelection = (currentSelection) => {
  let keyIndex = {};
  currentSelection.forEach((selection) => {
    indexKeysFromSelection(selection,keyIndex);
  });
  const keys = Object.keys(keyIndex);

  if (keys.length > 0) {
    console.log("[data-sync-plugin] Found items in selection that are mappable.");
    figma.clientStorage.setAsync('currentSelectionIndex',keyIndex);
    return keyIndex;
  } else {
    console.log("[data-sync-plugin] Nothing usable in selection...");
    figma.clientStorage.setAsync('currentSelectionIndex',null);
    return;
  }
}

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
  'get-persisted-state': async () => {
    const currentSelection = getCurrentSelection();
    const keyIndex = getIndexedSelection(currentSelection);
    const resultObj = await getPersistedStorage();
    
    console.log("Sending client variables to UI",resultObj);
    
    sendMessage('receive-persisted-state',resultObj);
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

  'sync': async (payload) => {
    const { type, keys, rawData, data, dataType, jsonUrl } = payload;

    const currentSelection = getCurrentSelection();

    if (!data) {
      sendMessage('sync-error','No data was found in the response...');
    }

    let indexKeys;

    let keyIndex = getIndexedSelection(currentSelection);
    
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
          
        });
      }
    });
    
    // setTimeout(() => {
    //   figma.closePlugin();
    // },5000);
  }
}
const handleKeyArrayItem = async (keyArrayItem) => {
  const node = figma.getNodeById(keyArrayItem.id);
  console.log("Processing node:", node, node.id, node.name);
  if (keyArrayItem.fillType === 'text') {
    if (node.fontName) {
      await figma.loadFontAsync(node.fontName).then(() => {
        node.characters = keyArrayItem.value;
        node.name = "#" + indexKey;
      });
    } else if (node.characters) {
      node.characters = keyArrayItem.value;
      node.name = "#" + indexKey;
    }
  } else if (keyArrayItem.fillType === 'image') {
    // let blob = await fetch(url).then(r => r.blob());
    console.log("Fetch Image Request...");
    await fetchImageBlob(clone(keyArrayItem));
  };
}
const receiveMessage = (event) => {
  const { type, payload } = event;
  if (!type) {
    return;
  }
  console.log(`[data-sync-plugin] Receive message`, type, payload);
  if (type) {
    handlers[type](payload);
  }
}

const sendMessage = (type,payload = null) => {
  console.log(`[data-sync-plugin] Send message`, type, payload);
  figma.ui.postMessage({
    type,
    payload
  });
}

figma.ui.onmessage = receiveMessage;
