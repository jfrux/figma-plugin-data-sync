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
    console.log("foundItems:", foundItems);
    var matchingInstance = node.children.filter(function (item) {
      return item.type !== type;
    });
    console.log("matchingInstance", matchingInstance);

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
        console.log("childName", child.name);
        console.log("childType", child.type);
        console.log("------");
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
  'image-blob-response': function imageBlobResponse(msg) {
    var node = figma.getNodeById(msg.data.id);
    var newImage = figma.createImage(msg.data.imageBuffer);
    console.log(node.id);
    console.log(node.name);
    console.log(newImage);
    var fills = clone(node.fills);
    fills.forEach(function (fill) {
      if (fill.type === 'IMAGE') {
        fill.imageHash = newImage.hash;
      }
    });
    node.fills = fills;
  },
  'new-feed': function newFeed(msg) {
    console.log("rawData:", msg.rawData);
    console.log("keys:", msg.keys);
    var type = msg.type,
        keys = msg.keys,
        rawData = msg.rawData,
        data = msg.data,
        dataType = msg.dataType;
    var currentPage = figma.currentPage;
    console.log("currentPage:", currentPage);
    var currentSelection = currentPage.selection;

    if (!currentSelection) {
      currentSelection = [currentPage];
    }

    console.log("currentSelection", currentSelection);
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
            console.log(record);
            console.log(indexKey);
            var recordValue = record[indexKey];
            console.log("recordValue", recordValue);

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
    } // keys.forEach((key) => {
    //   deepFindByNameAndType(selection, key, 'TEXT', foundItems);
    // });


    console.log("keyIndex", keyIndex);
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
    }); // if (foundItems.length) {
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


  setTimeout(function () {
    figma.closePlugin();
  }, 5000);
};

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvdHlwZW9mLmpzIiwid2VicGFjazovLy8uL3NyYy9jb2RlLmpzIl0sIm5hbWVzIjpbImZpZ21hIiwic2hvd1VJIiwiX19odG1sX18iLCJjbG9uZSIsInZhbCIsInR5cGUiLCJBcnJheSIsIm1hcCIsIngiLCJVaW50OEFycmF5IiwibyIsImtleSIsImRlZXBGaW5kQnlOYW1lQW5kVHlwZSIsIm5vZGUiLCJuYW1lIiwiZm91bmRJdGVtcyIsImNoaWxkcmVuIiwiZm9yRWFjaCIsIml0ZW0iLCJwdXNoIiwiY29uc29sZSIsImxvZyIsIm1hdGNoaW5nSW5zdGFuY2UiLCJmaWx0ZXIiLCJsZW5ndGgiLCJmZXRjaEltYWdlQmxvYiIsImRhdGEiLCJ1aSIsInBvc3RNZXNzYWdlIiwiaW5kZXhLZXlzRnJvbVNlbGVjdGlvbiIsImtleUluZGV4IiwiY2hpbGQiLCJpbmRleE9mIiwicmVwbGFjZSIsImhhc093blByb3BlcnR5IiwiaWQiLCJoYW5kbGVycyIsIm1zZyIsImdldE5vZGVCeUlkIiwibmV3SW1hZ2UiLCJjcmVhdGVJbWFnZSIsImltYWdlQnVmZmVyIiwiZmlsbHMiLCJmaWxsIiwiaW1hZ2VIYXNoIiwiaGFzaCIsInJhd0RhdGEiLCJrZXlzIiwiZGF0YVR5cGUiLCJjdXJyZW50UGFnZSIsImN1cnJlbnRTZWxlY3Rpb24iLCJzZWxlY3Rpb24iLCJpbmRleEtleXMiLCJPYmplY3QiLCJyZWNvcmQiLCJpbmRleCIsInJlY29yZEtleXMiLCJpbmRleEtleSIsInJlY29yZFZhbHVlIiwic3RhcnRzV2l0aCIsImVuZHNXaXRoIiwiZmlsbFR5cGUiLCJ2YWx1ZSIsImtleUFycmF5Iiwia2V5QXJyYXlJdGVtIiwibG9hZEZvbnRBc3luYyIsImZvbnROYW1lIiwidGhlbiIsImNoYXJhY3RlcnMiLCJvbm1lc3NhZ2UiLCJzZXRUaW1l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TTJDLFFBQWxCO0FBQ0QsYUFIRDtBQUlELFdBTEQsTUFLTyxJQUFJTyxZQUFZLENBQUNILFFBQWIsS0FBMEIsT0FBOUIsRUFBdUM7QUFDNUM7QUFDQXpDLG1CQUFPLENBQUNDLEdBQVIsQ0FBWSx3QkFBWjtBQUNBSSwwQkFBYyxDQUFDdEIsS0FBSyxDQUFDNkQsWUFBRCxDQUFOLENBQWQ7QUFDRDs7QUFBQTtBQUNGLFNBYkQ7QUFjRDtBQUNGLEtBbkJELEVBeERtQixDQTRFbkI7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFLQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDRCxHQTVIYyxDQThIakI7QUFDQTtBQUNBOztBQWhJaUIsQ0FBakI7O0FBaUlBaEUsS0FBSyxDQUFDMkIsRUFBTixDQUFTMEMsU0FBVCxHQUFxQixVQUFBaEMsR0FBRyxFQUFJO0FBQ3hCO0FBQ0E7QUFDQSxNQUFJQSxHQUFHLENBQUNoQyxJQUFSLEVBQWM7QUFDWitCLFlBQVEsQ0FBQ0MsR0FBRyxDQUFDaEMsSUFBTCxDQUFSLENBQW1CZ0MsR0FBbkI7QUFDRCxHQUx1QixDQU14QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBaUMsWUFBVSxDQUFDLFlBQU07QUFDZnRFLFNBQUssQ0FBQ3VFLFdBQU47QUFDRCxHQUZTLEVBRVIsSUFGUSxDQUFWO0FBSUgsQ0F0QkQsQyIsImZpbGUiOiJjb2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvY29kZS5qc1wiKTtcbiIsImZ1bmN0aW9uIF90eXBlb2YyKG9iaikgeyBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHsgX3R5cGVvZjIgPSBmdW5jdGlvbiBfdHlwZW9mMihvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH07IH0gZWxzZSB7IF90eXBlb2YyID0gZnVuY3Rpb24gX3R5cGVvZjIob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mMihvYmopOyB9XG5cbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gIGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgX3R5cGVvZjIoU3ltYm9sLml0ZXJhdG9yKSA9PT0gXCJzeW1ib2xcIikge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICByZXR1cm4gX3R5cGVvZjIob2JqKTtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIG1vZHVsZS5leHBvcnRzID0gX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gICAgICByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogX3R5cGVvZjIob2JqKTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIF90eXBlb2Yob2JqKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mOyIsIi8vIFRoaXMgcGx1Z2luIHdpbGwgb3BlbiBhIG1vZGFsIHRvIHByb21wdCB0aGUgdXNlciB0byBlbnRlciBhIG51bWJlciwgYW5kXG4vLyBpdCB3aWxsIHRoZW4gY3JlYXRlIHRoYXQgbWFueSByZWN0YW5nbGVzIG9uIHRoZSBzY3JlZW4uXG4vLyBUaGlzIGZpbGUgaG9sZHMgdGhlIG1haW4gY29kZSBmb3IgdGhlIHBsdWdpbnMuIEl0IGhhcyBhY2Nlc3MgdG8gdGhlICpkb2N1bWVudCouXG4vLyBZb3UgY2FuIGFjY2VzcyBicm93c2VyIEFQSXMgaW4gdGhlIDxzY3JpcHQ+IHRhZyBpbnNpZGUgXCJ1aS5odG1sXCIgd2hpY2ggaGFzIGFcbi8vIGZ1bGwgYnJvd3NlciBlbnZpcm9tZW50IChzZWUgZG9jdW1lbnRhdGlvbikuXG4vLyBUaGlzIHNob3dzIHRoZSBIVE1MIHBhZ2UgaW4gXCJ1aS5odG1sXCIuXG5maWdtYS5zaG93VUkoX19odG1sX18pO1xuZnVuY3Rpb24gY2xvbmUodmFsKSB7XG4gIGNvbnN0IHR5cGUgPSB0eXBlb2YgdmFsXG4gIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9IGVsc2UgaWYgKHR5cGUgPT09ICd1bmRlZmluZWQnIHx8IHR5cGUgPT09ICdudW1iZXInIHx8XG4gICAgICAgICAgICAgdHlwZSA9PT0gJ3N0cmluZycgfHwgdHlwZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgcmV0dXJuIHZhbFxuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgaWYgKHZhbCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICByZXR1cm4gdmFsLm1hcCh4ID0+IGNsb25lKHgpKVxuICAgIH0gZWxzZSBpZiAodmFsIGluc3RhbmNlb2YgVWludDhBcnJheSkge1xuICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KHZhbClcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IG8gPSB7fVxuICAgICAgZm9yIChjb25zdCBrZXkgaW4gdmFsKSB7XG4gICAgICAgIG9ba2V5XSA9IGNsb25lKHZhbFtrZXldKVxuICAgICAgfVxuICAgICAgcmV0dXJuIG9cbiAgICB9XG4gIH1cbiAgdGhyb3cgJ3Vua25vd24nXG59XG5jb25zdCBkZWVwRmluZEJ5TmFtZUFuZFR5cGUgPSBmdW5jdGlvbihub2RlLCBuYW1lLCB0eXBlLCBmb3VuZEl0ZW1zKSB7XG4gIC8vIGNvbnNvbGUubG9nKFwiU2VhcmNoaW5nIG5vZGUgXCIsbm9kZSk7XG4gIGlmIChub2RlLmNoaWxkcmVuKSB7XG4gICAgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpZiAoaXRlbS5uYW1lID09PSBuYW1lICYmIGl0ZW0udHlwZSA9PT0gdHlwZSkge1xuICAgICAgICBmb3VuZEl0ZW1zLnB1c2goaXRlbSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uc29sZS5sb2coXCJmb3VuZEl0ZW1zOlwiLGZvdW5kSXRlbXMpO1xuICAgIFxuICAgIGNvbnN0IG1hdGNoaW5nSW5zdGFuY2UgPSBub2RlLmNoaWxkcmVuLmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgcmV0dXJuIGl0ZW0udHlwZSAhPT0gdHlwZTtcbiAgICB9KTtcbiAgICBjb25zb2xlLmxvZyhcIm1hdGNoaW5nSW5zdGFuY2VcIixtYXRjaGluZ0luc3RhbmNlKTtcbiAgICBpZiAobWF0Y2hpbmdJbnN0YW5jZS5sZW5ndGgpIHtcbiAgICAgIG1hdGNoaW5nSW5zdGFuY2UuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBkZWVwRmluZEJ5TmFtZUFuZFR5cGUoaXRlbSwgbmFtZSwgdHlwZSwgZm91bmRJdGVtcyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZmV0Y2hJbWFnZUJsb2IoZGF0YSkge1xuICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHtcbiAgICAgIHR5cGU6ICdmZXRjaC1pbWFnZScsXG4gICAgICBkYXRhXG4gICAgfSk7XG59XG5cbmNvbnN0IGluZGV4S2V5c0Zyb21TZWxlY3Rpb24gPSAobm9kZSwga2V5SW5kZXgpID0+IHtcbiAgaWYgKG5vZGUuY2hpbGRyZW4pIHtcbiAgICBub2RlLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICBcbiAgICAgIGlmIChjaGlsZC5uYW1lLmluZGV4T2YoJyMnKSA+PSAwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiY2hpbGROYW1lXCIsY2hpbGQubmFtZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiY2hpbGRUeXBlXCIsY2hpbGQudHlwZSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tXCIpO1xuICAgICAgICBjb25zdCBuYW1lID0gY2hpbGQubmFtZS5yZXBsYWNlKCcjJywnJyk7XG4gICAgICAgIGlmICgha2V5SW5kZXguaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgICBrZXlJbmRleFtuYW1lXSA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGtleUluZGV4W25hbWVdLnB1c2goe1xuICAgICAgICAgIGlkOiBjaGlsZC5pZCxcbiAgICAgICAgICB0eXBlOiBjaGlsZC50eXBlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgbWF0Y2hpbmdJbnN0YW5jZSA9IG5vZGUuY2hpbGRyZW4uZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICByZXR1cm4gaXRlbS5uYW1lLmluZGV4T2YoJyMnKSA9PSAtMTtcbiAgICB9KTtcblxuICAgIGlmIChtYXRjaGluZ0luc3RhbmNlLmxlbmd0aCkge1xuICAgICAgbWF0Y2hpbmdJbnN0YW5jZS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGluZGV4S2V5c0Zyb21TZWxlY3Rpb24oaXRlbSwga2V5SW5kZXgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5jb25zdCBoYW5kbGVycyA9IHtcbiAgJ2ltYWdlLWJsb2ItcmVzcG9uc2UnOiAobXNnKSA9PiB7XG4gICAgY29uc3Qgbm9kZSA9IGZpZ21hLmdldE5vZGVCeUlkKG1zZy5kYXRhLmlkKTtcbiAgICBjb25zdCBuZXdJbWFnZSA9IGZpZ21hLmNyZWF0ZUltYWdlKG1zZy5kYXRhLmltYWdlQnVmZmVyKTtcbiAgICBjb25zb2xlLmxvZyhub2RlLmlkKTtcbiAgICBjb25zb2xlLmxvZyhub2RlLm5hbWUpO1xuICAgIGNvbnNvbGUubG9nKG5ld0ltYWdlKTtcbiAgICBjb25zdCBmaWxscyA9IGNsb25lKG5vZGUuZmlsbHMpO1xuICAgIGZpbGxzLmZvckVhY2goKGZpbGwpID0+IHtcbiAgICAgIGlmIChmaWxsLnR5cGUgPT09ICdJTUFHRScpIHtcbiAgICAgICAgZmlsbC5pbWFnZUhhc2ggPSBuZXdJbWFnZS5oYXNoO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgbm9kZS5maWxscyA9IGZpbGxzO1xuICB9LFxuICAnbmV3LWZlZWQnOiAobXNnKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJyYXdEYXRhOlwiLG1zZy5yYXdEYXRhKTtcbiAgICBjb25zb2xlLmxvZyhcImtleXM6XCIsbXNnLmtleXMpO1xuICAgIGNvbnN0IHsgdHlwZSwga2V5cywgcmF3RGF0YSwgZGF0YSwgZGF0YVR5cGUgfSA9IG1zZztcbiAgICBsZXQgY3VycmVudFBhZ2UgPSBmaWdtYS5jdXJyZW50UGFnZTtcbiAgICBjb25zb2xlLmxvZyhcImN1cnJlbnRQYWdlOlwiLGN1cnJlbnRQYWdlKTtcbiAgICBsZXQgY3VycmVudFNlbGVjdGlvbiA9IGN1cnJlbnRQYWdlLnNlbGVjdGlvbjtcbiAgICBpZiAoIWN1cnJlbnRTZWxlY3Rpb24pIHtcbiAgICAgIGN1cnJlbnRTZWxlY3Rpb24gPSBbY3VycmVudFBhZ2VdXG4gICAgfVxuICAgIGNvbnNvbGUubG9nKFwiY3VycmVudFNlbGVjdGlvblwiLGN1cnJlbnRTZWxlY3Rpb24pO1xuXG4gICAgbGV0IGtleUluZGV4ID0ge307XG4gICAgbGV0IGluZGV4S2V5cztcbiAgICBjdXJyZW50U2VsZWN0aW9uLmZvckVhY2goKHNlbGVjdGlvbikgPT4ge1xuICAgICAgaW5kZXhLZXlzRnJvbVNlbGVjdGlvbihzZWxlY3Rpb24sa2V5SW5kZXgpO1xuICAgIH0pO1xuICAgIFxuICAgIGluZGV4S2V5cyA9IE9iamVjdC5rZXlzKGtleUluZGV4KTtcbiAgICBpZiAoaW5kZXhLZXlzLmxlbmd0aCkge1xuICAgICAgZGF0YS5mb3JFYWNoKChyZWNvcmQsaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgcmVjb3JkS2V5cyA9IE9iamVjdC5rZXlzKHJlY29yZCk7XG4gICAgICAgIGluZGV4S2V5cy5mb3JFYWNoKChpbmRleEtleSkgPT4ge1xuICAgICAgICAgIGlmIChrZXlJbmRleFtpbmRleEtleV1baW5kZXhdKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZWNvcmQpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coaW5kZXhLZXkpO1xuICAgICAgICAgICAgY29uc3QgcmVjb3JkVmFsdWUgPSByZWNvcmRbaW5kZXhLZXldO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZWNvcmRWYWx1ZVwiLHJlY29yZFZhbHVlKTtcbiAgICAgICAgICAgIGlmICghcmVjb3JkVmFsdWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICByZWNvcmRWYWx1ZS5zdGFydHNXaXRoKFwiaHR0cFwiKSB8fFxuICAgICAgICAgICAgICAgIHJlY29yZFZhbHVlLnN0YXJ0c1dpdGgoXCJodHRwc1wiKVxuICAgICAgICAgICAgICAgICkgJiYgXG4gICAgICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgICAgcmVjb3JkVmFsdWUuZW5kc1dpdGgoXCIuZ2lmXCIpIHx8IFxuICAgICAgICAgICAgICAgICAgcmVjb3JkVmFsdWUuZW5kc1dpdGgoXCIuanBnXCIpIHx8IFxuICAgICAgICAgICAgICAgICAgcmVjb3JkVmFsdWUuZW5kc1dpdGgoXCIucG5nXCIpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGtleUluZGV4W2luZGV4S2V5XVtpbmRleF0uZmlsbFR5cGUgPSBcImltYWdlXCI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBrZXlJbmRleFtpbmRleEtleV1baW5kZXhdLmZpbGxUeXBlID0gXCJ0ZXh0XCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGtleUluZGV4W2luZGV4S2V5XVtpbmRleF0udmFsdWUgPSByZWNvcmRWYWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICAgIC8vIGtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgLy8gICBkZWVwRmluZEJ5TmFtZUFuZFR5cGUoc2VsZWN0aW9uLCBrZXksICdURVhUJywgZm91bmRJdGVtcyk7XG4gICAgLy8gfSk7XG4gICAgY29uc29sZS5sb2coXCJrZXlJbmRleFwiLGtleUluZGV4KTtcbiAgICBpbmRleEtleXMuZm9yRWFjaCgoaW5kZXhLZXkpID0+IHtcbiAgICAgIGNvbnN0IGtleUFycmF5ID0ga2V5SW5kZXhbaW5kZXhLZXldO1xuXG4gICAgICBpZiAoa2V5QXJyYXkubGVuZ3RoKSB7XG4gICAgICAgIGtleUFycmF5LmZvckVhY2goKGtleUFycmF5SXRlbSkgPT4ge1xuICAgICAgICAgIGNvbnN0IG5vZGUgPSBmaWdtYS5nZXROb2RlQnlJZChrZXlBcnJheUl0ZW0uaWQpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJvY2Vzc2luZyBub2RlOlwiLCBub2RlLCBub2RlLmlkLCBub2RlLm5hbWUpO1xuICAgICAgICAgIGlmIChrZXlBcnJheUl0ZW0uZmlsbFR5cGUgPT09ICd0ZXh0Jykge1xuICAgICAgICAgICAgZmlnbWEubG9hZEZvbnRBc3luYyhub2RlLmZvbnROYW1lKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgbm9kZS5jaGFyYWN0ZXJzID0ga2V5QXJyYXlJdGVtLnZhbHVlO1xuICAgICAgICAgICAgICBub2RlLm5hbWUgPSBcIiNcIiArIGluZGV4S2V5O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChrZXlBcnJheUl0ZW0uZmlsbFR5cGUgPT09ICdpbWFnZScpIHtcbiAgICAgICAgICAgIC8vIGxldCBibG9iID0gYXdhaXQgZmV0Y2godXJsKS50aGVuKHIgPT4gci5ibG9iKCkpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJGZXRjaCBJbWFnZSBSZXF1ZXN0Li4uXCIpO1xuICAgICAgICAgICAgZmV0Y2hJbWFnZUJsb2IoY2xvbmUoa2V5QXJyYXlJdGVtKSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgLy8gaWYgKGZvdW5kSXRlbXMubGVuZ3RoKSB7XG4gICAgXG4gICAgLy8gfVxuICAgIC8vIGRhdGEuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIC8vICAgT2JqZWN0LmtleXMoaXRlbSkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgLy8gICAgICAgLy8gY29uc3QgZmlnbWFFbGVtZW50ID0gZmlnbWEuZ2V0Tm9kZUJ5SWQoXCIjXCIgKyBrZXkudHJpbSgpKTtcbiAgICAgICAgICBcbiAgICAvLyAgIH0pO1xuICAgIC8vIH0pO1xuICAgIFxuXG4gICAgXG4gICAgXG4gICAgLy8gdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAvLyByZXF1ZXN0Lm9wZW4oJ0dFVCcsIG1zZy5qc29uX3VybCwgdHJ1ZSk7XG5cbiAgICAvLyByZXF1ZXN0Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgIC8vICAgaWYgKHRoaXMuc3RhdHVzID49IDIwMCAmJiB0aGlzLnN0YXR1cyA8IDQwMCkge1xuICAgIC8vICAgICAvLyBTdWNjZXNzIVxuICAgIC8vICAgICB2YXIgZGF0YSA9IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZSk7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIC8vICAgfSBlbHNlIHtcbiAgICAvLyAgICAgLy8gV2UgcmVhY2hlZCBvdXIgdGFyZ2V0IHNlcnZlciwgYnV0IGl0IHJldHVybmVkIGFuIGVycm9yXG5cbiAgICAvLyAgIH1cbiAgICAvLyB9O1xuXG4gICAgLy8gcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gICAvLyBUaGVyZSB3YXMgYSBjb25uZWN0aW9uIGVycm9yIG9mIHNvbWUgc29ydFxuICAgIC8vIH07XG5cbiAgICAvLyByZXF1ZXN0LnNlbmQoKTtcbiAgfVxufVxuLy8gQ2FsbHMgdG8gXCJwYXJlbnQucG9zdE1lc3NhZ2VcIiBmcm9tIHdpdGhpbiB0aGUgSFRNTCBwYWdlIHdpbGwgdHJpZ2dlciB0aGlzXG4vLyBjYWxsYmFjay4gVGhlIGNhbGxiYWNrIHdpbGwgYmUgcGFzc2VkIHRoZSBcInBsdWdpbk1lc3NhZ2VcIiBwcm9wZXJ0eSBvZiB0aGVcbi8vIHBvc3RlZCBtZXNzYWdlLlxuZmlnbWEudWkub25tZXNzYWdlID0gbXNnID0+IHtcbiAgICAvLyBPbmUgd2F5IG9mIGRpc3Rpbmd1aXNoaW5nIGJldHdlZW4gZGlmZmVyZW50IHR5cGVzIG9mIG1lc3NhZ2VzIHNlbnQgZnJvbVxuICAgIC8vIHlvdXIgSFRNTCBwYWdlIGlzIHRvIHVzZSBhbiBvYmplY3Qgd2l0aCBhIFwidHlwZVwiIHByb3BlcnR5IGxpa2UgdGhpcy5cbiAgICBpZiAobXNnLnR5cGUpIHtcbiAgICAgIGhhbmRsZXJzW21zZy50eXBlXShtc2cpO1xuICAgIH1cbiAgICAvLyBjb25zdCBub2RlcyA9IFtdO1xuICAgIC8vIGZvciAobGV0IGkgPSAwOyBpIDwgOyBpKyspIHtcbiAgICAvLyAgICAgY29uc3QgcmVjdCA9IGZpZ21hLmNyZWF0ZVJlY3RhbmdsZSgpO1xuICAgIC8vICAgICByZWN0LnggPSBpICogMTUwO1xuICAgIC8vICAgICByZWN0LmZpbGxzID0gW3sgdHlwZTogJ1NPTElEJywgY29sb3I6IHsgcjogMSwgZzogMC41LCBiOiAwIH0gfV07XG4gICAgLy8gICAgIGZpZ21hLmN1cnJlbnRQYWdlLmFwcGVuZENoaWxkKHJlY3QpO1xuICAgIC8vICAgICBub2Rlcy5wdXNoKHJlY3QpO1xuICAgIC8vIH1cbiAgICAvLyBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb24gPSBub2RlcztcbiAgICAvLyBmaWdtYS52aWV3cG9ydC5zY3JvbGxBbmRab29tSW50b1ZpZXcobm9kZXMpO1xuICAgIC8vIE1ha2Ugc3VyZSB0byBjbG9zZSB0aGUgcGx1Z2luIHdoZW4geW91J3JlIGRvbmUuIE90aGVyd2lzZSB0aGUgcGx1Z2luIHdpbGxcbiAgICAvLyBrZWVwIHJ1bm5pbmcsIHdoaWNoIHNob3dzIHRoZSBjYW5jZWwgYnV0dG9uIGF0IHRoZSBib3R0b20gb2YgdGhlIHNjcmVlbi5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGZpZ21hLmNsb3NlUGx1Z2luKCk7XG4gICAgfSw1MDAwKTtcbiAgICBcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9