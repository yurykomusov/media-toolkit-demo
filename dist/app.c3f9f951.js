// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"js/custom-elements/router.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Router =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(Router, _HTMLElement);

  function Router() {
    var _this;

    _classCallCheck(this, Router);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Router).call(this));
    _this.routes = {
      default: "<div>No view was found. Try again later</div>"
    };
    _this.event = new Event("navigationOccured", {
      "bubbles": false,
      "cancelable": false
    });

    window.onpopstate = function () {
      _this.innerHTML = _this.findRoute(window.location.pathname);

      _this.dispatchEvent(_this.event);
    };

    return _this;
  }

  _createClass(Router, [{
    key: "onConnectedCallback",
    value: function onConnectedCallback() {
      this.routes = {
        default: "<div>No view was found. Try again later</div>"
      };
    }
  }, {
    key: "findRoute",
    value: function findRoute(path) {
      var queryParamStartsAt = path.indexOf('?');
      if (queryParamStartsAt >= 0) path = path.slice(0, queryParamStartsAt); // remove query string param

      return this.routes[path] || this.routes.default;
    }
  }, {
    key: "mapRoute",
    value: function mapRoute(path, view) {
      this.routes[path] = view;
    }
  }, {
    key: "goTo",
    value: function goTo(path) {
      this.innerHTML = this.findRoute(path);
      this.dispatchEvent(this.event);
    }
  }, {
    key: "addNavigation",
    value: function addNavigation($element) {
      var _this2 = this;

      $element.addEventListener('click', function (e) {
        e.preventDefault();
        var pathName = e.currentTarget.pathname;
        if (!pathName) return; // skip clicking not on anchor

        _this2.goTo(pathName);

        window.history.pushState({}, pathName, window.location.origin + pathName);
      });
    }
  }]);

  return Router;
}(_wrapNativeSuper(HTMLElement));

exports.default = Router;
window.window.customElements.define("simple-router", Router); // let $router = document.querySelector('#router');
// $router.mapRoute('/java', 'I like java!')
// $router.mapRoute('/csharp', 'I like c#!')
// $router.mapRoute('/python', 'I like Python!')
// Array.from(document.querySelectorAll('a')).forEach($el => $router.addNavigation($el));
},{}],"js/custom-elements/spinner.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Spinner =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(Spinner, _HTMLElement);

  function Spinner() {
    var _this;

    _classCallCheck(this, Spinner);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Spinner).call(this));
    _this.innerHTML = "\n        <style>        \n        .lds-ellipsis {\n            position: relative;\n            left: 50%;\n            top: 30vh;\n            width: 64px;\n            height: 64px;\n          }\n          .lds-ellipsis div {\n            position: absolute;\n            top: 27px;\n            width: 11px;\n            height: 11px;\n            border-radius: 50%;\n            background: pink;\n            animation-timing-function: cubic-bezier(0, 1, 1, 0);\n          }\n          .lds-ellipsis div:nth-child(1) {\n            left: 6px;\n            animation: lds-ellipsis1 0.6s infinite;\n          }\n          .lds-ellipsis div:nth-child(2) {\n            left: 6px;\n            animation: lds-ellipsis2 0.6s infinite;\n          }\n          .lds-ellipsis div:nth-child(3) {\n            left: 26px;\n            animation: lds-ellipsis2 0.6s infinite;\n          }\n          .lds-ellipsis div:nth-child(4) {\n            left: 45px;\n            animation: lds-ellipsis3 0.6s infinite;\n          }\n          @keyframes lds-ellipsis1 {\n            0% {\n              transform: scale(0);\n            }\n            100% {\n              transform: scale(1);\n            }\n          }\n          @keyframes lds-ellipsis3 {\n            0% {\n              transform: scale(1);\n            }\n            100% {\n              transform: scale(0);\n            }\n          }\n          @keyframes lds-ellipsis2 {\n            0% {\n              transform: translate(0, 0);\n            }\n            100% {\n              transform: translate(19px, 0);\n            }\n          }          \n        </style>\n        <div class=\"lds-ellipsis\"><div></div><div></div><div></div><div></div></div>";
    return _this;
  }

  _createClass(Spinner, [{
    key: "connectedCallback",
    value: function connectedCallback() {}
  }]);

  return Spinner;
}(_wrapNativeSuper(HTMLElement));

exports.default = Spinner;
window.customElements.define("custom-spinner", Spinner);
},{}],"js/views/indexView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = index;

function index(model) {
  var renderExercise = function renderExercise(item) {
    return "<a style=\"display: block;\" class=\"three columns\" href=\"".concat(item.url, "\">\n        <custom-pad data-title=\"").concat(item.discipline, "\" data-description=\"").concat(item.title, "\"></custom-pad>\n    </a>");
  };

  var renderSectionItem = function renderSectionItem(sectionItem, columnsPerItem) {
    return "<a href=\"".concat(sectionItem.url, "\" class=\"").concat(columnsPerItem, " columns\">\n        <custom-pad data-title=\"").concat(sectionItem.name, "\" data-route=\"").concat(sectionItem.url, "\"></custom-pad>\n    </a>");
  };

  return "\n        <h1>\n            Nastaunik.info - media education. Toolkit\n        </h1>\n        <h4 class=\"section-title\">\u041F\u0430\u043F\u0443\u043B\u044F\u0440\u043D\u044B\u044F</h4>\n        <div id=\"popular\" class=\"row\">\n            ".concat(model.popular.map(function (item) {
    return renderExercise(item);
  }).join(''), "\n        </div>\n        \n        <h4 class=\"section-title\">\u041D\u043E\u0432\u044B\u044F</h4>\n        <div id=\"recent\" class=\"row\">\n            ").concat(model.recent.map(function (item) {
    return renderExercise(item);
  }).join(''), "\n        </div>\n        \n        <div class=\"row section-title\">\n            <div class=\"ten columns\">\n                <h4>\u041C\u044D\u0442\u0430\u0432\u0430\u044F \u0433\u0440\u0443\u043F\u0430</h4>\n            </div>\n            <div class=\"two columns\">\n                <button>\u043F\u0430\u043A\u0430\u0437\u0430\u0446\u044C \u0443\u0441\u0435</button>\n            </div>\n        </div>        \n        <div id=\"age\" class=\"row\">\n            ").concat(model.ageGroups.map(function (item) {
    return renderSectionItem(item, 'four');
  }).join(''), "\n        </div>\n\n        <!-- Disciplines-->\n        <div class=\"row section-title\">\n            <div class=\"ten columns\">\n                <h4>\n                    \u041F\u0440\u0430\u0434\u043C\u0435\u0442\n                </h4>\n            </div>\n            <div class=\"two columns\">\n                <button>\u043F\u0430\u043A\u0430\u0437\u0430\u0446\u044C \u0443\u0441\u0435</button>\n            </div>\n        </div>\n\n        <div class=\"row\">\n            ").concat(model.disciplines.map(function (item) {
    return renderSectionItem(item, 'three');
  }).join(''), "\n        </div>\n\n        <div class=\"row section-title\">\n            <div class=\"ten columns\">\n                <h4>\n                    \u041C\u0435\u0434\u044B\u044F \u043A\u0430\u043C\u043F\u0435\u0442\u044D\u043D\u0446\u044B\u044F\n                </h4>\n            </div>\n            <div class=\"two columns\">\n                <button>\u043F\u0430\u043A\u0430\u0437\u0430\u0446\u044C \u0443\u0441\u0435</button>\n            </div>\n        </div>\n\n        <div class=\"row\">\n            ").concat(model.competentions.map(function (item) {
    return renderSectionItem(item, 'three');
  }).join(''), "\n        </div>\n        <a href=\"/exercises\" class=\"btn btn-primary\">click me</a>\n        ");
}
},{}],"js/views/excercisesView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exercisesView;

function exercisesView(model) {
  var renderFilter = function renderFilter(filter) {
    return "\n        <ul id=".concat(filter.id, ">\n            ").concat(filter.items.map(function (li) {
      return "<li>".concat(li.text, "</li>");
    }).join(''), "\n        <ul>");
  };

  var renderSearchResults = function renderSearchResults(searchResults) {
    return "Not done yet!";
  };

  return "\n    <div class=\"container\">\n        <h2 id=\"exercise\">\u041F\u0440\u0430\u043A\u0442\u044B\u043A\u0430\u0432\u0430\u043D\u043D\u0456 - </h2>\n        <button ".concat(model.filerToggleId, ">\u0424\u0456\u043B\u044C\u0442\u0440\u044B</button>\n        <div id=").concat(model.filterBoxId, " class=\"row hidden\">\n            <div class=\"three columns\">\n                <label>\u041F\u0440\u0430\u0434\u043C\u0435\u0442\u044B</label>                \n               ").concat(renderFilter(model.filters.disciplineFilter), "\n            </div>\n            <div class=\"three columns\">\n                <label>\u041C\u044D\u0442\u0430\u0432\u044B\u044F \u0433\u0440\u0443\u043F\u044B</label>\n                \n                ").concat(renderFilter(model.filters.ageGroupFilter), "\n            </div>\n            <div class=\"three columns\">\n                <label>\u0422\u044D\u043C\u044B</label>                \n                ").concat(renderFilter(model.filters.themeFilter), "\n            </div>\n            <div class=\"three columns\">\n                <label>\u0417\u0433\u0440\u0443\u043F\u0430\u0432\u0430\u0446\u044C \u043F\u0430</label>\n                \n                ").concat(renderFilter(model.filters.groupByFilter), "\n            </div>\n        </div>\n\n        <div id=\"items-search-results\">\n            ").concat(renderSearchResults(), "\n        </div>\n    </div>");
  return document.createElement('div');
}
},{}],"js/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chunk = exports.groupBy = void 0;

var groupBy = function groupBy(arr, groupFunc) {
  return arr.reduce(function (previous, current, index, array) {
    var k = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : groupFunc(current);
    return (previous[k] || (previous[k] = [])).push(current), previous;
  }, {});
};

exports.groupBy = groupBy;

var chunk = function chunk(arr, chunkSize) {
  return arr.reduce(function (all, current, index) {
    var chunkIndex = Math.floor(index / chunkSize);

    if (!all[chunkIndex]) {
      all[chunkIndex] = [];
    }

    all[chunkIndex].push(current);
    return all;
  }, []);
};

exports.chunk = chunk;
},{}],"js/ItemsDataProvider.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ = _interopRequireWildcard(require("./utils.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ItemsDataProvider =
/*#__PURE__*/
function () {
  function ItemsDataProvider(jsonData) {
    _classCallCheck(this, ItemsDataProvider);

    this._defaultGrouping = 'by discipline';
    this._data = jsonData;
    this._filterConfig = {
      "discipline": function discipline(filterValue) {
        return function (item) {
          return item.discipline_id.toUpperCase() == filterValue.toUpperCase();
        };
      },
      "ageGroup": function ageGroup(filterValue) {
        return function (item) {
          return item.ageRange.toUpperCase() == filterValue.toUpperCase();
        };
      },
      "theme": function theme(filterValue) {
        return function (item) {
          return item.themes.toUpperCase() == filterValue.toUpperCase();
        };
      }
    };
    this._filtersToApply = [];

    this._groupingToApply = function (data) {
      return {
        "": data
      };
    };

    this._expandBy = [];
  }

  _createClass(ItemsDataProvider, [{
    key: "applyFilter",
    value: function applyFilter(filterName, filterValue) {
      if (!filterValue || filterValue == '') return this;
      var filterFunc = this._filterConfig[filterName];
      if (!filterFunc) throw Error("Could not find appropriate filter for ".concat(filterName));

      this._filtersToApply.push(filterFunc(filterValue));

      return this;
    }
  }, {
    key: "applyGroupingAndSort",
    value: function applyGroupingAndSort(groupBy) {
      var groupingFunc = function groupingFunc(data) {
        return data;
      };

      if (groupBy == 'by discipline') {
        groupingFunc = function groupingFunc(data) {
          return _.groupBy(data, function (item) {
            return item.discipline_id;
          });
        };
      }

      if (groupBy == 'by age') {
        groupingFunc = function groupingFunc(data) {
          return _.groupBy(data, function (item) {
            return item.ageRange;
          });
        };
      }

      if (groupBy == 'by theme') {
        groupingFunc = function groupingFunc(data) {
          return _.groupBy(data, function (item) {
            return item.themes;
          });
        };
      }

      if (groupBy == 'newest') {
        groupingFunc = function groupingFunc(data) {
          var sorted = data.slice().sort(function (item1, item2) {
            return item1.date.localeCompare(item2.date);
          });
          return _.groupBy(sorted, function () {
            return 'From Newest To Oldest';
          });
        };
      }

      if (groupBy == 'oldest') {
        groupingFunc = function groupingFunc(data) {
          var sorted = data.slice().sort(function (item1, item2) {
            return item2.date.localeCompare(item1.date);
          });
          return _.groupBy(sorted, function () {
            return 'From Oldest To Newest';
          });
        };
      }

      if (groupBy == 'popular') {
        groupingFunc = function groupingFunc(data) {
          var sorted = data.slice().sort(function (item1, item2) {
            return (item1.popular || false) - (item2.popular || false);
          });
          return _.groupBy(sorted, function () {
            return 'From Oldest To Newest';
          });
        };
      }

      var needExpand = groupBy == 'by theme'; // this transformation allow to filter by array-properties like theme

      var expandedByThemeFunc = needExpand ? function (data) {
        return data.reduce(function (prev, next) {
          return [].concat(_toConsumableArray(prev), _toConsumableArray(next.themes.map(function (t) {
            return _objectSpread({}, next, {
              themes: t
            });
          })));
        }, []);
      } : function (data) {
        return data;
      };

      this._groupingToApply = function (data) {
        return groupingFunc(expandedByThemeFunc(data));
      }; // I am doing something crazy!


      return this;
    }
  }, {
    key: "executeQuery",
    value: function executeQuery() {
      var _this = this;

      // group by 
      // apply filters
      // remove empty sections
      var grouped = this._groupingToApply(this._data);

      var aggregatedFilter = function aggregatedFilter(data) {
        return _this._filtersToApply.reduce(function (accumulator, singleFilter) {
          return accumulator.filter(singleFilter);
        }, data);
      };

      return Object.entries(grouped).map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            items = _ref2[1];

        return [key, aggregatedFilter(items)];
      }).filter(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            key = _ref4[0],
            items = _ref4[1];

        return items.length > 0;
      }) // show only sections with elements
      .reduce(function (accumulator, _ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            key = _ref6[0],
            items = _ref6[1];

        return _objectSpread({}, accumulator, _defineProperty({}, key, items));
      }, {});
    }
  }]);

  return ItemsDataProvider;
}();

exports.default = ItemsDataProvider;
},{"./utils.js":"js/utils.js"}],"js/controllers/indexController.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getIndexModel;

var _ItemsDataProvider = _interopRequireDefault(require("../ItemsDataProvider.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getIndexModel(json) {
  var itemsDataProvider = new _ItemsDataProvider.default(json['items']);

  var getRecent = function getRecent() {
    var recentItemsGrouped = itemsDataProvider.applyGroupingAndSort('newest').executeQuery();
    var recentItems = recentItemsGrouped[Object.keys(recentItemsGrouped)[0]];
    return recentItems;
  };

  var getPopular = function getPopular() {
    var popularItemsGrouped = itemsDataProvider.applyGroupingAndSort('popular').executeQuery();
    var popularItems = popularItemsGrouped[Object.keys(popularItemsGrouped)[0]];
    return popularItems;
  };

  return {
    recent: getRecent().slice(0, 4),
    popular: getPopular().slice(0, 4),
    disciplines: [{
      name: "Біялогія",
      url: "/exercises?discipline=biology"
    }, {
      name: "Чалавек і Свет",
      url: "/exercises?discipline=manandtheworld"
    }, {
      name: "Мастацтва",
      url: "/exercises?discipline=arts"
    }, {
      name: "Выхаваўчы занятак",
      url: "/exercises?items.html?discipline=educational"
    }],
    ageGroups: [{
      name: "Дзеці",
      url: "/exercises?ageGroup=elementary"
    }, {
      name: "Падлеткі",
      url: "/exercises?ageGroup=primary"
    }, {
      name: "Дарослыя",
      url: "/exercises?ageGroup=adults"
    }],
    competentions: [{
      name: "Доступ і надзейнасць",
      url: "/exercises?theme=ads"
    }, {
      name: "Аналіз медыя",
      url: "/exercises?theme=media%20consumering"
    }, {
      name: "Ацэнка медыя",
      url: "/exercises?theme=facts%20and%20opinions"
    }, {
      name: "Стварэнне і карыстанне медыя-прасторай",
      url: "/exercises?theme=fact%20checking"
    }]
  };
}
},{"../ItemsDataProvider.js":"js/ItemsDataProvider.js"}],"js/controllers/excercisesController.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getExcercisesModel;

var _ItemsDataProvider = _interopRequireDefault(require("../ItemsDataProvider.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getSearchResults() {
  return null; // todo
}

function getFilters(json) {
  return {
    disciplineFilter: {
      items: json['all-disciplines']
    },
    ageGroupFilter: {
      items: json['all-age-groups']
    },
    themeFilter: {
      items: json['all-themes']
    },
    groupByFilter: {
      items: [{
        key: "newest",
        text: "Новыя"
      }, {
        key: "oldest",
        text: "Старыя"
      }, {
        key: "by discipline",
        text: "Па прадметах"
      }, {
        key: "by theme",
        text: "Па тэмах"
      }, {
        key: "by age",
        text: "Па мэтавай групе"
      }]
    },
    actions: {
      onToggleFilters: function onToggleFilters(e) {
        return e.target.classList.toggle('hidden');
      },
      onFilterClick: function onFilterClick(e) {
        return console.log("clicked event: ".concat(e));
      }
    }
  };
}

function getExcercisesModel(json) {
  return {
    filters: getFilters(json),
    getSearchResults: getSearchResults()
  };
}
},{"../ItemsDataProvider.js":"js/ItemsDataProvider.js"}],"js/app.js":[function(require,module,exports) {
"use strict";

var _router = _interopRequireDefault(require("./custom-elements/router.js"));

var _spinner = _interopRequireDefault(require("./custom-elements/spinner.js"));

var _indexView = _interopRequireDefault(require("./views/indexView.js"));

var _excercisesView = _interopRequireDefault(require("./views/excercisesView.js"));

var _indexController = _interopRequireDefault(require("./controllers/indexController.js"));

var _excercisesController = _interopRequireDefault(require("./controllers/excercisesController.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var App =
/*#__PURE__*/
function () {
  function App($container) {
    var _this = this;

    _classCallCheck(this, App);

    this.$container = $container;
    this.$root = document.createElement('div');
    this.$root.innerHTML = "<simple-router><custom-spinner/></simple-router>";
    this.$router = this.$root.querySelector('simple-router');
    fetch('data/exercises.json').then(function (response) {
      return response.json();
    }).then(function (json) {
      setTimeout(function () {
        return _this.$router.goTo('default');
      }, 1000); // todo: remove timeout

      var indexModel = (0, _indexController.default)(json);
      var excercisesModel = (0, _excercisesController.default)(json);

      _this.$router.mapRoute('default', (0, _indexView.default)(indexModel));

      _this.$router.mapRoute('/', (0, _indexView.default)(indexModel));

      _this.$router.mapRoute('/exercises', (0, _excercisesView.default)(excercisesModel));

      _this.$router.mapRoute('/details', "<div>You gonna see some details here!</div>");
    });

    var refreshNavigation = function refreshNavigation() {
      Array.from(_this.$root.querySelectorAll('[data-route]') || []).forEach(function ($el) {
        return _this.$router.addNavigation($el);
      });
      Array.from(_this.$root.querySelectorAll('a') || []).forEach(function ($el) {
        return _this.$router.addNavigation($el);
      });
    };

    refreshNavigation();
    this.$router.addEventListener('navigationOccured', refreshNavigation);
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      this.$container.appendChild(this.$root);
    }
  }]);

  return App;
}();

var app = new App(document.querySelector('#app'));
app.render();
},{"./custom-elements/router.js":"js/custom-elements/router.js","./custom-elements/spinner.js":"js/custom-elements/spinner.js","./views/indexView.js":"js/views/indexView.js","./views/excercisesView.js":"js/views/excercisesView.js","./controllers/indexController.js":"js/controllers/indexController.js","./controllers/excercisesController.js":"js/controllers/excercisesController.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61372" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/app.js"], null)
//# sourceMappingURL=/app.c3f9f951.map