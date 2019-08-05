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

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),

/***/ "./src/code.js":
/*!*********************!*\
  !*** ./src/code.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);

// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.
// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser enviroment (see documentation).
// This shows the HTML page in "ui.html".
figma.showUI(__html__);

function clone(val) {
  var type = _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(val);

  if (val === null) {
    return null;
  } else if (type === 'undefined' || type === 'number' || type === 'string' || type === 'boolean') {
    return val;
  } else if (type === 'object') {
    if (val instanceof Array) {
      return val.map(function (x) {
        return clone(x);
      });
    } else if (val instanceof Uint8Array) {
      return new Uint8Array(val);
    } else {
      var o = {};

      for (var key in val) {
        o[key] = clone(val[key]);
      }

      return o;
    }
  }

  throw 'unknown';
}

var deepFindByNameAndType = function deepFindByNameAndType(node, name, type, foundItems) {
  // console.log("Searching node ",node);
  if (node.children) {
    node.children.forEach(function (item) {
      if (item.name === name && item.type === type) {
        foundItems.push(item);
      }
    });
    var matchingInstance = node.children.filter(function (item) {
      return item.type !== type;
    });

    if (matchingInstance.length) {
      matchingInstance.forEach(function (item) {
        deepFindByNameAndType(item, name, type, foundItems);
      });
    }
  }
};

function fetchImageBlob(data) {
  figma.ui.postMessage({
    type: 'fetch-image',
    data: data
  });
}

var indexKeysFromSelection = function indexKeysFromSelection(node, keyIndex) {
  if (node.children) {
    node.children.forEach(function (child) {
      if (child.name.indexOf('#') >= 0) {
        var name = child.name.replace('#', '');

        if (!keyIndex.hasOwnProperty(name)) {
          keyIndex[name] = [];
        }

        keyIndex[name].push({
          id: child.id,
          type: child.type
        });
      }
    });
    var matchingInstance = node.children.filter(function (item) {
      return item.name.indexOf('#') == -1;
    });

    if (matchingInstance.length) {
      matchingInstance.forEach(function (item) {
        indexKeysFromSelection(item, keyIndex);
      });
    }
  }
};

var handlers = {
  'cancel': function cancel(msg) {
    figma.closePlugin();
  },
  'get-client-variable': function getClientVariable(msg) {
    var key = msg.data;
    console.log("Requesting client variable:", key);
    figma.clientStorage.getAsync(key).then(function (value) {
      figma.ui.postMessage({
        type: 'receive-client-variable',
        data: {
          key: key,
          value: value
        }
      });
    });
  },
  'image-blob-response': function imageBlobResponse(msg) {
    var node = figma.getNodeById(msg.data.id);
    var newImage = figma.createImage(msg.data.imageBuffer);
    var fills = clone(node.fills);
    fills.forEach(function (fill) {
      if (fill.type === 'IMAGE') {
        fill.imageHash = newImage.hash;
      }
    });
    node.fills = fills;
  },
  'new-feed': function newFeed(msg) {
    var type = msg.type,
        keys = msg.keys,
        rawData = msg.rawData,
        data = msg.data,
        dataType = msg.dataType,
        json_url = msg.json_url;
    var currentPage = figma.currentPage;
    var currentSelection = currentPage.selection;
    console.log("data:", data);

    if (!data) {
      figma.ui.postMessage({
        type: 'new-feed-error',
        data: "No data was found in the response..."
      });
    }

    if (!currentSelection) {
      currentSelection = [currentPage];
    }

    figma.clientStorage.setAsync('last-used-url', json_url);
    var keyIndex = {};
    var indexKeys;
    currentSelection.forEach(function (selection) {
      indexKeysFromSelection(selection, keyIndex);
    });
    indexKeys = Object.keys(keyIndex);

    if (indexKeys.length) {
      data.forEach(function (record, index) {
        var recordKeys = Object.keys(record);
        indexKeys.forEach(function (indexKey) {
          if (keyIndex[indexKey][index]) {
            var recordValue = record[indexKey];

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

    indexKeys.forEach(function (indexKey) {
      var keyArray = keyIndex[indexKey];

      if (keyArray.length) {
        keyArray.forEach(function (keyArrayItem) {
          var node = figma.getNodeById(keyArrayItem.id);
          console.log("Processing node:", node, node.id, node.name);

          if (keyArrayItem.fillType === 'text') {
            figma.loadFontAsync(node.fontName).then(function () {
              node.characters = keyArrayItem.value;
              node.name = "#" + indexKey;
            });
          } else if (keyArrayItem.fillType === 'image') {
            // let blob = await fetch(url).then(r => r.blob());
            console.log("Fetch Image Request...");
            fetchImageBlob(clone(keyArrayItem));
          }

          ;
        });
      }
    });
    setTimeout(function () {
      figma.closePlugin();
    }, 5000);
  } // Calls to "parent.postMessage" from within the HTML page will trigger this
  // callback. The callback will be passed the "pluginMessage" property of the
  // posted message.

};

figma.ui.onmessage = function (msg) {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (msg.type) {
    handlers[msg.type](msg);
  } // const nodes = [];
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

};

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvdHlwZW9mLmpzIiwid2VicGFjazovLy8uL3NyYy9jb2RlLmpzIl0sIm5hbWVzIjpbImZpZ21hIiwic2hvd1VJIiwiX19odG1sX18iLCJjbG9uZSIsInZhbCIsInR5cGUiLCJBcnJheSIsIm1hcCIsIngiLCJVaW50OEFycmF5IiwibyIsImtleSIsImRlZXBGaW5kQnlOYW1lQW5kVHlwZSIsIm5vZGUiLCJuYW1lIiwiZm91bmRJdGVtcyIsImNoaWxkcmVuIiwiZm9yRWFjaCIsIml0ZW0iLCJwdXNoIiwibWF0Y2hpbmdJbnN0YW5jZSIsImZpbHRlciIsImxlbmd0aCIsImZldGNoSW1hZ2VCbG9iIiwiZGF0YSIsInVpIiwicG9zdE1lc3NhZ2UiLCJpbmRleEtleXNGcm9tU2VsZWN0aW9uIiwia2V5SW5kZXgiLCJjaGlsZCIsImluZGV4T2YiLCJyZXBsYWNlIiwiaGFzT3duUHJvcGVydHkiLCJpZCIsImhhbmRsZXJzIiwibXNnIiwiY2xvc2VQbHVnaW4iLCJjb25zb2xlIiwibG9nIiwiY2xpZW50U3RvcmFnZSIsImdldEFzeW5jIiwidGhlbiIsInZhbHVlIiwiZ2V0Tm9kZUJ5SWQiLCJuZXdJbWFnZSIsImNyZWF0ZUltYWdlIiwiaW1hZ2VCdWZmZXIiLCJmaWxscyIsImZpbGwiLCJpbWFnZUhhc2giLCJoYXNoIiwia2V5cyIsInJhd0RhdGEiLCJkYXRhVHlwZSIsImpzb25fdXJsIiwiY3VycmVudFBhZ2UiLCJjdXJyZW50U2VsZWN0aW9uIiwic2VsZWN0aW9uIiwic2V0QXN5bmMiLCJpbmRleEtleXMiLCJPYmplY3QiLCJyZWNvcmQiLCJpbmRleCIsInJlY29yZEtleXMiLCJpbmRleEtleSIsInJlY29yZFZhbHVlIiwic3RhcnRzV2l0aCIsImVuZHNXaXRoIiwiZmlsbFR5cGUiLCJrZXlBcnJheSIsImtleUFycmF5SXRlbSIsImxvYWRGb250QXN5bmMiLCJmb250TmFtZSIsImNoYXJhY3RlcnMiLCJzZXRUaW1lb3V0Iiwib25tZXNzYWdlIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkEsd0JBQXdCLDJFQUEyRSxvQ0FBb0MsbUJBQW1CLEdBQUcsRUFBRSxPQUFPLG9DQUFvQyw4SEFBOEgsR0FBRyxFQUFFLHNCQUFzQjs7QUFFblc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHlCOzs7Ozs7Ozs7Ozs7Ozs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBQSxLQUFLLENBQUNDLE1BQU4sQ0FBYUMsUUFBYjs7QUFFQSxTQUFTQyxLQUFULENBQWVDLEdBQWYsRUFBb0I7QUFDbEIsTUFBTUMsSUFBSSxHQUFHLHFFQUFPRCxHQUFWLENBQVY7O0FBQ0EsTUFBSUEsR0FBRyxLQUFL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QUFDRCxhQUhEO0FBSUQsV0FMRCxNQUtPLElBQUlNLFlBQVksQ0FBQ0YsUUFBYixLQUEwQixPQUE5QixFQUF1QztBQUM1QztBQUNBL0IsbUJBQU8sQ0FBQ0MsR0FBUixDQUFZLHdCQUFaO0FBQ0FmLDBCQUFjLENBQUNwQixLQUFLLENBQUNtRSxZQUFELENBQU4sQ0FBZDtBQUNEOztBQUFBO0FBQ0YsU0FiRDtBQWNEO0FBQ0YsS0FuQkQ7QUFxQkFJLGNBQVUsQ0FBQyxZQUFNO0FBQ2YxRSxXQUFLLENBQUNvQyxXQUFOO0FBQ0QsS0FGUyxFQUVSLElBRlEsQ0FBVjtBQUdELEdBOUdjLENBaUhqQjtBQUNBO0FBQ0E7O0FBbkhpQixDQUFqQjs7QUFvSEFwQyxLQUFLLENBQUN5QixFQUFOLENBQVNrRCxTQUFULEdBQXFCLFVBQUF4QyxHQUFHLEVBQUk7QUFDeEI7QUFDQTtBQUNBLE1BQUlBLEdBQUcsQ0FBQzlCLElBQVIsRUFBYztBQUNaNkIsWUFBUSxDQUFDQyxHQUFHLENBQUM5QixJQUFMLENBQVIsQ0FBbUI4QixHQUFuQjtBQUNELEdBTHVCLENBTXhCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFSCxDQW5CRCxDIiwiZmlsZSI6ImNvZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9jb2RlLmpzXCIpO1xuIiwiZnVuY3Rpb24gX3R5cGVvZjIob2JqKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mMiA9IGZ1bmN0aW9uIF90eXBlb2YyKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZjIgPSBmdW5jdGlvbiBfdHlwZW9mMihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2YyKG9iaik7IH1cblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBfdHlwZW9mMihTeW1ib2wuaXRlcmF0b3IpID09PSBcInN5bWJvbFwiKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgIHJldHVybiBfdHlwZW9mMihvYmopO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiBfdHlwZW9mMihvYmopO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gX3R5cGVvZihvYmopO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF90eXBlb2Y7IiwiLy8gVGhpcyBwbHVnaW4gd2lsbCBvcGVuIGEgbW9kYWwgdG8gcHJvbXB0IHRoZSB1c2VyIHRvIGVudGVyIGEgbnVtYmVyLCBhbmRcbi8vIGl0IHdpbGwgdGhlbiBjcmVhdGUgdGhhdCBtYW55IHJlY3RhbmdsZXMgb24gdGhlIHNjcmVlbi5cbi8vIFRoaXMgZmlsZSBob2xkcyB0aGUgbWFpbiBjb2RlIGZvciB0aGUgcGx1Z2lucy4gSXQgaGFzIGFjY2VzcyB0byB0aGUgKmRvY3VtZW50Ki5cbi8vIFlvdSBjYW4gYWNjZXNzIGJyb3dzZXIgQVBJcyBpbiB0aGUgPHNjcmlwdD4gdGFnIGluc2lkZSBcInVpLmh0bWxcIiB3aGljaCBoYXMgYVxuLy8gZnVsbCBicm93c2VyIGVudmlyb21lbnQgKHNlZSBkb2N1bWVudGF0aW9uKS5cbi8vIFRoaXMgc2hvd3MgdGhlIEhUTUwgcGFnZSBpbiBcInVpLmh0bWxcIi5cbmZpZ21hLnNob3dVSShfX2h0bWxfXyk7XG5cbmZ1bmN0aW9uIGNsb25lKHZhbCkge1xuICBjb25zdCB0eXBlID0gdHlwZW9mIHZhbFxuICBpZiAodmFsID09PSBudWxsKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfSBlbHNlIGlmICh0eXBlID09PSAndW5kZWZpbmVkJyB8fCB0eXBlID09PSAnbnVtYmVyJyB8fFxuICAgICAgICAgICAgIHR5cGUgPT09ICdzdHJpbmcnIHx8IHR5cGUgPT09ICdib29sZWFuJykge1xuICAgIHJldHVybiB2YWxcbiAgfSBlbHNlIGlmICh0eXBlID09PSAnb2JqZWN0Jykge1xuICAgIGlmICh2YWwgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgcmV0dXJuIHZhbC5tYXAoeCA9PiBjbG9uZSh4KSlcbiAgICB9IGVsc2UgaWYgKHZhbCBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpIHtcbiAgICAgIHJldHVybiBuZXcgVWludDhBcnJheSh2YWwpXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBvID0ge31cbiAgICAgIGZvciAoY29uc3Qga2V5IGluIHZhbCkge1xuICAgICAgICBvW2tleV0gPSBjbG9uZSh2YWxba2V5XSlcbiAgICAgIH1cbiAgICAgIHJldHVybiBvXG4gICAgfVxuICB9XG4gIHRocm93ICd1bmtub3duJ1xufVxuXG5jb25zdCBkZWVwRmluZEJ5TmFtZUFuZFR5cGUgPSBmdW5jdGlvbihub2RlLCBuYW1lLCB0eXBlLCBmb3VuZEl0ZW1zKSB7XG4gIC8vIGNvbnNvbGUubG9nKFwiU2VhcmNoaW5nIG5vZGUgXCIsbm9kZSk7XG4gIGlmIChub2RlLmNoaWxkcmVuKSB7XG4gICAgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpZiAoaXRlbS5uYW1lID09PSBuYW1lICYmIGl0ZW0udHlwZSA9PT0gdHlwZSkge1xuICAgICAgICBmb3VuZEl0ZW1zLnB1c2goaXRlbSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgY29uc3QgbWF0Y2hpbmdJbnN0YW5jZSA9IG5vZGUuY2hpbGRyZW4uZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICByZXR1cm4gaXRlbS50eXBlICE9PSB0eXBlO1xuICAgIH0pO1xuXG4gICAgaWYgKG1hdGNoaW5nSW5zdGFuY2UubGVuZ3RoKSB7XG4gICAgICBtYXRjaGluZ0luc3RhbmNlLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgZGVlcEZpbmRCeU5hbWVBbmRUeXBlKGl0ZW0sIG5hbWUsIHR5cGUsIGZvdW5kSXRlbXMpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGZldGNoSW1hZ2VCbG9iKGRhdGEpIHtcbiAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7XG4gICAgICB0eXBlOiAnZmV0Y2gtaW1hZ2UnLFxuICAgICAgZGF0YVxuICAgIH0pO1xufVxuXG5jb25zdCBpbmRleEtleXNGcm9tU2VsZWN0aW9uID0gKG5vZGUsIGtleUluZGV4KSA9PiB7XG4gIGlmIChub2RlLmNoaWxkcmVuKSB7XG4gICAgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgXG4gICAgICBpZiAoY2hpbGQubmFtZS5pbmRleE9mKCcjJykgPj0gMCkge1xuICAgICAgICBjb25zdCBuYW1lID0gY2hpbGQubmFtZS5yZXBsYWNlKCcjJywnJyk7XG4gICAgICAgIGlmICgha2V5SW5kZXguaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgICBrZXlJbmRleFtuYW1lXSA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGtleUluZGV4W25hbWVdLnB1c2goe1xuICAgICAgICAgIGlkOiBjaGlsZC5pZCxcbiAgICAgICAgICB0eXBlOiBjaGlsZC50eXBlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgbWF0Y2hpbmdJbnN0YW5jZSA9IG5vZGUuY2hpbGRyZW4uZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICByZXR1cm4gaXRlbS5uYW1lLmluZGV4T2YoJyMnKSA9PSAtMTtcbiAgICB9KTtcblxuICAgIGlmIChtYXRjaGluZ0luc3RhbmNlLmxlbmd0aCkge1xuICAgICAgbWF0Y2hpbmdJbnN0YW5jZS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGluZGV4S2V5c0Zyb21TZWxlY3Rpb24oaXRlbSwga2V5SW5kZXgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cbmNvbnN0IGhhbmRsZXJzID0ge1xuICAnY2FuY2VsJzogKG1zZykgPT4ge1xuICAgIGZpZ21hLmNsb3NlUGx1Z2luKCk7XG4gIH0sXG4gICdnZXQtY2xpZW50LXZhcmlhYmxlJzogKG1zZykgPT4ge1xuICAgIGNvbnN0IGtleSA9IG1zZy5kYXRhO1xuICAgIGNvbnNvbGUubG9nKFwiUmVxdWVzdGluZyBjbGllbnQgdmFyaWFibGU6XCIsa2V5KTtcbiAgICBmaWdtYS5jbGllbnRTdG9yYWdlLmdldEFzeW5jKGtleSkudGhlbigodmFsdWUpID0+IHtcbiAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgdHlwZTogJ3JlY2VpdmUtY2xpZW50LXZhcmlhYmxlJyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGtleSxcbiAgICAgICAgICB2YWx1ZVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbiAgJ2ltYWdlLWJsb2ItcmVzcG9uc2UnOiAobXNnKSA9PiB7XG4gICAgY29uc3Qgbm9kZSA9IGZpZ21hLmdldE5vZGVCeUlkKG1zZy5kYXRhLmlkKTtcbiAgICBjb25zdCBuZXdJbWFnZSA9IGZpZ21hLmNyZWF0ZUltYWdlKG1zZy5kYXRhLmltYWdlQnVmZmVyKTtcbiAgICBjb25zdCBmaWxscyA9IGNsb25lKG5vZGUuZmlsbHMpO1xuXG4gICAgZmlsbHMuZm9yRWFjaCgoZmlsbCkgPT4ge1xuICAgICAgaWYgKGZpbGwudHlwZSA9PT0gJ0lNQUdFJykge1xuICAgICAgICBmaWxsLmltYWdlSGFzaCA9IG5ld0ltYWdlLmhhc2g7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBub2RlLmZpbGxzID0gZmlsbHM7XG4gIH0sXG5cbiAgJ25ldy1mZWVkJzogKG1zZykgPT4ge1xuICAgIGNvbnN0IHsgdHlwZSwga2V5cywgcmF3RGF0YSwgZGF0YSwgZGF0YVR5cGUsIGpzb25fdXJsIH0gPSBtc2c7XG4gICAgbGV0IGN1cnJlbnRQYWdlID0gZmlnbWEuY3VycmVudFBhZ2U7XG4gICAgbGV0IGN1cnJlbnRTZWxlY3Rpb24gPSBjdXJyZW50UGFnZS5zZWxlY3Rpb247XG5cbiAgICBjb25zb2xlLmxvZyhcImRhdGE6XCIsZGF0YSk7XG4gICAgaWYgKCFkYXRhKSB7XG4gICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7XG4gICAgICAgIHR5cGU6ICduZXctZmVlZC1lcnJvcicsXG4gICAgICAgIGRhdGE6IFwiTm8gZGF0YSB3YXMgZm91bmQgaW4gdGhlIHJlc3BvbnNlLi4uXCJcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoIWN1cnJlbnRTZWxlY3Rpb24pIHtcbiAgICAgIGN1cnJlbnRTZWxlY3Rpb24gPSBbY3VycmVudFBhZ2VdXG4gICAgfVxuXG4gICAgZmlnbWEuY2xpZW50U3RvcmFnZS5zZXRBc3luYygnbGFzdC11c2VkLXVybCcsanNvbl91cmwpO1xuXG4gICAgbGV0IGtleUluZGV4ID0ge307XG4gICAgbGV0IGluZGV4S2V5cztcbiAgICBjdXJyZW50U2VsZWN0aW9uLmZvckVhY2goKHNlbGVjdGlvbikgPT4ge1xuICAgICAgaW5kZXhLZXlzRnJvbVNlbGVjdGlvbihzZWxlY3Rpb24sa2V5SW5kZXgpO1xuICAgIH0pO1xuICAgIFxuICAgIGluZGV4S2V5cyA9IE9iamVjdC5rZXlzKGtleUluZGV4KTtcbiAgICBpZiAoaW5kZXhLZXlzLmxlbmd0aCkge1xuICAgICAgZGF0YS5mb3JFYWNoKChyZWNvcmQsaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgcmVjb3JkS2V5cyA9IE9iamVjdC5rZXlzKHJlY29yZCk7XG4gICAgICAgIGluZGV4S2V5cy5mb3JFYWNoKChpbmRleEtleSkgPT4ge1xuICAgICAgICAgIGlmIChrZXlJbmRleFtpbmRleEtleV1baW5kZXhdKSB7XG4gICAgICAgICAgICBjb25zdCByZWNvcmRWYWx1ZSA9IHJlY29yZFtpbmRleEtleV07XG4gICAgICAgICAgICBpZiAoIXJlY29yZFZhbHVlKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgcmVjb3JkVmFsdWUuc3RhcnRzV2l0aChcImh0dHBcIikgfHxcbiAgICAgICAgICAgICAgICByZWNvcmRWYWx1ZS5zdGFydHNXaXRoKFwiaHR0cHNcIilcbiAgICAgICAgICAgICAgICApICYmIFxuICAgICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICAgIHJlY29yZFZhbHVlLmVuZHNXaXRoKFwiLmdpZlwiKSB8fCBcbiAgICAgICAgICAgICAgICAgIHJlY29yZFZhbHVlLmVuZHNXaXRoKFwiLmpwZ1wiKSB8fCBcbiAgICAgICAgICAgICAgICAgIHJlY29yZFZhbHVlLmVuZHNXaXRoKFwiLnBuZ1wiKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBrZXlJbmRleFtpbmRleEtleV1baW5kZXhdLmZpbGxUeXBlID0gXCJpbWFnZVwiO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAga2V5SW5kZXhbaW5kZXhLZXldW2luZGV4XS5maWxsVHlwZSA9IFwidGV4dFwiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBrZXlJbmRleFtpbmRleEtleV1baW5kZXhdLnZhbHVlID0gcmVjb3JkVmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpbmRleEtleXMuZm9yRWFjaCgoaW5kZXhLZXkpID0+IHtcbiAgICAgIGNvbnN0IGtleUFycmF5ID0ga2V5SW5kZXhbaW5kZXhLZXldO1xuXG4gICAgICBpZiAoa2V5QXJyYXkubGVuZ3RoKSB7XG4gICAgICAgIGtleUFycmF5LmZvckVhY2goKGtleUFycmF5SXRlbSkgPT4ge1xuICAgICAgICAgIGNvbnN0IG5vZGUgPSBmaWdtYS5nZXROb2RlQnlJZChrZXlBcnJheUl0ZW0uaWQpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJvY2Vzc2luZyBub2RlOlwiLCBub2RlLCBub2RlLmlkLCBub2RlLm5hbWUpO1xuICAgICAgICAgIGlmIChrZXlBcnJheUl0ZW0uZmlsbFR5cGUgPT09ICd0ZXh0Jykge1xuICAgICAgICAgICAgZmlnbWEubG9hZEZvbnRBc3luYyhub2RlLmZvbnROYW1lKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgbm9kZS5jaGFyYWN0ZXJzID0ga2V5QXJyYXlJdGVtLnZhbHVlO1xuICAgICAgICAgICAgICBub2RlLm5hbWUgPSBcIiNcIiArIGluZGV4S2V5O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChrZXlBcnJheUl0ZW0uZmlsbFR5cGUgPT09ICdpbWFnZScpIHtcbiAgICAgICAgICAgIC8vIGxldCBibG9iID0gYXdhaXQgZmV0Y2godXJsKS50aGVuKHIgPT4gci5ibG9iKCkpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJGZXRjaCBJbWFnZSBSZXF1ZXN0Li4uXCIpO1xuICAgICAgICAgICAgZmV0Y2hJbWFnZUJsb2IoY2xvbmUoa2V5QXJyYXlJdGVtKSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBmaWdtYS5jbG9zZVBsdWdpbigpO1xuICAgIH0sNTAwMCk7XG4gIH1cbn1cblxuLy8gQ2FsbHMgdG8gXCJwYXJlbnQucG9zdE1lc3NhZ2VcIiBmcm9tIHdpdGhpbiB0aGUgSFRNTCBwYWdlIHdpbGwgdHJpZ2dlciB0aGlzXG4vLyBjYWxsYmFjay4gVGhlIGNhbGxiYWNrIHdpbGwgYmUgcGFzc2VkIHRoZSBcInBsdWdpbk1lc3NhZ2VcIiBwcm9wZXJ0eSBvZiB0aGVcbi8vIHBvc3RlZCBtZXNzYWdlLlxuZmlnbWEudWkub25tZXNzYWdlID0gbXNnID0+IHtcbiAgICAvLyBPbmUgd2F5IG9mIGRpc3Rpbmd1aXNoaW5nIGJldHdlZW4gZGlmZmVyZW50IHR5cGVzIG9mIG1lc3NhZ2VzIHNlbnQgZnJvbVxuICAgIC8vIHlvdXIgSFRNTCBwYWdlIGlzIHRvIHVzZSBhbiBvYmplY3Qgd2l0aCBhIFwidHlwZVwiIHByb3BlcnR5IGxpa2UgdGhpcy5cbiAgICBpZiAobXNnLnR5cGUpIHtcbiAgICAgIGhhbmRsZXJzW21zZy50eXBlXShtc2cpO1xuICAgIH1cbiAgICAvLyBjb25zdCBub2RlcyA9IFtdO1xuICAgIC8vIGZvciAobGV0IGkgPSAwOyBpIDwgOyBpKyspIHtcbiAgICAvLyAgICAgY29uc3QgcmVjdCA9IGZpZ21hLmNyZWF0ZVJlY3RhbmdsZSgpO1xuICAgIC8vICAgICByZWN0LnggPSBpICogMTUwO1xuICAgIC8vICAgICByZWN0LmZpbGxzID0gW3sgdHlwZTogJ1NPTElEJywgY29sb3I6IHsgcjogMSwgZzogMC41LCBiOiAwIH0gfV07XG4gICAgLy8gICAgIGZpZ21hLmN1cnJlbnRQYWdlLmFwcGVuZENoaWxkKHJlY3QpO1xuICAgIC8vICAgICBub2Rlcy5wdXNoKHJlY3QpO1xuICAgIC8vIH1cbiAgICAvLyBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24gPSBub2RlcztcbiAgICAvLyBmaWdtYS52aWV3cG9ydC5zY3JvbGxBbmRab29tSW50b1ZpZXcobm9kZXMpO1xuICAgIC8vIE1ha2Ugc3VyZSB0byBjbG9zZSB0aGUgcGx1Z2luIHdoZW4geW91J3JlIGRvbmUuIE90aGVyd2lzZSB0aGUgcGx1Z2luIHdpbGxcbiAgICAvLyBrZWVwIHJ1bm5pbmcsIHdoaWNoIHNob3dzIHRoZSBjYW5jZWwgYnV0dG9uIGF0IHRoZSBib3R0b20gb2YgdGhlIHNjcmVlbi5cbiAgICBcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9