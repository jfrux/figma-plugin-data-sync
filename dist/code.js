/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/code.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/code.js":
/*!*********************!*\
  !*** ./src/code.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants_default_state_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants/default-state.js */ "./src/constants/default-state.js");

figma.showUI(__html__, {
  width: 600,
  height: 400
});

function clone(val) {
  const type = typeof val;

  if (val === null) {
    return null;
  } else if (type === 'undefined' || type === 'number' || type === 'string' || type === 'boolean') {
    return val;
  } else if (type === 'object') {
    if (val instanceof Array) {
      return val.map(x => clone(x));
    } else if (val instanceof Uint8Array) {
      return new Uint8Array(val);
    } else {
      let o = {};

      for (const key in val) {
        o[key] = clone(val[key]);
      }

      return o;
    }
  }

  throw 'unknown';
}

const deepFindByNameAndType = function (node, name, type, foundItems) {
  // console.log("Searching node ",node);
  if (node.children) {
    node.children.forEach(item => {
      if (item.name === name && item.type === type) {
        foundItems.push(item);
      }
    });
    const matchingInstance = node.children.filter(item => {
      return item.type !== type;
    });

    if (matchingInstance.length) {
      matchingInstance.forEach(item => {
        deepFindByNameAndType(item, name, type, foundItems);
      });
    }
  }
};

async function fetchImageBlob(data) {
  sendMessage('fetch-image', data);
}

const indexKeysFromSelection = (node, keyIndex) => {
  if (node.children) {
    node.children.forEach(child => {
      if (child.name.indexOf('#') >= 0) {
        const name = child.name.replace('#', '');

        if (!keyIndex.hasOwnProperty(name)) {
          keyIndex[name] = [];
        }

        keyIndex[name].push({
          id: child.id,
          type: child.type
        });
      }
    });
    const matchingInstance = node.children.filter(item => {
      return item.name.indexOf('#') == -1;
    });

    if (matchingInstance.length) {
      matchingInstance.forEach(item => {
        indexKeysFromSelection(item, keyIndex);
      });
    }
  }
};

const getPersistedStorage = async () => {
  console.log("[data-sync-plugin] Retrieving persisted client storage.");
  const stateKeys = Object.keys(_constants_default_state_js__WEBPACK_IMPORTED_MODULE_0__["default"]);
  let stateObj = {};
  const results = await Promise.all(stateKeys.map(async stateKey => {
    let defaultValue = _constants_default_state_js__WEBPACK_IMPORTED_MODULE_0__["default"][stateKey];
    let value = await figma.clientStorage.getAsync(stateKey);

    if (!value) {
      value = defaultValue;
    }

    return {
      stateKey,
      value
    };
  }));
  results.forEach(result => {
    stateObj[result.stateKey] = result.value;
  });
  return stateObj;
};

const getCurrentSelection = () => {
  let currentPage = figma.currentPage;
  let selectionType = 'items';
  let currentSelection = currentPage.selection;
  console.log("Current Page:", currentPage);
  console.log("Current Selection:", currentSelection);

  if (!currentSelection.length) {
    selectionType = 'page';
    currentSelection = [currentPage];
  }

  figma.clientStorage.setAsync('currentSelectionType', selectionType);
  figma.clientStorage.setAsync('currentSelection', currentSelection);
  return currentSelection;
};

const getIndexedSelection = currentSelection => {
  let keyIndex = {};
  currentSelection.forEach(selection => {
    indexKeysFromSelection(selection, keyIndex);
  });
  const keys = Object.keys(keyIndex);

  if (keys.length > 0) {
    console.log("[data-sync-plugin] Found items in selection that are mappable.");
    figma.clientStorage.setAsync('currentSelectionIndex', keyIndex);
    return keyIndex;
  } else {
    console.log("[data-sync-plugin] Nothing usable in selection...");
    figma.clientStorage.setAsync('currentSelectionIndex', null);
    return;
  }
};

const handlers = {
  'cancel': msg => {
    figma.closePlugin();
  },
  'set-client-variables': payload => {
    const keys = Object.keys(payload);
    keys.forEach(key => {
      let value = payload[key];
      figma.clientStorage.setAsync(key, value);
    });
  },
  'get-persisted-state': async () => {
    const currentSelection = getCurrentSelection();
    const keyIndex = getIndexedSelection(currentSelection);
    const resultObj = await getPersistedStorage();
    console.log("Sending client variables to UI", resultObj);
    sendMessage('receive-persisted-state', resultObj);
  },
  'image-blob-response': payload => {
    const node = figma.getNodeById(payload.id);
    const newImage = figma.createImage(payload.imageBuffer);
    const fills = clone(node.fills);
    fills.forEach(fill => {
      if (fill.type === 'IMAGE') {
        fill.imageHash = newImage.hash;
      }
    });
    node.fills = fills;
  },
  'sync': async payload => {
    const {
      type,
      keys,
      rawData,
      data,
      dataType,
      jsonUrl
    } = payload;
    const currentSelection = getCurrentSelection();

    if (!data) {
      sendMessage('sync-error', 'No data was found in the response...');
    }

    let indexKeys;
    let keyIndex = getIndexedSelection(currentSelection);
    indexKeys = Object.keys(keyIndex);

    if (indexKeys.length) {
      data.forEach((record, index) => {
        const recordKeys = Object.keys(record);
        indexKeys.forEach(indexKey => {
          if (keyIndex[indexKey][index]) {
            const recordValue = record[indexKey];

            if (!recordValue) {
              return;
            }

            if ((recordValue.startsWith("http") || recordValue.startsWith("https")) && (recordValue.endsWith(".gif") || recordValue.endsWith(".jpg") || recordValue.endsWith(".png"))) {
              keyIndex[indexKey][index].fillType = "image";
            } else {
              keyIndex[indexKey][index].fillType = "text";
            }

            keyIndex[indexKey][index].value = recordValue;
          }
        });
      });
    }

    indexKeys.forEach(indexKey => {
      const keyArray = keyIndex[indexKey];

      if (keyArray.length) {
        keyArray.forEach(keyArrayItem => {});
      }
    }); // setTimeout(() => {
    //   figma.closePlugin();
    // },5000);
  }
};

const handleKeyArrayItem = async keyArrayItem => {
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
  }

  ;
};

const receiveMessage = event => {
  const {
    type,
    payload
  } = event;

  if (!type) {
    return;
  }

  console.log(`[data-sync-plugin] Receive message`, type, payload);

  if (type) {
    handlers[type](payload);
  }
};

const sendMessage = (type, payload = null) => {
  console.log(`[data-sync-plugin] Send message`, type, payload);
  figma.ui.postMessage({
    type,
    payload
  });
};

figma.ui.onmessage = receiveMessage;

/***/ }),

/***/ "./src/constants/default-state.js":
/*!****************************************!*\
  !*** ./src/constants/default-state.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  'currentSelectionIndex': null,
  'currentSelection': [],
  'currentSelectionType': '',
  'json': null,
  'jsonKeys': null,
  'jsonUrl': '',
  'jsonText': '',
  'finalArray': [],
  'csvFilePath': '',
  'csvText': '',
  'csvIncludesHeader': false,
  'processing': false,
  'lastUsedText': null,
  'lastUsedUrl': null,
  'loading': true,
  'activeTab': 'json',
  'error': null
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnN0YW50cy9kZWZhdWx0LXN0YXRlLmpzIl0sIm5hbWVzIjpbImZpZ21hIiwic2hvd1VJIiwiX19odG1sX18iLCJ3aWR0aCIsImhlaWdodCIsImNsb25lIiwidmFsIiwidHlwZSIsIkFycmF5IiwibWFwIiwieCIsIlVpbnQ4QXJyYXkiLCJvIiwia2V5IiwiZGVlcEZpbmRCeU5hbWVBbmRUeXBlIiwibm9kZSIsIm5hbWUiLCJmb3VuZEl0ZW1zIiwiY2hpbGRyZW4iLCJmb3JFYWNoIiwiaXRlbSIsInB1c2giLCJtYXRjaGluZ0luc3RhbmNlIiwiZmlsdGVyIiwibGVuZ3RoIiwiZmV0Y2hJbWFnZUJsb2IiLCJkYXRhIiwic2VuZE1lc3NhZ2UiLCJpbmRleEtleXNGcm9tU2VsZWN0aW9uIiwia2V5SW5kZXgiLCJjaGlsZCIsImluZGV4T2YiLCJyZXBsYWNlIiwiaGFzT3duUHJvcGVydHkiLCJpZCIsImdldFBlcnNpc3RlZFN0b3JhZ2UiLCJjb25zb2xlIiwibG9nIiwic3RhdGVLZXlzIiwiT2JqZWN0Iiwia2V5cyIsImRlZmF1bHRTdGF0ZSIsInN0YXRlT2JqIiwicmVzdWx0cyIsIlByb21pc2UiLCJhbGwiLCJzdGF0ZUtleSIsImRlZmF1bHRWYWx1ZSIsInZhbHVlIiwiY2xpZW50U3RvcmFnZSIsImdldEFzeW5jIiwicmVzdWx0IiwiZ2V0Q3VycmVudFNlbGVjdGlvbiIsImN1cnJlbnRQYWdlIiwic2VsZWN0aW9uVHlwZSIsImN1cnJlbnRTZWxlY3Rpb24iLCJzZWxlY3Rpb24iLCJzZXRBc3luYyIsImdldEluZGV4ZWRTZWxlY3Rpb24iLCJoYW5kbGVycyIsIm1zZyIsImNsb3NlUGx1Z2luIiwicGF5bG9hZCIsInJlc3VsdE9iaiIsImdldE5vZGVCeUlkIiwibmV3SW1hZ2UiLCJjcmVhdGVJbWFnZSIsImltYWdlQnVmZmVyIiwiZmlsbHMiLCJmaWxsIiwiaW1hZ2VIYXNoIiwiaGFzaCIsInJhd0RhdGEiLCJkYXRhVHlwZSIsImpzb25VcmwiLCJpbmRleEtleXMiLCJyZWNvcmQiLCJpbmRleCIsInJlY29yZEtleXMiLCJpbmRleEtleSIsInJlY29yZFZhbHVlIiwic3RhcnRzV2l0aCIsImVuZHNXaXRoIiwiZmlsbFR5cGUiLCJrZXlBcnJheSIsImtleUFycmF5SXRlbSIsImhhbmRsZUtleUFycmF5SXRlbSIsImZvbnROYW1lIiwibG9hZEZvbnRBc3luYyIsInRoZW4iLCJjaGFyYWN0ZXJzIiwicmVjZWl2ZU1lc3NhZ2UiLCJldmVudCIsInVpIiwicG9zdE1lc3NhZ2UiLCJvbm1lc3NhZ2UiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNqRkE7QUFBQTtBQUFBO0FBRUFBLEtBQUssQ0FBQ0MsTUFBTixDQUFhQyxRQUFiLEVBQXVCO0FBQ3JCQyxPQUFLLEVBQUUsR0FEYztB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QXdEdUQsT0FBeEQ7O0FBQ0EsTUFBSXZELElBQUosRUFBVTtBQUNSb0QsWUFBUSxDQUFDcEQsSUFBRCxDQUFSLENBQWV1RCxPQUFmO0FBQ0Q7QUFDRixDQVREOztBQVdBLE1BQU1uQyxXQUFXLEdBQUcsQ0FBQ3BCLElBQUQsRUFBTXVELE9BQU8sR0FBRyxJQUFoQixLQUF5QjtBQUMzQzFCLFNBQU8sQ0FBQ0MsR0FBUixDQUFhLGlDQUFiLEVBQStDOUIsSUFBL0MsRUFBcUR1RCxPQUFyRDtBQUNBOUQsT0FBSyxDQUFDNkYsRUFBTixDQUFTQyxXQUFULENBQXFCO0FBQ25CdkYsUUFEbUI7QUFFbkJ1RDtBQUZtQixHQUFyQjtBQUlELENBTkQ7O0FBUUE5RCxLQUFLLENBQUM2RixFQUFOLENBQVNFLFNBQVQsR0FBcUJKLGNBQXJCLEM7Ozs7Ozs7Ozs7OztBQzdRQTtBQUFlO0FBQ2IsMkJBQXlCLElBRFo7QUFFYixzQkFBb0IsRUFGUDtBQUdiLDBCQUF3QixFQUhYO0FBSWIsVUFBUSxJQUpLO0FBS2IsY0FBWSxJQUxDO0FBTWIsYUFBVyxFQU5FO0FBT2IsY0FBWSxFQVBDO0FBUWIsZ0JBQWMsRUFSRDtBQVNiLGlCQUFlLEVBVEY7QUFVYixhQUFXLEVBVkU7QUFXYix1QkFBcUIsS0FYUjtBQVliLGdCQUFjLEtBWkQ7QUFhYixrQkFBZ0IsSUFiSDtBQWNiLGlCQUFlLElBZEY7QUFlYixhQUFXLElBZkU7QUFnQmIsZUFBYSxNQWhCQTtBQWlCYixXQUFTO0FBakJJLENBQWYsRSIsImZpbGUiOiJjb2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvY29kZS5qc1wiKTtcbiIsIlxuaW1wb3J0IGRlZmF1bHRTdGF0ZSBmcm9tICcuL2NvbnN0YW50cy9kZWZhdWx0LXN0YXRlLmpzJztcblxuZmlnbWEuc2hvd1VJKF9faHRtbF9fLCB7XG4gIHdpZHRoOiA2MDAsXG4gIGhlaWdodDogNDAwXG59KTtcblxuZnVuY3Rpb24gY2xvbmUodmFsKSB7XG4gIGNvbnN0IHR5cGUgPSB0eXBlb2YgdmFsXG4gIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9IGVsc2UgaWYgKHR5cGUgPT09ICd1bmRlZmluZWQnIHx8IHR5cGUgPT09ICdudW1iZXInIHx8XG4gICAgICAgICAgICAgdHlwZSA9PT0gJ3N0cmluZycgfHwgdHlwZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgcmV0dXJuIHZhbFxuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgaWYgKHZhbCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICByZXR1cm4gdmFsLm1hcCh4ID0+IGNsb25lKHgpKVxuICAgIH0gZWxzZSBpZiAodmFsIGluc3RhbmNlb2YgVWludDhBcnJheSkge1xuICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KHZhbClcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IG8gPSB7fVxuICAgICAgZm9yIChjb25zdCBrZXkgaW4gdmFsKSB7XG4gICAgICAgIG9ba2V5XSA9IGNsb25lKHZhbFtrZXldKVxuICAgICAgfVxuICAgICAgcmV0dXJuIG9cbiAgICB9XG4gIH1cbiAgdGhyb3cgJ3Vua25vd24nXG59XG5cbmNvbnN0IGRlZXBGaW5kQnlOYW1lQW5kVHlwZSA9IGZ1bmN0aW9uKG5vZGUsIG5hbWUsIHR5cGUsIGZvdW5kSXRlbXMpIHtcbiAgLy8gY29uc29sZS5sb2coXCJTZWFyY2hpbmcgbm9kZSBcIixub2RlKTtcbiAgaWYgKG5vZGUuY2hpbGRyZW4pIHtcbiAgICBub2RlLmNoaWxkcmVuLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGlmIChpdGVtLm5hbWUgPT09IG5hbWUgJiYgaXRlbS50eXBlID09PSB0eXBlKSB7XG4gICAgICAgIGZvdW5kSXRlbXMucHVzaChpdGVtKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICBjb25zdCBtYXRjaGluZ0luc3RhbmNlID0gbm9kZS5jaGlsZHJlbi5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgIHJldHVybiBpdGVtLnR5cGUgIT09IHR5cGU7XG4gICAgfSk7XG5cbiAgICBpZiAobWF0Y2hpbmdJbnN0YW5jZS5sZW5ndGgpIHtcbiAgICAgIG1hdGNoaW5nSW5zdGFuY2UuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBkZWVwRmluZEJ5TmFtZUFuZFR5cGUoaXRlbSwgbmFtZSwgdHlwZSwgZm91bmRJdGVtcyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZmV0Y2hJbWFnZUJsb2IoZGF0YSkge1xuICBzZW5kTWVzc2FnZSgnZmV0Y2gtaW1hZ2UnLCBkYXRhKTtcbn1cblxuY29uc3QgaW5kZXhLZXlzRnJvbVNlbGVjdGlvbiA9IChub2RlLCBrZXlJbmRleCkgPT4ge1xuICBpZiAobm9kZS5jaGlsZHJlbikge1xuICAgIG5vZGUuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgIFxuICAgICAgaWYgKGNoaWxkLm5hbWUuaW5kZXhPZignIycpID49IDApIHtcbiAgICAgICAgY29uc3QgbmFtZSA9IGNoaWxkLm5hbWUucmVwbGFjZSgnIycsJycpO1xuICAgICAgICBpZiAoIWtleUluZGV4Lmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgICAga2V5SW5kZXhbbmFtZV0gPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBrZXlJbmRleFtuYW1lXS5wdXNoKHtcbiAgICAgICAgICBpZDogY2hpbGQuaWQsXG4gICAgICAgICAgdHlwZTogY2hpbGQudHlwZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IG1hdGNoaW5nSW5zdGFuY2UgPSBub2RlLmNoaWxkcmVuLmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgcmV0dXJuIGl0ZW0ubmFtZS5pbmRleE9mKCcjJykgPT0gLTE7XG4gICAgfSk7XG5cbiAgICBpZiAobWF0Y2hpbmdJbnN0YW5jZS5sZW5ndGgpIHtcbiAgICAgIG1hdGNoaW5nSW5zdGFuY2UuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBpbmRleEtleXNGcm9tU2VsZWN0aW9uKGl0ZW0sIGtleUluZGV4KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuXG5jb25zdCBnZXRQZXJzaXN0ZWRTdG9yYWdlID0gYXN5bmMgKCkgPT4ge1xuICBjb25zb2xlLmxvZyhcIltkYXRhLXN5bmMtcGx1Z2luXSBSZXRyaWV2aW5nIHBlcnNpc3RlZCBjbGllbnQgc3RvcmFnZS5cIik7XG4gIGNvbnN0IHN0YXRlS2V5cyA9IE9iamVjdC5rZXlzKGRlZmF1bHRTdGF0ZSk7XG4gIGxldCBzdGF0ZU9iaiA9IHt9O1xuICBjb25zdCByZXN1bHRzID0gYXdhaXQgUHJvbWlzZS5hbGwoc3RhdGVLZXlzLm1hcChhc3luYyAoc3RhdGVLZXkpID0+IHtcbiAgICBsZXQgZGVmYXVsdFZhbHVlID0gZGVmYXVsdFN0YXRlW3N0YXRlS2V5XTtcbiAgICBsZXQgdmFsdWUgPSBhd2FpdCBmaWdtYS5jbGllbnRTdG9yYWdlLmdldEFzeW5jKHN0YXRlS2V5KTtcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICB2YWx1ZSA9IGRlZmF1bHRWYWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHsgc3RhdGVLZXksIHZhbHVlIH07XG4gIH0pKVxuICByZXN1bHRzLmZvckVhY2goKHJlc3VsdCkgPT4ge1xuICAgIHN0YXRlT2JqW3Jlc3VsdC5zdGF0ZUtleV0gPSByZXN1bHQudmFsdWU7XG4gIH0pXG4gIHJldHVybiBzdGF0ZU9iajtcbn1cblxuY29uc3QgZ2V0Q3VycmVudFNlbGVjdGlvbiA9ICgpID0+IHtcbiAgbGV0IGN1cnJlbnRQYWdlID0gZmlnbWEuY3VycmVudFBhZ2U7XG4gIGxldCBzZWxlY3Rpb25UeXBlID0gJ2l0ZW1zJztcbiAgbGV0IGN1cnJlbnRTZWxlY3Rpb24gPSBjdXJyZW50UGFnZS5zZWxlY3Rpb247XG4gIGNvbnNvbGUubG9nKFwiQ3VycmVudCBQYWdlOlwiLGN1cnJlbnRQYWdlKTtcbiAgY29uc29sZS5sb2coXCJDdXJyZW50IFNlbGVjdGlvbjpcIixjdXJyZW50U2VsZWN0aW9uKTtcbiAgaWYgKCFjdXJyZW50U2VsZWN0aW9uLmxlbmd0aCkge1xuICAgIHNlbGVjdGlvblR5cGUgPSAncGFnZSdcbiAgICBjdXJyZW50U2VsZWN0aW9uID0gW2N1cnJlbnRQYWdlXVxuICB9XG5cbiAgZmlnbWEuY2xpZW50U3RvcmFnZS5zZXRBc3luYygnY3VycmVudFNlbGVjdGlvblR5cGUnLHNlbGVjdGlvblR5cGUpO1xuICBmaWdtYS5jbGllbnRTdG9yYWdlLnNldEFzeW5jKCdjdXJyZW50U2VsZWN0aW9uJyxjdXJyZW50U2VsZWN0aW9uKTtcbiAgcmV0dXJuIGN1cnJlbnRTZWxlY3Rpb247XG59XG5cbmNvbnN0IGdldEluZGV4ZWRTZWxlY3Rpb24gPSAoY3VycmVudFNlbGVjdGlvbikgPT4ge1xuICBsZXQga2V5SW5kZXggPSB7fTtcbiAgY3VycmVudFNlbGVjdGlvbi5mb3JFYWNoKChzZWxlY3Rpb24pID0+IHtcbiAgICBpbmRleEtleXNGcm9tU2VsZWN0aW9uKHNlbGVjdGlvbixrZXlJbmRleCk7XG4gIH0pO1xuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoa2V5SW5kZXgpO1xuXG4gIGlmIChrZXlzLmxlbmd0aCA+IDApIHtcbiAgICBjb25zb2xlLmxvZyhcIltkYXRhLXN5bmMtcGx1Z2luXSBGb3VuZCBpdGVtcyBpbiBzZWxlY3Rpb24gdGhhdCBhcmUgbWFwcGFibGUuXCIpO1xuICAgIGZpZ21hLmNsaWVudFN0b3JhZ2Uuc2V0QXN5bmMoJ2N1cnJlbnRTZWxlY3Rpb25JbmRleCcsa2V5SW5kZXgpO1xuICAgIHJldHVybiBrZXlJbmRleDtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmxvZyhcIltkYXRhLXN5bmMtcGx1Z2luXSBOb3RoaW5nIHVzYWJsZSBpbiBzZWxlY3Rpb24uLi5cIik7XG4gICAgZmlnbWEuY2xpZW50U3RvcmFnZS5zZXRBc3luYygnY3VycmVudFNlbGVjdGlvbkluZGV4JyxudWxsKTtcbiAgICByZXR1cm47XG4gIH1cbn1cblxuY29uc3QgaGFuZGxlcnMgPSB7XG4gICdjYW5jZWwnOiAobXNnKSA9PiB7XG4gICAgZmlnbWEuY2xvc2VQbHVnaW4oKTtcbiAgfSxcbiAgJ3NldC1jbGllbnQtdmFyaWFibGVzJzogKHBheWxvYWQpID0+IHtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMocGF5bG9hZCk7XG4gICAga2V5cy5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGxldCB2YWx1ZSA9IHBheWxvYWRba2V5XTtcbiAgICAgIGZpZ21hLmNsaWVudFN0b3JhZ2Uuc2V0QXN5bmMoa2V5LHZhbHVlKTtcbiAgICB9KTtcbiAgfSxcbiAgJ2dldC1wZXJzaXN0ZWQtc3RhdGUnOiBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgY3VycmVudFNlbGVjdGlvbiA9IGdldEN1cnJlbnRTZWxlY3Rpb24oKTtcbiAgICBjb25zdCBrZXlJbmRleCA9IGdldEluZGV4ZWRTZWxlY3Rpb24oY3VycmVudFNlbGVjdGlvbik7XG4gICAgY29uc3QgcmVzdWx0T2JqID0gYXdhaXQgZ2V0UGVyc2lzdGVkU3RvcmFnZSgpO1xuICAgIFxuICAgIGNvbnNvbGUubG9nKFwiU2VuZGluZyBjbGllbnQgdmFyaWFibGVzIHRvIFVJXCIscmVzdWx0T2JqKTtcbiAgICBcbiAgICBzZW5kTWVzc2FnZSgncmVjZWl2ZS1wZXJzaXN0ZWQtc3RhdGUnLHJlc3VsdE9iaik7XG4gIH0sXG4gICdpbWFnZS1ibG9iLXJlc3BvbnNlJzogKHBheWxvYWQpID0+IHtcbiAgICBjb25zdCBub2RlID0gZmlnbWEuZ2V0Tm9kZUJ5SWQocGF5bG9hZC5pZCk7XG4gICAgY29uc3QgbmV3SW1hZ2UgPSBmaWdtYS5jcmVhdGVJbWFnZShwYXlsb2FkLmltYWdlQnVmZmVyKTtcbiAgICBjb25zdCBmaWxscyA9IGNsb25lKG5vZGUuZmlsbHMpO1xuXG4gICAgZmlsbHMuZm9yRWFjaCgoZmlsbCkgPT4ge1xuICAgICAgaWYgKGZpbGwudHlwZSA9PT0gJ0lNQUdFJykge1xuICAgICAgICBmaWxsLmltYWdlSGFzaCA9IG5ld0ltYWdlLmhhc2g7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBub2RlLmZpbGxzID0gZmlsbHM7XG4gIH0sXG5cbiAgJ3N5bmMnOiBhc3luYyAocGF5bG9hZCkgPT4ge1xuICAgIGNvbnN0IHsgdHlwZSwga2V5cywgcmF3RGF0YSwgZGF0YSwgZGF0YVR5cGUsIGpzb25VcmwgfSA9IHBheWxvYWQ7XG5cbiAgICBjb25zdCBjdXJyZW50U2VsZWN0aW9uID0gZ2V0Q3VycmVudFNlbGVjdGlvbigpO1xuXG4gICAgaWYgKCFkYXRhKSB7XG4gICAgICBzZW5kTWVzc2FnZSgnc3luYy1lcnJvcicsJ05vIGRhdGEgd2FzIGZvdW5kIGluIHRoZSByZXNwb25zZS4uLicpO1xuICAgIH1cblxuICAgIGxldCBpbmRleEtleXM7XG5cbiAgICBsZXQga2V5SW5kZXggPSBnZXRJbmRleGVkU2VsZWN0aW9uKGN1cnJlbnRTZWxlY3Rpb24pO1xuICAgIFxuICAgIGluZGV4S2V5cyA9IE9iamVjdC5rZXlzKGtleUluZGV4KTtcblxuICAgIGlmIChpbmRleEtleXMubGVuZ3RoKSB7XG4gICAgICBkYXRhLmZvckVhY2goKHJlY29yZCxpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCByZWNvcmRLZXlzID0gT2JqZWN0LmtleXMocmVjb3JkKTtcbiAgICAgICAgaW5kZXhLZXlzLmZvckVhY2goKGluZGV4S2V5KSA9PiB7XG4gICAgICAgICAgaWYgKGtleUluZGV4W2luZGV4S2V5XVtpbmRleF0pIHtcbiAgICAgICAgICAgIGNvbnN0IHJlY29yZFZhbHVlID0gcmVjb3JkW2luZGV4S2V5XTtcbiAgICAgICAgICAgIGlmICghcmVjb3JkVmFsdWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICByZWNvcmRWYWx1ZS5zdGFydHNXaXRoKFwiaHR0cFwiKSB8fFxuICAgICAgICAgICAgICAgIHJlY29yZFZhbHVlLnN0YXJ0c1dpdGgoXCJodHRwc1wiKVxuICAgICAgICAgICAgICAgICkgJiYgXG4gICAgICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgICAgcmVjb3JkVmFsdWUuZW5kc1dpdGgoXCIuZ2lmXCIpIHx8IFxuICAgICAgICAgICAgICAgICAgcmVjb3JkVmFsdWUuZW5kc1dpdGgoXCIuanBnXCIpIHx8IFxuICAgICAgICAgICAgICAgICAgcmVjb3JkVmFsdWUuZW5kc1dpdGgoXCIucG5nXCIpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGtleUluZGV4W2luZGV4S2V5XVtpbmRleF0uZmlsbFR5cGUgPSBcImltYWdlXCI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBrZXlJbmRleFtpbmRleEtleV1baW5kZXhdLmZpbGxUeXBlID0gXCJ0ZXh0XCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGtleUluZGV4W2luZGV4S2V5XVtpbmRleF0udmFsdWUgPSByZWNvcmRWYWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaW5kZXhLZXlzLmZvckVhY2goKGluZGV4S2V5KSA9PiB7XG4gICAgICBjb25zdCBrZXlBcnJheSA9IGtleUluZGV4W2luZGV4S2V5XTtcblxuICAgICAgaWYgKGtleUFycmF5Lmxlbmd0aCkge1xuICAgICAgICBrZXlBcnJheS5mb3JFYWNoKChrZXlBcnJheUl0ZW0pID0+IHtcbiAgICAgICAgICBcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgLy8gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgLy8gICBmaWdtYS5jbG9zZVBsdWdpbigpO1xuICAgIC8vIH0sNTAwMCk7XG4gIH1cbn1cbmNvbnN0IGhhbmRsZUtleUFycmF5SXRlbSA9IGFzeW5jIChrZXlBcnJheUl0ZW0pID0+IHtcbiAgY29uc3Qgbm9kZSA9IGZpZ21hLmdldE5vZGVCeUlkKGtleUFycmF5SXRlbS5pZCk7XG4gIGNvbnNvbGUubG9nKFwiUHJvY2Vzc2luZyBub2RlOlwiLCBub2RlLCBub2RlLmlkLCBub2RlLm5hbWUpO1xuICBpZiAoa2V5QXJyYXlJdGVtLmZpbGxUeXBlID09PSAndGV4dCcpIHtcbiAgICBpZiAobm9kZS5mb250TmFtZSkge1xuICAgICAgYXdhaXQgZmlnbWEubG9hZEZvbnRBc3luYyhub2RlLmZvbnROYW1lKS50aGVuKCgpID0+IHtcbiAgICAgICAgbm9kZS5jaGFyYWN0ZXJzID0ga2V5QXJyYXlJdGVtLnZhbHVlO1xuICAgICAgICBub2RlLm5hbWUgPSBcIiNcIiArIGluZGV4S2V5O1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChub2RlLmNoYXJhY3RlcnMpIHtcbiAgICAgIG5vZGUuY2hhcmFjdGVycyA9IGtleUFycmF5SXRlbS52YWx1ZTtcbiAgICAgIG5vZGUubmFtZSA9IFwiI1wiICsgaW5kZXhLZXk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGtleUFycmF5SXRlbS5maWxsVHlwZSA9PT0gJ2ltYWdlJykge1xuICAgIC8vIGxldCBibG9iID0gYXdhaXQgZmV0Y2godXJsKS50aGVuKHIgPT4gci5ibG9iKCkpO1xuICAgIGNvbnNvbGUubG9nKFwiRmV0Y2ggSW1hZ2UgUmVxdWVzdC4uLlwiKTtcbiAgICBhd2FpdCBmZXRjaEltYWdlQmxvYihjbG9uZShrZXlBcnJheUl0ZW0pKTtcbiAgfTtcbn1cbmNvbnN0IHJlY2VpdmVNZXNzYWdlID0gKGV2ZW50KSA9PiB7XG4gIGNvbnN0IHsgdHlwZSwgcGF5bG9hZCB9ID0gZXZlbnQ7XG4gIGlmICghdHlwZSkge1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zb2xlLmxvZyhgW2RhdGEtc3luYy1wbHVnaW5dIFJlY2VpdmUgbWVzc2FnZWAsIHR5cGUsIHBheWxvYWQpO1xuICBpZiAodHlwZSkge1xuICAgIGhhbmRsZXJzW3R5cGVdKHBheWxvYWQpO1xuICB9XG59XG5cbmNvbnN0IHNlbmRNZXNzYWdlID0gKHR5cGUscGF5bG9hZCA9IG51bGwpID0+IHtcbiAgY29uc29sZS5sb2coYFtkYXRhLXN5bmMtcGx1Z2luXSBTZW5kIG1lc3NhZ2VgLCB0eXBlLCBwYXlsb2FkKTtcbiAgZmlnbWEudWkucG9zdE1lc3NhZ2Uoe1xuICAgIHR5cGUsXG4gICAgcGF5bG9hZFxuICB9KTtcbn1cblxuZmlnbWEudWkub25tZXNzYWdlID0gcmVjZWl2ZU1lc3NhZ2U7XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gICdjdXJyZW50U2VsZWN0aW9uSW5kZXgnOiBudWxsLFxuICAnY3VycmVudFNlbGVjdGlvbic6IFtdLFxuICAnY3VycmVudFNlbGVjdGlvblR5cGUnOiAnJyxcbiAgJ2pzb24nOiBudWxsLFxuICAnanNvbktleXMnOiBudWxsLFxuICAnanNvblVybCc6ICcnLFxuICAnanNvblRleHQnOiAnJyxcbiAgJ2ZpbmFsQXJyYXknOiBbXSxcbiAgJ2NzdkZpbGVQYXRoJzogJycsXG4gICdjc3ZUZXh0JzogJycsXG4gICdjc3ZJbmNsdWRlc0hlYWRlcic6IGZhbHNlLFxuICAncHJvY2Vzc2luZyc6IGZhbHNlLFxuICAnbGFzdFVzZWRUZXh0JzogbnVsbCxcbiAgJ2xhc3RVc2VkVXJsJzogbnVsbCxcbiAgJ2xvYWRpbmcnOiB0cnVlLFxuICAnYWN0aXZlVGFiJzogJ2pzb24nLFxuICAnZXJyb3InOiBudWxsXG59OyJdLCJzb3VyY2VSb290IjoiIn0=