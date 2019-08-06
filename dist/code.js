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

figma.showUI(__html__, {
  width: 600,
  height: 400
});

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
  sendMessage('fetch-image', data);
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

var clientVariables = [['lastUsedUrl', ''], ['json_url', ''], ['lastUsedText', ''], ['csv_text', ''], ['csv_header', false], ['json_text', ''], ['activeTab', 'json']];
var handlers = {
  'cancel': function cancel(msg) {
    figma.closePlugin();
  },
  'set-client-variables': function setClientVariables(payload) {
    var keys = Object.keys(payload);
    keys.forEach(function (key) {
      var value = payload[key];
      figma.clientStorage.setAsync(key, value);
    });
  },
  'get-client-variables': function getClientVariables() {
    console.log("Requesting client variables");
    Promise.all(clientVariables.map(function (variable) {
      var key = variable[0];
      var defaultValue = variable[1];
      return figma.clientStorage.getAsync(key).then(function (value) {
        if (!value) {
          value = variable[1];
        }

        return {
          key: key,
          value: value
        };
      });
    })).then(function (results) {
      var resultObj = {};
      console.log("Sending client variables to UI", results);
      results.forEach(function (result) {
        resultObj[result.key] = result.value;
      });
      sendMessage('receive-client-variables', resultObj);
    });
  },
  'image-blob-response': function imageBlobResponse(payload) {
    var node = figma.getNodeById(payload.id);
    var newImage = figma.createImage(payload.imageBuffer);
    var fills = clone(node.fills);
    fills.forEach(function (fill) {
      if (fill.type === 'IMAGE') {
        fill.imageHash = newImage.hash;
      }
    });
    node.fills = fills;
  },
  'sync': function sync(payload) {
    var type = payload.type,
        keys = payload.keys,
        rawData = payload.rawData,
        data = payload.data,
        dataType = payload.dataType,
        json_url = payload.json_url;
    var currentPage = figma.currentPage;
    var currentSelection = currentPage.selection;

    if (!data) {
      sendMessage('sync-error', 'No data was found in the response...');
    }

    if (!currentSelection) {
      currentSelection = [currentPage];
    }

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
  }
};

var receiveMessage = function receiveMessage(event) {
  var type = event.type,
      payload = event.payload;

  if (!type) {
    return;
  }

  console.log("[app] Receive message", type, payload);

  if (type) {
    handlers[type](payload);
  }
};

var sendMessage = function sendMessage(type) {
  var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  console.log("[app] Send message", type, payload);
  figma.ui.postMessage({
    type: type,
    payload: payload
  });
};

figma.ui.onmessage = receiveMessage;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvdHlwZW9mLmpzIiwid2VicGFjazovLy8uL3NyYy9jb2RlLmpzIl0sIm5hbWVzIjpbImZpZ21hIiwic2hvd1VJIiwiX19odG1sX18iLCJ3aWR0aCIsImhlaWdodCIsImNsb25lIiwidmFsIiwidHlwZSIsIkFycmF5IiwibWFwIiwieCIsIlVpbnQ4QXJyYXkiLCJvIiwia2V5IiwiZGVlcEZpbmRCeU5hbWVBbmRUeXBlIiwibm9kZSIsIm5hbWUiLCJmb3VuZEl0ZW1zIiwiY2hpbGRyZW4iLCJmb3JFYWNoIiwiaXRlbSIsInB1c2giLCJtYXRjaGluZ0luc3RhbmNlIiwiZmlsdGVyIiwibGVuZ3RoIiwiZmV0Y2hJbWFnZUJsb2IiLCJkYXRhIiwic2VuZE1lc3NhZ2UiLCJpbmRleEtleXNGcm9tU2VsZWN0aW9uIiwia2V5SW5kZXgiLCJjaGlsZCIsImluZGV4T2YiLCJyZXBsYWNlIiwiaGFzT3duUHJvcGVydHkiLCJpZCIsImNsaWVudFZhcmlhYmxlcyIsImhhbmRsZXJzIiwibXNnIiwiY2xvc2VQbHVnaW4iLCJwYXlsb2FkIiwia2V5cyIsIk9iamVjdCIsInZhbHVlIiwiY2xpZW50U3RvcmFnZSIsInNldEFzeW5jIiwiY29uc29sZSIsImxvZyIsIlByb21pc2UiLCJhbGwiLCJ2YXJpYWJsZSIsImRlZmF1bHRWYWx1ZSIsImdldEFzeW5jIiwidGhlbiIsInJlc3VsdHMiLCJyZXN1bHRPYmoiLCJyZXN1bHQiLCJnZXROb2RlQnlJZCIsIm5ld0ltYWdlIiwiY3JlYXRlSW1hZ2UiLCJpbWFnZUJ1ZmZlciIsImZpbGxzIiwiZmlsbCIsImltYWdlSGFzaCIsImhhc2giLCJyYXdEYXRhIiwiZGF0YVR5cGUiLCJqc29uX3VybCIsImN1cnJlbnRQYWdlIiwiY3VycmVudFNlbGVjdGlvbiIsInNlbGVjdGlvbiIsImluZGV4S2V5cyIsInJlY29yZCIsImluZGV4IiwicmVjb3JkS2V5cyIsImluZGV4S2V5IiwicmVjb3JkVmFsdWUiLCJzdGFydHNXaXRoIiwiZW5kc1dpdGgiLCJmaWxsVHlwZSIsImtleUFycmF5Iiwia2V5QXJyYXlJdGVtIiwibG9hZEZvbnRBc3luYyIsImZvbnROYW1lIiwiY2hhcmFjdGVycyIsInNldFRpbWVvdXQiLCJyZWNlaXZlTWVzc2FnZSIsImV2ZW50IiwidWkiLCJwb3N0TWVzc2FnZSIsIm9ubWVzc2FnZSJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLHdCQUF3QiwyRUFBMkUsb0NBQW9DLG1CQUFtQixHQUFHLEVBQUUsT0FBTyxvQ0FBb0MsOEhBQThILEdBQUcsRUFBRSxzQkFBc0I7O0FBRW5XO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSx5Qjs7Ozs7Ozs7Ozs7Ozs7OztB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dGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9jb2RlLmpzXCIpO1xuIiwiZnVuY3Rpb24gX3R5cGVvZjIob2JqKSB7IGlmICh0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIikgeyBfdHlwZW9mMiA9IGZ1bmN0aW9uIF90eXBlb2YyKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZjIgPSBmdW5jdGlvbiBfdHlwZW9mMihvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07IH0gcmV0dXJuIF90eXBlb2YyKG9iaik7IH1cblxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBfdHlwZW9mMihTeW1ib2wuaXRlcmF0b3IpID09PSBcInN5bWJvbFwiKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgIHJldHVybiBfdHlwZW9mMihvYmopO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfdHlwZW9mID0gZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiBfdHlwZW9mMihvYmopO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gX3R5cGVvZihvYmopO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF90eXBlb2Y7IiwiZmlnbWEuc2hvd1VJKF9faHRtbF9fLCB7XG4gIHdpZHRoOiA2MDAsXG4gIGhlaWdodDogNDAwXG59KTtcblxuZnVuY3Rpb24gY2xvbmUodmFsKSB7XG4gIGNvbnN0IHR5cGUgPSB0eXBlb2YgdmFsXG4gIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9IGVsc2UgaWYgKHR5cGUgPT09ICd1bmRlZmluZWQnIHx8IHR5cGUgPT09ICdudW1iZXInIHx8XG4gICAgICAgICAgICAgdHlwZSA9PT0gJ3N0cmluZycgfHwgdHlwZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgcmV0dXJuIHZhbFxuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgaWYgKHZhbCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICByZXR1cm4gdmFsLm1hcCh4ID0+IGNsb25lKHgpKVxuICAgIH0gZWxzZSBpZiAodmFsIGluc3RhbmNlb2YgVWludDhBcnJheSkge1xuICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KHZhbClcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IG8gPSB7fVxuICAgICAgZm9yIChjb25zdCBrZXkgaW4gdmFsKSB7XG4gICAgICAgIG9ba2V5XSA9IGNsb25lKHZhbFtrZXldKVxuICAgICAgfVxuICAgICAgcmV0dXJuIG9cbiAgICB9XG4gIH1cbiAgdGhyb3cgJ3Vua25vd24nXG59XG5cbmNvbnN0IGRlZXBGaW5kQnlOYW1lQW5kVHlwZSA9IGZ1bmN0aW9uKG5vZGUsIG5hbWUsIHR5cGUsIGZvdW5kSXRlbXMpIHtcbiAgLy8gY29uc29sZS5sb2coXCJTZWFyY2hpbmcgbm9kZSBcIixub2RlKTtcbiAgaWYgKG5vZGUuY2hpbGRyZW4pIHtcbiAgICBub2RlLmNoaWxkcmVuLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGlmIChpdGVtLm5hbWUgPT09IG5hbWUgJiYgaXRlbS50eXBlID09PSB0eXBlKSB7XG4gICAgICAgIGZvdW5kSXRlbXMucHVzaChpdGVtKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICBjb25zdCBtYXRjaGluZ0luc3RhbmNlID0gbm9kZS5jaGlsZHJlbi5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgIHJldHVybiBpdGVtLnR5cGUgIT09IHR5cGU7XG4gICAgfSk7XG5cbiAgICBpZiAobWF0Y2hpbmdJbnN0YW5jZS5sZW5ndGgpIHtcbiAgICAgIG1hdGNoaW5nSW5zdGFuY2UuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBkZWVwRmluZEJ5TmFtZUFuZFR5cGUoaXRlbSwgbmFtZSwgdHlwZSwgZm91bmRJdGVtcyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZmV0Y2hJbWFnZUJsb2IoZGF0YSkge1xuICAgIHNlbmRNZXNzYWdlKCdmZXRjaC1pbWFnZScsIGRhdGEpO1xufVxuXG5jb25zdCBpbmRleEtleXNGcm9tU2VsZWN0aW9uID0gKG5vZGUsIGtleUluZGV4KSA9PiB7XG4gIGlmIChub2RlLmNoaWxkcmVuKSB7XG4gICAgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgXG4gICAgICBpZiAoY2hpbGQubmFtZS5pbmRleE9mKCcjJykgPj0gMCkge1xuICAgICAgICBjb25zdCBuYW1lID0gY2hpbGQubmFtZS5yZXBsYWNlKCcjJywnJyk7XG4gICAgICAgIGlmICgha2V5SW5kZXguaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgICBrZXlJbmRleFtuYW1lXSA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGtleUluZGV4W25hbWVdLnB1c2goe1xuICAgICAgICAgIGlkOiBjaGlsZC5pZCxcbiAgICAgICAgICB0eXBlOiBjaGlsZC50eXBlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgbWF0Y2hpbmdJbnN0YW5jZSA9IG5vZGUuY2hpbGRyZW4uZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICByZXR1cm4gaXRlbS5uYW1lLmluZGV4T2YoJyMnKSA9PSAtMTtcbiAgICB9KTtcblxuICAgIGlmIChtYXRjaGluZ0luc3RhbmNlLmxlbmd0aCkge1xuICAgICAgbWF0Y2hpbmdJbnN0YW5jZS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGluZGV4S2V5c0Zyb21TZWxlY3Rpb24oaXRlbSwga2V5SW5kZXgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5jb25zdCBjbGllbnRWYXJpYWJsZXMgPSBbXG4gIFsnbGFzdFVzZWRVcmwnLCcnXSxcbiAgWydqc29uX3VybCcsJyddLFxuICBbJ2xhc3RVc2VkVGV4dCcsJyddLFxuICBbJ2Nzdl90ZXh0JywnJ10sXG4gIFsnY3N2X2hlYWRlcicsZmFsc2VdLFxuICBbJ2pzb25fdGV4dCcsJyddLFxuICBbJ2FjdGl2ZVRhYicsJ2pzb24nXVxuXTtcblxuXG5cbmNvbnN0IGhhbmRsZXJzID0ge1xuICAnY2FuY2VsJzogKG1zZykgPT4ge1xuICAgIGZpZ21hLmNsb3NlUGx1Z2luKCk7XG4gIH0sXG4gICdzZXQtY2xpZW50LXZhcmlhYmxlcyc6IChwYXlsb2FkKSA9PiB7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHBheWxvYWQpO1xuICAgIGtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBsZXQgdmFsdWUgPSBwYXlsb2FkW2tleV07XG4gICAgICBmaWdtYS5jbGllbnRTdG9yYWdlLnNldEFzeW5jKGtleSx2YWx1ZSk7XG4gICAgfSk7XG4gIH0sXG4gICdnZXQtY2xpZW50LXZhcmlhYmxlcyc6ICgpID0+IHtcbiAgICBjb25zb2xlLmxvZyhcIlJlcXVlc3RpbmcgY2xpZW50IHZhcmlhYmxlc1wiKTtcbiAgICBQcm9taXNlLmFsbChjbGllbnRWYXJpYWJsZXMubWFwKCh2YXJpYWJsZSkgPT4ge1xuICAgICAgbGV0IGtleSA9IHZhcmlhYmxlWzBdO1xuICAgICAgbGV0IGRlZmF1bHRWYWx1ZSA9IHZhcmlhYmxlWzFdO1xuICAgICAgcmV0dXJuIGZpZ21hLmNsaWVudFN0b3JhZ2UuZ2V0QXN5bmMoa2V5KS50aGVuKCh2YWx1ZSkgPT4ge1xuICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgdmFsdWUgPSB2YXJpYWJsZVsxXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBrZXksIHZhbHVlIH07XG4gICAgICB9KTtcbiAgICB9KSkudGhlbigocmVzdWx0cykgPT4ge1xuICAgICAgbGV0IHJlc3VsdE9iaiA9IHt9O1xuICAgICAgY29uc29sZS5sb2coXCJTZW5kaW5nIGNsaWVudCB2YXJpYWJsZXMgdG8gVUlcIixyZXN1bHRzKTtcbiAgICAgIHJlc3VsdHMuZm9yRWFjaCgocmVzdWx0KSA9PiB7XG4gICAgICAgIHJlc3VsdE9ialtyZXN1bHQua2V5XSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgIH0pO1xuICAgICAgc2VuZE1lc3NhZ2UoJ3JlY2VpdmUtY2xpZW50LXZhcmlhYmxlcycscmVzdWx0T2JqKTtcbiAgICB9KTtcbiAgfSxcbiAgJ2ltYWdlLWJsb2ItcmVzcG9uc2UnOiAocGF5bG9hZCkgPT4ge1xuICAgIGNvbnN0IG5vZGUgPSBmaWdtYS5nZXROb2RlQnlJZChwYXlsb2FkLmlkKTtcbiAgICBjb25zdCBuZXdJbWFnZSA9IGZpZ21hLmNyZWF0ZUltYWdlKHBheWxvYWQuaW1hZ2VCdWZmZXIpO1xuICAgIGNvbnN0IGZpbGxzID0gY2xvbmUobm9kZS5maWxscyk7XG5cbiAgICBmaWxscy5mb3JFYWNoKChmaWxsKSA9PiB7XG4gICAgICBpZiAoZmlsbC50eXBlID09PSAnSU1BR0UnKSB7XG4gICAgICAgIGZpbGwuaW1hZ2VIYXNoID0gbmV3SW1hZ2UuaGFzaDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIG5vZGUuZmlsbHMgPSBmaWxscztcbiAgfSxcblxuICAnc3luYyc6IChwYXlsb2FkKSA9PiB7XG4gICAgY29uc3QgeyB0eXBlLCBrZXlzLCByYXdEYXRhLCBkYXRhLCBkYXRhVHlwZSwganNvbl91cmwgfSA9IHBheWxvYWQ7XG4gICAgbGV0IGN1cnJlbnRQYWdlID0gZmlnbWEuY3VycmVudFBhZ2U7XG4gICAgbGV0IGN1cnJlbnRTZWxlY3Rpb24gPSBjdXJyZW50UGFnZS5zZWxlY3Rpb247XG5cbiAgICBpZiAoIWRhdGEpIHtcbiAgICAgIHNlbmRNZXNzYWdlKCdzeW5jLWVycm9yJywnTm8gZGF0YSB3YXMgZm91bmQgaW4gdGhlIHJlc3BvbnNlLi4uJyk7XG4gICAgfVxuICAgIGlmICghY3VycmVudFNlbGVjdGlvbikge1xuICAgICAgY3VycmVudFNlbGVjdGlvbiA9IFtjdXJyZW50UGFnZV1cbiAgICB9XG5cblxuICAgIGxldCBrZXlJbmRleCA9IHt9O1xuICAgIGxldCBpbmRleEtleXM7XG4gICAgY3VycmVudFNlbGVjdGlvbi5mb3JFYWNoKChzZWxlY3Rpb24pID0+IHtcbiAgICAgIGluZGV4S2V5c0Zyb21TZWxlY3Rpb24oc2VsZWN0aW9uLGtleUluZGV4KTtcbiAgICB9KTtcbiAgICBcbiAgICBpbmRleEtleXMgPSBPYmplY3Qua2V5cyhrZXlJbmRleCk7XG4gICAgaWYgKGluZGV4S2V5cy5sZW5ndGgpIHtcbiAgICAgIGRhdGEuZm9yRWFjaCgocmVjb3JkLGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IHJlY29yZEtleXMgPSBPYmplY3Qua2V5cyhyZWNvcmQpO1xuICAgICAgICBpbmRleEtleXMuZm9yRWFjaCgoaW5kZXhLZXkpID0+IHtcbiAgICAgICAgICBpZiAoa2V5SW5kZXhbaW5kZXhLZXldW2luZGV4XSkge1xuICAgICAgICAgICAgY29uc3QgcmVjb3JkVmFsdWUgPSByZWNvcmRbaW5kZXhLZXldO1xuICAgICAgICAgICAgaWYgKCFyZWNvcmRWYWx1ZSkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgIHJlY29yZFZhbHVlLnN0YXJ0c1dpdGgoXCJodHRwXCIpIHx8XG4gICAgICAgICAgICAgICAgcmVjb3JkVmFsdWUuc3RhcnRzV2l0aChcImh0dHBzXCIpXG4gICAgICAgICAgICAgICAgKSAmJiBcbiAgICAgICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgICByZWNvcmRWYWx1ZS5lbmRzV2l0aChcIi5naWZcIikgfHwgXG4gICAgICAgICAgICAgICAgICByZWNvcmRWYWx1ZS5lbmRzV2l0aChcIi5qcGdcIikgfHwgXG4gICAgICAgICAgICAgICAgICByZWNvcmRWYWx1ZS5lbmRzV2l0aChcIi5wbmdcIilcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAga2V5SW5kZXhbaW5kZXhLZXldW2luZGV4XS5maWxsVHlwZSA9IFwiaW1hZ2VcIjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGtleUluZGV4W2luZGV4S2V5XVtpbmRleF0uZmlsbFR5cGUgPSBcInRleHRcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAga2V5SW5kZXhbaW5kZXhLZXldW2luZGV4XS52YWx1ZSA9IHJlY29yZFZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpbmRleEtleXMuZm9yRWFjaCgoaW5kZXhLZXkpID0+IHtcbiAgICAgIGNvbnN0IGtleUFycmF5ID0ga2V5SW5kZXhbaW5kZXhLZXldO1xuXG4gICAgICBpZiAoa2V5QXJyYXkubGVuZ3RoKSB7XG4gICAgICAgIGtleUFycmF5LmZvckVhY2goKGtleUFycmF5SXRlbSkgPT4ge1xuICAgICAgICAgIGNvbnN0IG5vZGUgPSBmaWdtYS5nZXROb2RlQnlJZChrZXlBcnJheUl0ZW0uaWQpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJvY2Vzc2luZyBub2RlOlwiLCBub2RlLCBub2RlLmlkLCBub2RlLm5hbWUpO1xuICAgICAgICAgIGlmIChrZXlBcnJheUl0ZW0uZmlsbFR5cGUgPT09ICd0ZXh0Jykge1xuICAgICAgICAgICAgZmlnbWEubG9hZEZvbnRBc3luYyhub2RlLmZvbnROYW1lKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgbm9kZS5jaGFyYWN0ZXJzID0ga2V5QXJyYXlJdGVtLnZhbHVlO1xuICAgICAgICAgICAgICBub2RlLm5hbWUgPSBcIiNcIiArIGluZGV4S2V5O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChrZXlBcnJheUl0ZW0uZmlsbFR5cGUgPT09ICdpbWFnZScpIHtcbiAgICAgICAgICAgIC8vIGxldCBibG9iID0gYXdhaXQgZmV0Y2godXJsKS50aGVuKHIgPT4gci5ibG9iKCkpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJGZXRjaCBJbWFnZSBSZXF1ZXN0Li4uXCIpO1xuICAgICAgICAgICAgZmV0Y2hJbWFnZUJsb2IoY2xvbmUoa2V5QXJyYXlJdGVtKSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBmaWdtYS5jbG9zZVBsdWdpbigpO1xuICAgIH0sNTAwMCk7XG4gIH1cbn1cblxuY29uc3QgcmVjZWl2ZU1lc3NhZ2UgPSAoZXZlbnQpID0+IHtcbiAgY29uc3QgeyB0eXBlLCBwYXlsb2FkIH0gPSBldmVudDtcbiAgaWYgKCF0eXBlKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnNvbGUubG9nKGBbYXBwXSBSZWNlaXZlIG1lc3NhZ2VgLCB0eXBlLCBwYXlsb2FkKTtcbiAgaWYgKHR5cGUpIHtcbiAgICBoYW5kbGVyc1t0eXBlXShwYXlsb2FkKTtcbiAgfVxufVxuXG5jb25zdCBzZW5kTWVzc2FnZSA9ICh0eXBlLHBheWxvYWQgPSBudWxsKSA9PiB7XG4gIGNvbnNvbGUubG9nKGBbYXBwXSBTZW5kIG1lc3NhZ2VgLCB0eXBlLCBwYXlsb2FkKTtcbiAgZmlnbWEudWkucG9zdE1lc3NhZ2Uoe1xuICAgIHR5cGUsXG4gICAgcGF5bG9hZFxuICB9KTtcbn1cblxuZmlnbWEudWkub25tZXNzYWdlID0gcmVjZWl2ZU1lc3NhZ2U7XG4iXSwic291cmNlUm9vdCI6IiJ9