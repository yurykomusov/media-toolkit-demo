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
})({"js/utils.js":[function(require,module,exports) {
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
},{"./utils.js":"js/utils.js"}],"js/SingleFilterModule.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SingleFilterModule = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SingleFilterModule =
/*#__PURE__*/
function () {
  function SingleFilterModule(element) {
    var _this = this;

    _classCallCheck(this, SingleFilterModule);

    this.$element = element;
    this._selectedValue = null;
    this.$selected = null;
    this._onChange = null;
    this.$element.addEventListener('click', function (event) {
      if (event.target.tagName !== 'A') return;
      var from = null;
      var to = null;

      if (_this.$selected && _this.$selected !== null) {
        _this.$selected.classList.remove('selected');

        from = _this.$selected.dataset.key;
      }

      if (_this.$selected !== event.target) {
        _this.$selected = event.target;

        _this.$selected.classList.add('selected');

        to = _this.$selected.dataset.key;
      } else {
        _this.$selected == null;
      }

      if (_this._onChange !== null) _this._onChange(from, to);
    });
  }

  _createClass(SingleFilterModule, [{
    key: "onChange",
    set: function set(value) {
      this._onChange = value;
    }
  }, {
    key: "selectedValue",
    get: function get() {
      if (this.$selected) return this.$selected.dataset.key;else return null;
    },
    set: function set(value) {
      if (this.$selected) this.$selected.classList.remove('selected');
      var $target = Array.from(this.$element.querySelectorAll('a')).find(function ($el) {
        return SingleFilterModule.compareWithWhiteSpaceIgnore($el.dataset.key, value);
      });

      if ($target !== this.$selected && $target) {
        this.$selected = $target;
        if (this.$selected !== null) this.$selected.classList.toggle('selected');
        if (this._onChange !== null) this._onChange(this.selectedValue, value);
      } else {
        return;
      }
    }
  }], [{
    key: "compareWithWhiteSpaceIgnore",
    get: function get() {
      return function (str1, str2) {
        return str1.toUpperCase().replace(' ', '') === str2.toUpperCase().replace(' ', '');
      };
    }
  }]);

  return SingleFilterModule;
}();

exports.SingleFilterModule = SingleFilterModule;
},{}],"js/items.js":[function(require,module,exports) {
"use strict";

var _ = _interopRequireWildcard(require("./utils.js"));

var _ItemsDataProvider = _interopRequireDefault(require("./ItemsDataProvider.js"));

var _SingleFilterModule = require("./SingleFilterModule.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ItemsModule =
/*#__PURE__*/
function () {
  function ItemsModule() {
    var _this = this;

    _classCallCheck(this, ItemsModule);

    this._showFilter = false;
    this._data = [];
    this._isDataLoaded = false;
    this.$filterBox = document.querySelector('#filter-box');
    this.$trigger = document.querySelector('#filter-toggle');
    this.$filterDisciplines = document.querySelector('#disciplines');
    this.$filterAgeGroups = document.querySelector('#age-groups');
    this.$filterThemes = document.querySelector('#themes');
    this.$filterGroupBy = document.querySelector('#group-by');
    this.$searchResults = document.querySelector('#items-search-results');
    this.$trigger.addEventListener('click', function () {
      return _this.showFilter = !_this.showFilter;
    });
    var disciplineFilter = new _SingleFilterModule.SingleFilterModule(this.$filterDisciplines);
    var ageGroupFilter = new _SingleFilterModule.SingleFilterModule(this.$filterAgeGroups);
    var themeFilter = new _SingleFilterModule.SingleFilterModule(this.$filterThemes);
    var groupByFilter = new _SingleFilterModule.SingleFilterModule(this.$filterGroupBy);

    disciplineFilter.onChange = function (from, to) {
      return _this.onFilterChange('discipline', to);
    };

    themeFilter.onChange = function (from, to) {
      return _this.onFilterChange('theme', to);
    };

    ageGroupFilter.onChange = function (from, to) {
      return _this.onFilterChange('ageGroup', to);
    };

    groupByFilter.onChange = function (from, to) {
      return _this.onFilterChange('groupBy', to);
    };

    this._selectedFilters = {}; // { filterName, filterValue}

    this._groupBy = null;
    this.filters = {
      'discipline': disciplineFilter,
      'theme': themeFilter,
      'ageGroup': ageGroupFilter,
      'groupBy': groupByFilter
    };
  }

  _createClass(ItemsModule, [{
    key: "bindFilter",
    value: function bindFilter($container, items) {
      $container.innerHTML = items.map(function (item) {
        return "<li><a data-key=\"".concat(item.key, "\">").concat(item.text, "</a></li>");
      }).reduce(function (item1, item2) {
        return item1.concat(item2);
      });
    }
  }, {
    key: "bindItem",
    value: function bindItem($container, title, description) {
      var $pad = document.createElement('custom-pad');
      $pad.dataset.title = title;
      $pad.dataset.description = description;
      $pad.classList.add('three');
      $pad.classList.add('columns');
      $container.appendChild($pad);
    }
  }, {
    key: "bindItemsSection",
    value: function bindItemsSection($container, items, title) {
      var _this2 = this;

      var $title = document.createElement('h4');
      $title.classList.add('section-title');
      $title.innerText = title;
      $container.appendChild($title);

      _.chunk(items, 4).forEach(function (chunk) {
        var $row = document.createElement('div');
        $row.addEventListener('click', function () {
          return window.location = 'details.html';
        });
        $row.classList.add('row');
        chunk.forEach(function (item) {
          return _this2.bindItem($row, item.discipline, item.title);
        });
        $container.appendChild($row);
      });
    }
  }, {
    key: "bindItems",
    value: function bindItems($container, itemsGrouped) {
      var _this3 = this;

      if (Object.keys(itemsGrouped).length == 0) {
        this.$searchResults.innerHTML = 'Не знойдзена ніводнага практыкавання:( Паспрабуйце пашукаць па іншых крытэрыях';
        return;
      }

      this.$searchResults.innerHTML = '';
      Object.keys(itemsGrouped).forEach(function (groupName) {
        return _this3.bindItemsSection($container, itemsGrouped[groupName], _this3.getGroupTitleByKey(groupName, _this3.filters['groupBy'].selectedValue));
      });
    }
  }, {
    key: "getGroupTitleByKey",
    value: function getGroupTitleByKey(key, groupBy) {
      if (groupBy === 'newest') return 'З ранніх';
      if (groupBy === 'oldest') return 'З апошніх';
      if (groupBy === 'by discipline') return this._allDisciplines.find(function (i) {
        return i.key === key;
      }).text;
      if (groupBy === 'by theme') return this._allThemes.find(function (i) {
        return i.key === key;
      }).text;
      if (groupBy === 'by age') return this._allAgeGroups.find(function (i) {
        return i.key === key;
      }).text;
    }
  }, {
    key: "onDataLoaded",
    value: function onDataLoaded(data) {
      this._items = data['items'];
      this._allDisciplines = data['all-disciplines'];
      this._allAgeGroups = data['all-age-groups'];
      this._allThemes = data['all-themes'];
      this.bindFilter(this.$filterDisciplines, this._allDisciplines);
      this.bindFilter(this.$filterAgeGroups, this._allAgeGroups);
      this.bindFilter(this.$filterThemes, this._allThemes);
      this.bindFilter(this.$filterGroupBy, [{
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
      }]);
      this._isDataLoaded = true; // set default filter

      this.filters['groupBy'].selectedValue = 'by discipline'; // set links
    }
  }, {
    key: "onFilterChange",
    value: function onFilterChange(name, value) {
      console.log("filter ".concat(name, " changed to ").concat(value));
      if (name == 'groupBy') this._groupBy = value;else this._selectedFilters[name] = value;
      var itemsDataProvider = new _ItemsDataProvider.default(this._items);
      var items = Object.entries(this._selectedFilters) // applying filters
      .reduce(function (accumulator, _ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            filterName = _ref2[0],
            filterValue = _ref2[1];

        return accumulator.applyFilter(filterName, filterValue);
      }, itemsDataProvider).applyGroupingAndSort(this._groupBy).executeQuery();
      this.bindItems(this.$searchResults, items);
    }
  }, {
    key: "onUrlChange",
    value: function onUrlChange(location) {
      var searchParams = new URLSearchParams(location.search);
      var $title = document.querySelector('#exercise-title');
      ъ;
      $title.innerHTML = $title.innerHTML + ' усе';

      if (searchParams.has('ageGroup')) {
        this.filters['ageGroup'].selectedValue = searchParams.get('ageGroup');
        this.filters['groupBy'].selectedValue = 'by discipline';
        $title.innerHTML = $title.innerHTML + ' ';
      }

      if (searchParams.has('discipline')) {
        this.filters['discipline'].selectedValue = searchParams.get('discipline');
        this.filters['groupBy'].selectedValue = 'by age';
      }

      if (searchParams.has('theme')) {
        this.filters['theme'].selectedValue = searchParams.get('theme');
        this.filters['groupBy'].selectedValue = 'by discipline';
      }
    }
  }, {
    key: "showFilter",
    get: function get() {
      return this._showFilter;
    },
    set: function set(value) {
      if (this._showFilter === value) return;
      this._showFilter = value;
      if (value === false) this.$filterBox.setAttribute('style', 'display: none');else this.$filterBox.setAttribute('style', 'display: block');
    }
  }]);

  return ItemsModule;
}();

var itemsController = new ItemsModule();
fetch('data/exercises.json').then(function (response) {
  return response.json();
}).then(function (json) {
  return itemsController.onDataLoaded(json);
});
window.addEventListener('load', function () {
  return itemsController.onUrlChange(window.location);
});
},{"./utils.js":"js/utils.js","./ItemsDataProvider.js":"js/ItemsDataProvider.js","./SingleFilterModule.js":"js/SingleFilterModule.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61097" + '/');

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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/items.js"], null)
//# sourceMappingURL=/items.55ef7504.map