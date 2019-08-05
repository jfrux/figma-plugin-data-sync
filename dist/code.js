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
/*! no static exports found */
/***/ (function(module, exports) {

// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.
// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser enviroment (see documentation).
// This shows the HTML page in "ui.html".
figma.showUI(__html__);

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

var fetchImageBlob = function fetchImageBlob(data) {
  figma.ui.postMessage({
    type: 'fetch-image',
    data: data
  });
};

var indexKeysFromSelection = function indexKeysFromSelection(node, keyIndex) {
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
};

var handlers = {
  'image-blob-response': function imageBlobResponse(msg) {
    console.log("Response received from msg blob", msg.data);
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

          if (keyArrayItem.fillType === 'text') {
            figma.loadFontAsync(node.fontName).then(function () {
              node.characters = keyArrayItem.value;
              node.name = "#" + indexKey;
            });
          } else if (keyArrayItem.fillType === 'image') {
            // let blob = await fetch(url).then(r => r.blob());
            console.log("Fetch Image Request...");
            fetchImageBlob(keyArrayItem);
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


  figma.closePlugin();
};

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvZGUuanMiXSwibmFtZXMiOlsiZmlnbWEiLCJzaG93VUkiLCJfX2h0bWxfXyIsImRlZXBGaW5kQnlOYW1lQW5kVHlwZSIsIm5vZGUiLCJuYW1lIiwidHlwZSIsImZvdW5kSXRlbXMiLCJjaGlsZHJlbiIsImZvckVhY2giLCJpdGVtIiwicHVzaCIsImNvbnNvbGUiLCJsb2ciLCJtYXRjaGluZ0luc3RhbmNlIiwiZmlsdGVyIiwibGVuZ3RoIiwiZmV0Y2hJbWFnZUJsb2IiLCJkYXRhIiwidWkiLCJwb3N0TWVzc2FnZSIsImluZGV4S2V5c0Zyb21TZWxlY3Rpb24iLCJrZXlJbmRleCIsImNoaWxkIiwiaW5kZXhPZiIsInJlcGxhY2UiLCJoYXNPd25Qcm9wZXJ0eSIsImlkIiwiaGFuZGxlcnMiLCJtc2ciLCJyYXdEYXRhIiwia2V5cyIsImRhdGFUeXBlIiwiY3VycmVudFBhZ2UiLCJjdXJyZW50U2VsZWN0aW9uIiwic2VsZWN0aW9uIiwiaW5kZXhLZXlzIiwiT2JqZWN0IiwicmVjb3JkIiwiaW5kZXgiLCJyZWNvcmRLZXlzIiwiaW5kZXhLZXkiLCJyZWNvcmRWYWx1ZSIsInN0YXJ0c1dpdGgiLCJlbmRzV2l0aCIsImZpbGxUeXBlIiwidmFsdWUiLCJrZXlBcnJheSIsImtleUFycmF5SXRlbSIsImdldE5vZGVCeUlkIiwibG9hZEZvbnRBc3luYyIsImZvbnROYW1lIiwidGhlbiIsImNoYXJhY3RlcnMiLCJvbm1lc3NhZ2UiLCJjbG9zZVBsdWdpbiJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztR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QUFDaUQsVUFBTCxHQUFrQkwsWUFBWSxDQUFDRixLQUEvQjtBQUNBMUMsa0JBQUksQ0FBQ0MsSUFBTCxHQUFZLE1BQU1vQyxRQUFsQjtBQUNELGFBSEQ7QUFJRCxXQUxELE1BS08sSUFBSU8sWUFBWSxDQUFDSCxRQUFiLEtBQTBCLE9BQTlCLEVBQXVDO0FBQzVDO0FBQ0FqQyxtQkFBTyxDQUFDQyxHQUFSLENBQVksd0JBQVo7QUFDQUksMEJBQWMsQ0FBQytCLFlBQUQsQ0FBZDtBQUNEOztBQUFBO0FBQ0YsU0FiRDtBQWNEO0FBQ0YsS0FuQkQsRUF2RG1CLENBMkVuQjtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUtBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNELEdBL0djLENBaUhqQjtBQUNBO0FBQ0E7O0FBbkhpQixDQUFqQjs7QUFvSEFoRCxLQUFLLENBQUNtQixFQUFOLENBQVNtQyxTQUFULEdBQXFCLFVBQUF6QixHQUFHLEVBQUk7QUFFeEI7QUFDQTtBQUNBLE1BQUlBLEdBQUcsQ0FBQ3ZCLElBQVIsRUFBYztBQUNac0IsWUFBUSxDQUFDQyxHQUFHLENBQUN2QixJQUFMLENBQVIsQ0FBbUJ1QixHQUFuQjtBQUNELEdBTnVCLENBT3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E3QixPQUFLLENBQUN1RCxXQUFOO0FBQ0gsQ0FwQkQsQyIsImZpbGUiOiJjb2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvY29kZS5qc1wiKTtcbiIsIi8vIFRoaXMgcGx1Z2luIHdpbGwgb3BlbiBhIG1vZGFsIHRvIHByb21wdCB0aGUgdXNlciB0byBlbnRlciBhIG51bWJlciwgYW5kXG4vLyBpdCB3aWxsIHRoZW4gY3JlYXRlIHRoYXQgbWFueSByZWN0YW5nbGVzIG9uIHRoZSBzY3JlZW4uXG4vLyBUaGlzIGZpbGUgaG9sZHMgdGhlIG1haW4gY29kZSBmb3IgdGhlIHBsdWdpbnMuIEl0IGhhcyBhY2Nlc3MgdG8gdGhlICpkb2N1bWVudCouXG4vLyBZb3UgY2FuIGFjY2VzcyBicm93c2VyIEFQSXMgaW4gdGhlIDxzY3JpcHQ+IHRhZyBpbnNpZGUgXCJ1aS5odG1sXCIgd2hpY2ggaGFzIGFcbi8vIGZ1bGwgYnJvd3NlciBlbnZpcm9tZW50IChzZWUgZG9jdW1lbnRhdGlvbikuXG4vLyBUaGlzIHNob3dzIHRoZSBIVE1MIHBhZ2UgaW4gXCJ1aS5odG1sXCIuXG5maWdtYS5zaG93VUkoX19odG1sX18pO1xuXG5jb25zdCBkZWVwRmluZEJ5TmFtZUFuZFR5cGUgPSBmdW5jdGlvbihub2RlLCBuYW1lLCB0eXBlLCBmb3VuZEl0ZW1zKSB7XG4gIC8vIGNvbnNvbGUubG9nKFwiU2VhcmNoaW5nIG5vZGUgXCIsbm9kZSk7XG4gIGlmIChub2RlLmNoaWxkcmVuKSB7XG4gICAgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpZiAoaXRlbS5uYW1lID09PSBuYW1lICYmIGl0ZW0udHlwZSA9PT0gdHlwZSkge1xuICAgICAgICBmb3VuZEl0ZW1zLnB1c2goaXRlbSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uc29sZS5sb2coXCJmb3VuZEl0ZW1zOlwiLGZvdW5kSXRlbXMpO1xuICAgIFxuICAgIGNvbnN0IG1hdGNoaW5nSW5zdGFuY2UgPSBub2RlLmNoaWxkcmVuLmZpbHRlcigoaXRlbSkgPT4ge1xuICAgICAgcmV0dXJuIGl0ZW0udHlwZSAhPT0gdHlwZTtcbiAgICB9KTtcbiAgICBjb25zb2xlLmxvZyhcIm1hdGNoaW5nSW5zdGFuY2VcIixtYXRjaGluZ0luc3RhbmNlKTtcbiAgICBpZiAobWF0Y2hpbmdJbnN0YW5jZS5sZW5ndGgpIHtcbiAgICAgIG1hdGNoaW5nSW5zdGFuY2UuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBkZWVwRmluZEJ5TmFtZUFuZFR5cGUoaXRlbSwgbmFtZSwgdHlwZSwgZm91bmRJdGVtcyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbmNvbnN0IGZldGNoSW1hZ2VCbG9iID0gKGRhdGEpID0+IHtcbiAgZmlnbWEudWkucG9zdE1lc3NhZ2Uoe1xuICAgIHR5cGU6ICdmZXRjaC1pbWFnZScsXG4gICAgZGF0YVxuICB9KTtcbn1cbmNvbnN0IGluZGV4S2V5c0Zyb21TZWxlY3Rpb24gPSAobm9kZSwga2V5SW5kZXgpID0+IHtcbiAgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgIFxuICAgIGlmIChjaGlsZC5uYW1lLmluZGV4T2YoJyMnKSA+PSAwKSB7XG4gICAgICBjb25zb2xlLmxvZyhcImNoaWxkTmFtZVwiLGNoaWxkLm5hbWUpO1xuICAgICAgY29uc29sZS5sb2coXCJjaGlsZFR5cGVcIixjaGlsZC50eXBlKTtcbiAgICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tXCIpO1xuICAgICAgY29uc3QgbmFtZSA9IGNoaWxkLm5hbWUucmVwbGFjZSgnIycsJycpO1xuICAgICAgaWYgKCFrZXlJbmRleC5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICBrZXlJbmRleFtuYW1lXSA9IFtdO1xuICAgICAgfVxuICAgICAga2V5SW5kZXhbbmFtZV0ucHVzaCh7XG4gICAgICAgIGlkOiBjaGlsZC5pZCxcbiAgICAgICAgdHlwZTogY2hpbGQudHlwZVxuICAgICAgfSk7XG4gICAgfVxuICB9KTtcblxuICBjb25zdCBtYXRjaGluZ0luc3RhbmNlID0gbm9kZS5jaGlsZHJlbi5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICByZXR1cm4gaXRlbS5uYW1lLmluZGV4T2YoJyMnKSA9PSAtMTtcbiAgfSk7XG5cbiAgaWYgKG1hdGNoaW5nSW5zdGFuY2UubGVuZ3RoKSB7XG4gICAgbWF0Y2hpbmdJbnN0YW5jZS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpbmRleEtleXNGcm9tU2VsZWN0aW9uKGl0ZW0sIGtleUluZGV4KTtcbiAgICB9KTtcbiAgfVxufVxuY29uc3QgaGFuZGxlcnMgPSB7XG4gICdpbWFnZS1ibG9iLXJlc3BvbnNlJzogKG1zZykgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwiUmVzcG9uc2UgcmVjZWl2ZWQgZnJvbSBtc2cgYmxvYlwiLG1zZy5kYXRhKTtcbiAgfSxcbiAgJ25ldy1mZWVkJzogKG1zZykgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwicmF3RGF0YTpcIixtc2cucmF3RGF0YSk7XG4gICAgY29uc29sZS5sb2coXCJrZXlzOlwiLG1zZy5rZXlzKTtcbiAgICBjb25zdCB7IHR5cGUsIGtleXMsIHJhd0RhdGEsIGRhdGEsIGRhdGFUeXBlIH0gPSBtc2c7XG4gICAgbGV0IGN1cnJlbnRQYWdlID0gZmlnbWEuY3VycmVudFBhZ2U7XG4gICAgY29uc29sZS5sb2coXCJjdXJyZW50UGFnZTpcIixjdXJyZW50UGFnZSk7XG4gICAgbGV0IGN1cnJlbnRTZWxlY3Rpb24gPSBjdXJyZW50UGFnZS5zZWxlY3Rpb247XG4gICAgaWYgKCFjdXJyZW50U2VsZWN0aW9uKSB7XG4gICAgICBjdXJyZW50U2VsZWN0aW9uID0gW2N1cnJlbnRQYWdlXVxuICAgIH1cbiAgICBjb25zb2xlLmxvZyhcImN1cnJlbnRTZWxlY3Rpb25cIixjdXJyZW50U2VsZWN0aW9uKTtcblxuICAgIGxldCBrZXlJbmRleCA9IHt9O1xuICAgIGxldCBpbmRleEtleXM7XG4gICAgY3VycmVudFNlbGVjdGlvbi5mb3JFYWNoKChzZWxlY3Rpb24pID0+IHtcbiAgICAgIGluZGV4S2V5c0Zyb21TZWxlY3Rpb24oc2VsZWN0aW9uLGtleUluZGV4KTtcbiAgICB9KTtcbiAgICBcbiAgICBpbmRleEtleXMgPSBPYmplY3Qua2V5cyhrZXlJbmRleCk7XG4gICAgaWYgKGluZGV4S2V5cy5sZW5ndGgpIHtcbiAgICAgIGRhdGEuZm9yRWFjaCgocmVjb3JkLGluZGV4KSA9PiB7XG4gICAgICAgIGNvbnN0IHJlY29yZEtleXMgPSBPYmplY3Qua2V5cyhyZWNvcmQpO1xuICAgICAgICBpbmRleEtleXMuZm9yRWFjaCgoaW5kZXhLZXkpID0+IHtcbiAgICAgICAgICBpZiAoa2V5SW5kZXhbaW5kZXhLZXldW2luZGV4XSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVjb3JkKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGluZGV4S2V5KTtcbiAgICAgICAgICAgIGNvbnN0IHJlY29yZFZhbHVlID0gcmVjb3JkW2luZGV4S2V5XTtcbiAgICAgICAgICAgIGlmICghcmVjb3JkVmFsdWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICByZWNvcmRWYWx1ZS5zdGFydHNXaXRoKFwiaHR0cFwiKSB8fFxuICAgICAgICAgICAgICAgIHJlY29yZFZhbHVlLnN0YXJ0c1dpdGgoXCJodHRwc1wiKVxuICAgICAgICAgICAgICAgICkgJiYgXG4gICAgICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgICAgcmVjb3JkVmFsdWUuZW5kc1dpdGgoXCIuZ2lmXCIpIHx8IFxuICAgICAgICAgICAgICAgICAgcmVjb3JkVmFsdWUuZW5kc1dpdGgoXCIuanBnXCIpIHx8IFxuICAgICAgICAgICAgICAgICAgcmVjb3JkVmFsdWUuZW5kc1dpdGgoXCIucG5nXCIpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGtleUluZGV4W2luZGV4S2V5XVtpbmRleF0uZmlsbFR5cGUgPSBcImltYWdlXCI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBrZXlJbmRleFtpbmRleEtleV1baW5kZXhdLmZpbGxUeXBlID0gXCJ0ZXh0XCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGtleUluZGV4W2luZGV4S2V5XVtpbmRleF0udmFsdWUgPSByZWNvcmRWYWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICAgIC8vIGtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgLy8gICBkZWVwRmluZEJ5TmFtZUFuZFR5cGUoc2VsZWN0aW9uLCBrZXksICdURVhUJywgZm91bmRJdGVtcyk7XG4gICAgLy8gfSk7XG4gICAgY29uc29sZS5sb2coXCJrZXlJbmRleFwiLGtleUluZGV4KTtcbiAgICBpbmRleEtleXMuZm9yRWFjaCgoaW5kZXhLZXkpID0+IHtcbiAgICAgIGNvbnN0IGtleUFycmF5ID0ga2V5SW5kZXhbaW5kZXhLZXldO1xuXG4gICAgICBpZiAoa2V5QXJyYXkubGVuZ3RoKSB7XG4gICAgICAgIGtleUFycmF5LmZvckVhY2goKGtleUFycmF5SXRlbSkgPT4ge1xuICAgICAgICAgIGNvbnN0IG5vZGUgPSBmaWdtYS5nZXROb2RlQnlJZChrZXlBcnJheUl0ZW0uaWQpO1xuXG4gICAgICAgICAgaWYgKGtleUFycmF5SXRlbS5maWxsVHlwZSA9PT0gJ3RleHQnKSB7XG4gICAgICAgICAgICBmaWdtYS5sb2FkRm9udEFzeW5jKG5vZGUuZm9udE5hbWUpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICBub2RlLmNoYXJhY3RlcnMgPSBrZXlBcnJheUl0ZW0udmFsdWU7XG4gICAgICAgICAgICAgIG5vZGUubmFtZSA9IFwiI1wiICsgaW5kZXhLZXk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGtleUFycmF5SXRlbS5maWxsVHlwZSA9PT0gJ2ltYWdlJykge1xuICAgICAgICAgICAgLy8gbGV0IGJsb2IgPSBhd2FpdCBmZXRjaCh1cmwpLnRoZW4ociA9PiByLmJsb2IoKSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZldGNoIEltYWdlIFJlcXVlc3QuLi5cIik7XG4gICAgICAgICAgICBmZXRjaEltYWdlQmxvYihrZXlBcnJheUl0ZW0pO1xuICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIC8vIGlmIChmb3VuZEl0ZW1zLmxlbmd0aCkge1xuICAgIFxuICAgIC8vIH1cbiAgICAvLyBkYXRhLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAvLyAgIE9iamVjdC5rZXlzKGl0ZW0pLmZvckVhY2goKGtleSkgPT4ge1xuICAgIC8vICAgICAgIC8vIGNvbnN0IGZpZ21hRWxlbWVudCA9IGZpZ21hLmdldE5vZGVCeUlkKFwiI1wiICsga2V5LnRyaW0oKSk7XG4gICAgICAgICAgXG4gICAgLy8gICB9KTtcbiAgICAvLyB9KTtcbiAgICBcblxuICAgIFxuICAgIFxuICAgIC8vIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgLy8gcmVxdWVzdC5vcGVuKCdHRVQnLCBtc2cuanNvbl91cmwsIHRydWUpO1xuXG4gICAgLy8gcmVxdWVzdC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAvLyAgIGlmICh0aGlzLnN0YXR1cyA+PSAyMDAgJiYgdGhpcy5zdGF0dXMgPCA0MDApIHtcbiAgICAvLyAgICAgLy8gU3VjY2VzcyFcbiAgICAvLyAgICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKHRoaXMucmVzcG9uc2UpO1xuICAgIC8vICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAvLyAgIH0gZWxzZSB7XG4gICAgLy8gICAgIC8vIFdlIHJlYWNoZWQgb3VyIHRhcmdldCBzZXJ2ZXIsIGJ1dCBpdCByZXR1cm5lZCBhbiBlcnJvclxuXG4gICAgLy8gICB9XG4gICAgLy8gfTtcblxuICAgIC8vIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgIC8vICAgLy8gVGhlcmUgd2FzIGEgY29ubmVjdGlvbiBlcnJvciBvZiBzb21lIHNvcnRcbiAgICAvLyB9O1xuXG4gICAgLy8gcmVxdWVzdC5zZW5kKCk7XG4gIH1cbn1cbi8vIENhbGxzIHRvIFwicGFyZW50LnBvc3RNZXNzYWdlXCIgZnJvbSB3aXRoaW4gdGhlIEhUTUwgcGFnZSB3aWxsIHRyaWdnZXIgdGhpc1xuLy8gY2FsbGJhY2suIFRoZSBjYWxsYmFjayB3aWxsIGJlIHBhc3NlZCB0aGUgXCJwbHVnaW5NZXNzYWdlXCIgcHJvcGVydHkgb2YgdGhlXG4vLyBwb3N0ZWQgbWVzc2FnZS5cbmZpZ21hLnVpLm9ubWVzc2FnZSA9IG1zZyA9PiB7XG4gIFxuICAgIC8vIE9uZSB3YXkgb2YgZGlzdGluZ3Vpc2hpbmcgYmV0d2VlbiBkaWZmZXJlbnQgdHlwZXMgb2YgbWVzc2FnZXMgc2VudCBmcm9tXG4gICAgLy8geW91ciBIVE1MIHBhZ2UgaXMgdG8gdXNlIGFuIG9iamVjdCB3aXRoIGEgXCJ0eXBlXCIgcHJvcGVydHkgbGlrZSB0aGlzLlxuICAgIGlmIChtc2cudHlwZSkge1xuICAgICAgaGFuZGxlcnNbbXNnLnR5cGVdKG1zZyk7XG4gICAgfVxuICAgIC8vIGNvbnN0IG5vZGVzID0gW107XG4gICAgLy8gZm9yIChsZXQgaSA9IDA7IGkgPCA7IGkrKykge1xuICAgIC8vICAgICBjb25zdCByZWN0ID0gZmlnbWEuY3JlYXRlUmVjdGFuZ2xlKCk7XG4gICAgLy8gICAgIHJlY3QueCA9IGkgKiAxNTA7XG4gICAgLy8gICAgIHJlY3QuZmlsbHMgPSBbeyB0eXBlOiAnU09MSUQnLCBjb2xvcjogeyByOiAxLCBnOiAwLjUsIGI6IDAgfSB9XTtcbiAgICAvLyAgICAgZmlnbWEuY3VycmVudFBhZ2UuYXBwZW5kQ2hpbGQocmVjdCk7XG4gICAgLy8gICAgIG5vZGVzLnB1c2gocmVjdCk7XG4gICAgLy8gfVxuICAgIC8vIGZpZ21hLmN1cnJlbnRQYWdlLnNlbGVjdGlvbiA9IG5vZGVzO1xuICAgIC8vIGZpZ21hLnZpZXdwb3J0LnNjcm9sbEFuZFpvb21JbnRvVmlldyhub2Rlcyk7XG4gICAgLy8gTWFrZSBzdXJlIHRvIGNsb3NlIHRoZSBwbHVnaW4gd2hlbiB5b3UncmUgZG9uZS4gT3RoZXJ3aXNlIHRoZSBwbHVnaW4gd2lsbFxuICAgIC8vIGtlZXAgcnVubmluZywgd2hpY2ggc2hvd3MgdGhlIGNhbmNlbCBidXR0b24gYXQgdGhlIGJvdHRvbSBvZiB0aGUgc2NyZWVuLlxuICAgIGZpZ21hLmNsb3NlUGx1Z2luKCk7XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==