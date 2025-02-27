(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 3));
var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 4);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var realAtob;

var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;

if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");}

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;var result = '';var r1;var r2;var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 |
      (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));

      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) :
      r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) :
      String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}

function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

function getLocale() {
  // 优先使用 $locale
  var app = getApp({
    allowDefault: true });

  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return wx.getSystemInfoSync().language || 'zh-Hans';
}

function setLocale(locale) {
  var app = getApp();
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {return fn({
        locale: locale });});

    return true;
  }
  return false;
}

var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}

if (typeof global !== 'undefined') {
  global.getLocale = getLocale;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale,
  setLocale: setLocale,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


var showActionSheet = {
  args: function args(fromArgs) {
    if (typeof fromArgs === 'object') {
      fromArgs.alertText = fromArgs.title;
    }
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo,
  showActionSheet: showActionSheet };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  var newTriggerEvent = function newTriggerEvent(event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
  try {
    // 京东小程序 triggerEvent 为只读
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}

function initHook(name, options, isComponent) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"jj-uni-messagebox","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var messages = {};

var locale;

{
  locale = wx.getSystemInfoSync().language;
}

function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}

initI18nMessages();

var i18n = (0, _uniI18n.initVueI18n)(
locale,
{});

var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {var _this2 = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this2.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    } } };


var setLocale$1 = i18n.setLocale;
var getLocale$1 = i18n.getLocale;

function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale() });

  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {return watch(v);});
    } });

}

function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}

// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initAppLocale(_vue.default, vm, wx.getSystemInfoSync().language || 'zh-Hans');

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 11:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 12:
/*!***********************************************************************************************************!*\
  !*** /Users/weiqu/Documents/GitApp/jj-uni-messagebox/pages/components/jj-messagebox/messageView/index.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.installPlugin_Vue3 = void 0;
var _toast = _interopRequireDefault(__webpack_require__(/*! ./toast.js */ 13));
var _alert = _interopRequireDefault(__webpack_require__(/*! ./alert.js */ 25));
var _loading = _interopRequireDefault(__webpack_require__(/*! ./loading.js */ 33));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var installPlugin = function installPlugin(Vue, appUrl) {
  Vue.prototype.$jj_loading = _loading.default;
  Vue.prototype.$jj_alert = _alert.default;
  Vue.prototype.$jj_toast = _toast.default;
  setupGlobalData(appUrl);
};

var installPlugin_Vue3 = function installPlugin_Vue3(app, appUrl) {
  app.config.globalProperties.$jj_loading = _loading.default;
  app.config.globalProperties.$jj_alert = _alert.default;
  app.config.globalProperties.$jj_toast = _toast.default;
  setupGlobalData(appUrl);
};exports.installPlugin_Vue3 = installPlugin_Vue3;

var setupGlobalData = function setupGlobalData(appUrl) {
  setTimeout(function () {
    getApp().globalData.$jj_app_message_url = appUrl || '';
    getApp().globalData.$jj_loading = _loading.default;
    getApp().globalData.$jj_alert = _alert.default;
    getApp().globalData.$jj_toast = _toast.default;
  }, 0);
};var _default =

installPlugin;exports.default = _default;

/***/ }),

/***/ 13:
/*!***********************************************************************************************************!*\
  !*** /Users/weiqu/Documents/GitApp/jj-uni-messagebox/pages/components/jj-messagebox/messageView/toast.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createApp) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _constant = __webpack_require__(/*! ./constant.js */ 14);


var _ref = __webpack_require__(/*! ./ref.js */ 15);



var _processor = _interopRequireDefault(__webpack_require__(/*! ./processor.js */ 16));
var _jjToast = _interopRequireDefault(__webpack_require__(/*! ../toast/jj-toast.vue */ 17));


var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 3));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
var jjToast = _vue.default.extend(_jjToast.default); //创建vm实例的构造函数












var jj_toast_instance = null;

var getData = function getData(toastData, type, duration) {
  var data = {};
  var isToastDataNull = toastData === undefined || toastData === null;
  var isTypeNull = type === undefined || type === null;
  var isDurationNull = duration === undefined || duration === null;
  if (isToastDataNull && isTypeNull && isDurationNull) {
    return {};
  } else {
    if (!isToastDataNull) {
      if (typeof toastData === 'object') {
        data = _objectSpread({},
        toastData);

        return data;
      } else {
        data['message'] = toastData + '';
      }
    }

    if (!isTypeNull) {
      data['type'] = type + '';
    }
    if (!isDurationNull) {
      if (duration.constructor === Number) {
        data["duration"] = duration;
      }
    }
  }
  return data;
};


var jj_toast = function jj_toast(toastData, type, duration) {
  var data = getData(toastData, type, duration);
  var obj = (0, _processor.default)(_constant.kToast);
  obj.processDataFun = getData;











  (0, _ref.showMessageBox)(function () {
    obj.messageObj = showToastApp_MP(data);
  });








  return obj;
};

var showToastH5 = function showToastH5(data) {
  var isClose = data['isClose'] || false;
  removeToastH5();
  if (isClose) {
    return;
  }
  var instance = new jjToast({
    data: data });

  instance.$mount();
  document.body.appendChild(instance.$el);
  instance.show(data);
  jj_toast_instance = instance;
};

var showToastH5_Vue3 = function showToastH5_Vue3(data) {
  var isClose = data['isClose'] || false;
  removeToastH5();
  if (isClose) {
    return;
  }
  document.body.appendChild(mountNode);
  var app = createApp(_jjToast.default, _objectSpread({},
  data));

  var instance = app.mount(mountNode);
  instance.show(data);
  jj_toast_instance = instance;
};

var removeToastH5 = function removeToastH5() {
  if (jj_toast_instance !== null) {
    if (jj_toast_instance.jj_time !== null) {
      clearTimeout(jj_toast_instance.jj_time);
      jj_toast_instance.jj_time = null;
    }
    jj_toast_instance.close();
    jj_toast_instance.$el.remove();
    jj_toast_instance = null;
  }
};

var showToastApp_MP = function showToastApp_MP(data) {
  var toast = (0, _ref.getRef)(_constant.kToast);
  // console.log('------',toast,data)
  if (toast !== undefined) {
    if (toast.jj_time !== null) {
      clearTimeout(toast.jj_time);
      toast.jj_time = null;
    }
    toast.isShow = false;
    var isClose = data['isClose'] || false;
    if (isClose) {
      toast.close();
      return null;
    }
    toast.show(data);
    return toast;
  }
  return null;
};var _default =

jj_toast;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createApp"]))

/***/ }),

/***/ 14:
/*!**************************************************************************************************************!*\
  !*** /Users/weiqu/Documents/GitApp/jj-uni-messagebox/pages/components/jj-messagebox/messageView/constant.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.kLoading = exports.kAlert = exports.kToast = void 0;
var kToast = "jj_toast";exports.kToast = kToast;
var kAlert = 'jj_alert';exports.kAlert = kAlert;
var kLoading = 'jj_loading';exports.kLoading = kLoading;

/***/ }),

/***/ 15:
/*!*********************************************************************************************************!*\
  !*** /Users/weiqu/Documents/GitApp/jj-uni-messagebox/pages/components/jj-messagebox/messageView/ref.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.getRefList = exports.removeRefObj = exports.addRefObj = exports.getRef = exports.showMessageBox = exports.isShowAppMessageView = exports.currentPageRoute = exports.refRouteKey = exports.refMessageObj = void 0;
var appShowing = false;
var appShowFnList = [];

var refMessageObj = function refMessageObj() {
  var obj = getApp().globalData.$jj_refMessageObj;
  if (obj !== undefined) {
    return obj;
  }
  getApp().globalData.$jj_refMessageObj = {};
  return getApp().globalData.$jj_refMessageObj;
};exports.refMessageObj = refMessageObj;

var jj_app_message_url = function jj_app_message_url() {
  return getApp().globalData.$jj_app_message_url || '';
};

var currentPageRoute = function currentPageRoute() {
  var routes = getCurrentPages(); // 获取当前打开过的页面路由数组
  //H5 页面刷新后，返回上一页，会返回空数组
  if (routes.length === 0) {
    return '';
  }
  var curRoute = routes[routes.length - 1].route;
  return curRoute;
};exports.currentPageRoute = currentPageRoute;

var refRouteKey = function refRouteKey() {
  var routes = getCurrentPages(); // 获取当前打开过的页面路由数组
  //H5 页面刷新后，返回上一页，会返回空数组
  if (routes.length === 0) {
    return '';
  }
  var index = routes.length - 1;
  var rKey = routes[index].route + '/' + index;
  return rKey;
};exports.refRouteKey = refRouteKey;

var isShowAppMessageView = function isShowAppMessageView() {
  var curRoute = currentPageRoute();
  var url = jj_app_message_url();
  if (url.indexOf(curRoute) === -1) {
    return false;
  } else {
    return true;
  }
};exports.isShowAppMessageView = isShowAppMessageView;

var showMessageBox = function showMessageBox(showFn) {









  showFn();

};exports.showMessageBox = showMessageBox;

var appShowMessageBox = function appShowMessageBox(showFn) {
  var url = jj_app_message_url();

  if (url.length > 0) {
    if (appShowing) {
      //说明进入页面跳转，但是页面并没有挂载完成，需要放入队列中缓存起来
      appShowFnList.push(showFn);
      return;
    }
    // console.log(appShowFnList)
    var isShowAppView = isShowAppMessageView();
    if (!isShowAppView) {
      //标记页面跳转
      appShowing = true;
      uni.navigateTo({
        url: jj_app_message_url(),
        animationType: 'none',
        animationDuration: 0,
        success: function success() {
          //页面已经加载完成，显示弹框
          appShowFn(showFn);
        },
        fail: function fail() {
          appShowing = false;
        } });

      return;
    }
  }
  appShowFn(showFn);
};
//循环调用，显示队列里面的方法
var appShowFn = function appShowFn(showFn) {
  showFn();
  appShowing = false;
  if (appShowFnList.length > 0) {
    var fn = appShowFnList[0];
    //删除数组中的第一个元素
    appShowFnList.splice(0, 1);
    appShowFn(fn);
  }
};

var getRef = function getRef(refId) {
  var refKey = refRouteKey();
  var refObj = refMessageObj();
  var currentObj = refObj[refKey];
  if (currentObj !== undefined) {
    var ref = currentObj[refId];
    if (ref !== undefined) {
      return ref;
    }
  }
  return currentObj;
};exports.getRef = getRef;

var addRefObj = function addRefObj(refId, ref) {
  var refKey = refRouteKey();
  var refObj = refMessageObj();
  var currentObj = refObj[refKey];
  if (currentObj !== undefined) {
    currentObj[refId] = ref;
  } else {
    var obj = {};
    obj[refId] = ref;
    refObj[refKey] = obj;
  }
};exports.addRefObj = addRefObj;

var removeRefObj = function removeRefObj() {
  var refKey = refRouteKey();
  var refObj = refMessageObj();
  var currentObj = refObj[refKey];
  if (currentObj !== undefined) {
    delete refObj[refKey];
  }
};exports.removeRefObj = removeRefObj;

var getRefList = function getRefList() {
  var refList = [];
  var refKey = refRouteKey();

  var currentObj = refMessageObj()[refKey];
  if (currentObj !== undefined) {
    var refObj = refMessageObj()[refKey];
    for (var key in refObj) {
      refList.push(refObj[key]);
    }
  }
  return refList;
};exports.getRefList = getRefList;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 16:
/*!***************************************************************************************************************!*\
  !*** /Users/weiqu/Documents/GitApp/jj-uni-messagebox/pages/components/jj-messagebox/messageView/processor.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _constant = __webpack_require__(/*! ./constant.js */ 14);





var processorObj = function processorObj(type) {
  var appDuration = 300;
  var obj = new Object();
  obj.type = type;
  obj.isClose = false;
  obj.messageObj = null;
  obj.processDataFun = null;
  obj.close = function () {
    if (obj.isClose) {
      return;
    }
    if (obj.messageObj !== null) {
      removeData();
    } else {





    }
  };
  var closeApp = function closeApp() {
    setTimeout(function () {
      if (obj.messageObj !== null) {
        removeData();
      }
    }, appDuration);
  };

  var removeData = function removeData() {
    obj.isClose = true;
    obj.messageObj.close();
    obj.messageObj = null;
  };

  obj.update = function (param1, param2, param3) {
    if (obj.isClose) {
      return;
    }
    if (obj.processDataFun !== null) {
      if (obj.messageObj !== null) {
        updateData(param1, param2, param3);
      } else {





      }

    }
  };

  var updateApp = function updateApp(param1, param2, param3) {
    setTimeout(function () {
      if (obj.messageObj !== null) {
        updateData(param1, param2, param3);
      }
    }, appDuration);
  };

  var updateData = function updateData(param1, param2, param3) {

    var data = {};
    if (obj.type === _constant.kAlert) {
      data = obj.processDataFun(param1, param2, param3);
    } else if (obj.type === _constant.kLoading) {
      data = obj.processDataFun(param1);
    } else if (obj.type === _constant.kToast) {
      data = obj.processDataFun(param1, param2, param3);
    } else {
      return;
    }
    obj.messageObj.update(data);
  };

  return obj;
};var _default =

processorObj;exports.default = _default;

/***/ }),

/***/ 2:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 22:
/*!******************************************************************************************************!*\
  !*** /Users/weiqu/Documents/GitApp/jj-uni-messagebox/pages/components/jj-messagebox/static/image.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.warn_icon = exports.fail_icon = exports.success_icon = exports.loading_taichi_icon = exports.loading_round_icon = exports.loading_icon = exports.close_icon = void 0;
var close_icon = function close_icon() {
  return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAv5JREFUeF7tm0uS0zAQQFv2RYDZ8FnFTo4BS2DHNVjBFCuuwQ5YwtwiVrLiswHmIrYoTcUuJVEitdStSJlklaro0++pJdmOJeCef8Qu/2KxeLRcLv+eoxcb2ySgaZr3QojnANAKIb70ff9hvV7/PAcRs9nsaV3X75RSrwBAKqVuVqvVtWabBLRt+w8AHhjAP4ZheFm6BA1fVdVXAHhmsN1KKR9OAnRqDMPwxzLaRUs4AH+HWVXVlZ7qUwbM5/PPmxTZ9VCkhGPweop3Xfd6awocqwAARUnAsGztApiKuS6OWIa9bRDbQE4iQmLfE6CBQho6tYjQmK0CSpMQCr+1CNpGMKbhVBkRG+PBDBgBYjvgFEERm1NArtOBAt45BczRo+qQIiMoY/HKgJymAyU8KgNykEANHyTgVGsCB3ywgNQSuOCjBKSSwAkfLYBbAjc8iQAuCSngyQRQS0gFTyqASkJKeHIBsRJSw7MICJVwCng2AVgJp4JnFeArQZezPLcfr7zZH8aiboZC7uRco7tp0/zTIhk8ewZ43kDZvLKP/NgpewYESEgGnywDEBKSwl8EmP8OhyxwmDqOxdBsKmkWJFkDEPBJd4AkU+Beb4MueP0CxtleCPnAj2+fYMpi1h2fsixrQAhQSB0fQFcZcgExIDF1XaCHficVQAFA0QZGBpkAysAp23LJIBHAETBHmzYZ0QI4A+Vsm+RuMEWA3H0EZwB3YGa6cvYVJIAzoEOLFlefaAFcgbhWa/07R98oARwB+IBzTgdvATnAez5ZQj1P8BKQEzy1BKeAHOEpJRwVkDM8lYTLq7K2VbiEkd+NOzTmy+vynHssdo+nKI/NhCkDsBUpguVqA8NiHpr6ppTS5wZ3P6gLCy4obLvHJAghvndd90K3eSegbdvHAPDrXOA9t8gnUsrf5sHJTrswJBQ58p67g5RSzqcM0F+aprkWQrzRp0d1ivR9/7b0U6NmJtR1/XEzxW+VUp/2js6OhfV00KmBnXMllLexOe8FSgCLifE/KM7xbmzAXMcAAAAASUVORK5CYII=";
};exports.close_icon = close_icon;
var loading_icon = function loading_icon() {
  return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAw9JREFUeF7tm7uKFUEQhv8/EENBREEQDAQDL5FgYGJk4gUDXfAFTBbFxFh9AkF0wVdwEQNFMFLB1ETZTc1UWBF8gl9KZqAd5xz7Umdm9pzubNkzdfmqunpmqoZY8cUV9x8VQM2AkQhIug/gGoAdAO9J2t+Dr9G2gKS3AM43Hm+RPDm498B4NUCSQodJjhKMUZSa4xVAzYC6BXZvDWiOsIckf+VWbs8aIGk/gNs5R2lyEQwM/wrgDsnNHAheACRdB7AB4IDZkXqaJAFoIn+v4/BaDgQPAI3zzzr2PEjJhFQA+wBsAzhcCqEUwAznfwA4TvJnbFYmAWjOb0u5LnX7V1ImlACY4XyyDX+2TCyp8HceBuTeCnvo/usONAeARybkPAx5O5+dAS20RRg0KyCL0pW1BSK3w2WSr3IzrKPjHIAPPbKS6k6fLcUA5myH1yQvOgF4AeBq6cmzMAAzICSdx/NA9dx/FEe+1eeSAUFNOAvgFoBvJO96RD+Q/QjAXgCPSX72ku0KwMuoIeVUAEPSnqKumgFTjMqQNtUMGJL2FHX9kwHBQ8qJSIPfjdHZ8bKzD0DYsYlkgME7O53H6Ww7K4AuOq/Uig1J7u+87KynQG4EluW6mgHLEslcP2oG5JJblutqBnhHUpL1Dq1H6Tr0JMnmiW5M+pWYJGuZWevM1kuSVzwAS7pk8gJZ03spKukNgAuBkTskDzoBeArgZkeWCwSXGiDpO4BDHQM3SK47ATgF4FOPrGIIRQAkWbvcBh33dIzbJLnm4XwrY3KtMUlHANj7eYMQrijnd3VzVJJNddqe7w5KRDlvtHZte1zSaQDPARzLiXyQ0tlTYp7bIbkGdI661p/oyHsAaDJo1qTKGZIfY+tPDoAvAI4GCpKdbxzIzoD/FMZ1kjY1FrVyAIRncpbzXgCCTGjH5LaaWSUb5IpayQACpdYB7htaiFJcMiTVVdAOSgJ4QtKO5eiVBSBa+pwfegIosacCKKFXcm3NgPq9QP1eYOU/mlrtz+ZKCqjntaMdg55OlMiqAEroLcO1vwEXP5hQQ2kdjgAAAABJRU5ErkJggg==";
};exports.loading_icon = loading_icon;

var loading_round_icon = function loading_round_icon() {
  return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAA/NJREFUeF7tm0uolVUUx3//WYNmQqSRg4xwYAOFbGIDyxqYD5w6ieyhKUWoZBg2sIcvdKCoJZYQRdCggSniMygnJuigiYoGvdCKZg2crViyjyz3+c7r3nO959vfXbD5Lud893z7/zv7sdba64iGmxqunykAUyNgkgmYmQF/hvYP4O2kpB8nunuTPgUSgE46fwe+Bk5JOjsRMEYdQNR8DfgSOCDp32HBqBOAluYbDiGBuD1eEKMA4GFgOuDXVnsO8NbNfk4QPhkPhEkH0KnzZuZQlgJL0rXTrYckrR4rhJEFEAWZ2Vzg5dQerBB7RtLzY4FQCwAtYWb2eIKwKk2XqPkXSbMGhVArAAHEbOAL4KlcsKSBNA1086B0J/p+MzsHLMyec1HS/H6fXWsALtLMPk/TImp2X2FdPxBqDyBB2AG8kwneIendXhCKAJAgHAZeyQS/Iamrn1AMgAThGPBigODO0nxJHT3G0gD4NukRpHuULdsgaU+nqVAUgDQKPgI2B8EeOzzdKYAqEYCPgstA9Bjfl/RB1SgoDkAaBXuBN+MokORg2qxUAB47XMrULpd0tM1z7LVP1vV9MzsJvBD6f1jSa00CsBHYFQTflDSjSQBmAr9mghflucUi14CWaDNzn2BBgPCxpPcilNIBeCywLQg+IslzCXetdAArga+C3hOSFjcJwLNAPE+4LGlekwDMATwgatktSZ5sbcwUeAj46x7BWcqsbQ2oOKqaLulWXR2iXv2uAvAH8Ej4x3mSPLgo0qoAXPAkQlC7WNKJItVDe4GEmX0LrAiCV0k60iQAnwKvB8GbJUVnoigWVVPgQyC6i2clLSpKdbdt0MyeAX7IBM+QdLNECJWusJn9BjwaBK+WdKhJAPKDhu8kLWsSAC9OOJMJLtIf6BgNmtlV4IkAYZ+kt0obBd0AbAG2BsH/AXMlXS8JQjcA0wD3CmPRQVtGpe4wuiZEzGw9sDuI9KBooaQrdRfe6n8vAA8APwFPBsEDFSCMOqieKTEzWwMczIR8L8mzLbW3ngBcoZnl8YG/3JZgrCONvgAkCKeBPCbYKWlTHYX3tQbkwszMj5ofy17/TNKrdYXQ9whoCexQ3X0ceLuOPsLAANJ08J0hr9HzLdIrtnxtqI2zNCYACcJ+YG3F0HeP0TNIDmLkc4ljBpAgbAe6LYKnAF88v5HkIfbI2bgAJAjuJ/hIiM5SldDzgK8VDsKny9/eJPl10mzcABIE9xgdgreBCpYHre0dNqmhAAg7hAdQDuGlfkEUBSB+O2bmGST/wYMXLt5zHhfvKxZABsMzTB47xJ/G3Pm7EQCGPW+H+XlDXQOG2bH79VlTAO4X6VF9zv/xIy5QSa7r/AAAAABJRU5ErkJggg==";
};exports.loading_round_icon = loading_round_icon;
var loading_taichi_icon = function loading_taichi_icon() {
  return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAABL1JREFUeF7tm41RFTEQgHcrECtQKlArECpQKxArECtQKlAqECtAKxAqECoQK1ArWOd7s8fkxfzcXe4evIPMMLyZ95LLfrvZbDZ7Kne86R2XX+4BtFqAme2IyBMR4f+lql4NHdPMnorIg7Cfqp4PHWfM75sswMwOROSjC989/5Oqvhs6GQcJiD0ReelQgXkhImcicq6qfJ60jQLgk0VwAKTaG1U9aZmpmT12EIci8sjHAgjjfhljaan5DAbgwn8XEbSVa2gLTU7SzIyxPojI82BAQBy1ghgEoKfwzBFfUAI0CowvOUB0FsE4gHinqn/GDNobgAv/Q0QwzVr7pqqs48mbz+OTiLwOBkf4D6p6PPSBvQAM0Hz3/GdzOKxQOLeGz5HAX0UE/9PbGvoCYM33WdO/RORQVZnI7M23T3aIcAvFUb7qq4AqADNjzb2vSIPgmGCT5x9DLAMBC9jvA6EIwL0v2i811h3C9za7MYKW+rRAyALo4fT+sk+rKiZ44y2jrKollACUTP/ShR8c9s5JyswImgjQwgaE3ZyFJgG49n9GIW43KMLv3aTJV5YDFhkGTPz8QlWfpfrlALDPvk10uNXCM18PoVFe3Igaseq19h+Agvbx9E9vq+ZDqQo7FzvDms9KAUitI8afPbiZyj+4EvFPa0fs1FJIASDcjeN4Ym2Wxda0ghWsnVTXAPh+CoCwTXqy2xTBgi+4UtXdbh4xgJT5/7duNiVE63PMLLUjMOy1FcQA4g4kHnJJj9b5zd4/Exfw3DNV3edDDMCiWW2N40vRLCwDfk5wdHUNILH+Z0lqzK726AFmRiQY7wb86lhVD0MAHHfDg09zXm/TwmasIOcHVtFhCCCO/VcmchuEaJmDmeWiWoZ9mAOwCPNHwko+41UOwGp9tJC/LX0rAI5yAEgpbSStNTeoCoDzHICtDX5ioBUAF0kAqlrNFc6tuanGr+U07wF0pM2Mi4zTVXi4LAuI45vQuC6TkeCSAPhWmAuG9pNngQUCoHaBQI+DHWExqT0ucM6Sp8GlASg51BjAKhy+ywBIhZERWkwcUNtOUzlBDkA3cs9Xm+wc36cAsAx2lnIWqEFLAaAA4jR3k1IbcNu+z90Mcc3NMtj6fEBNITkAqwqtbbsLqAmb+r50O3xwEwUPY4Ro6VOrD8AZLnoZLObYm7MC7glLF7qLBsAJt5bZWiwAL6PjHrBYwrNIAC48tQzVxO7iAATltL2KORYFwMwo6znyGqZepfXNAPxO8YVXX3xr2ZPH9vWKEMpmSesNutIbDSBTP0zMwAQ2Vjvo9YEIT/Q6SPhV/rOBOueFsGI7HGqSWv7S3Pzqm5rArip9sPCjAbj2f/eANzkIX3Ks9bBwY5TwLQAwt1QtXo4J12z8UW80OLR2beNnEDos4KJcl6LNXg5v0GGopt1C4UGtK5PlDxA5X0EWF0EBTV4/9ZIGDpcDW1ORdosPQBvxCws14af4ftJ3EkYD8AsHIi1SaKkSlCmEDcfA3Cl24LW8Jq2HgzYB6Aby6AsYvEA5dUPjCH4ypeDdJCcBEIDo3vVja4ortoeA4eZm5ThbHFyfB04KIH6gByk4M5xa6Z0jnCJmTf3exoKo0dtgH7Lb8pt/aqP/srUKsSAAAAAASUVORK5CYII=";
};exports.loading_taichi_icon = loading_taichi_icon;
var success_icon = function success_icon() {
  return "data:image/png;base64,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";
};exports.success_icon = success_icon;
var fail_icon = function fail_icon() {
  return "data:image/png;base64,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";
};exports.fail_icon = fail_icon;
var warn_icon = function warn_icon() {
  return "data:image/png;base64,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";
};exports.warn_icon = warn_icon;

/***/ }),

/***/ 25:
/*!***********************************************************************************************************!*\
  !*** /Users/weiqu/Documents/GitApp/jj-uni-messagebox/pages/components/jj-messagebox/messageView/alert.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createApp) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _constant = __webpack_require__(/*! ./constant.js */ 14);


var _ref = __webpack_require__(/*! ./ref.js */ 15);



var _processor = _interopRequireDefault(__webpack_require__(/*! ./processor.js */ 16));
var _jjAlert = _interopRequireDefault(__webpack_require__(/*! ../alert/jj-alert.vue */ 26));


var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 3));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
var jjAlert = _vue.default.extend(_jjAlert.default); //创建vm实例的构造函数












var jj_alert_instance = null;
var jj_alert = function jj_alert(alertData, message, btnTitle) {
  var data = getData(alertData, message, btnTitle);
  var obj = (0, _processor.default)(_constant.kAlert);
  obj.processDataFun = getData;











  (0, _ref.showMessageBox)(function () {
    obj.messageObj = showAlertApp_MP(data);
  });








  return obj;
};
var showAlertApp_MP = function showAlertApp_MP(data) {
  var alert = (0, _ref.getRef)(_constant.kAlert);
  if (alert !== undefined) {

    var isClose = data['isClose'] || false;
    if (isClose) {
      alert.close();
      return null;
    }
    var priority = data['priority'] || 0;
    var alertPriority = alert.priority;

    if (alertPriority > priority && alert.isShow) {
      //比较已有弹窗的优先级，如果已经展示的弹窗的优先级比较高，就不往下执行
      return;
    }
    alert.isCloseAlert = false;
    alert.isShow = false;
    alert.show(data);
    return alert;
  }
  return null;
};
var showAlertH5 = function showAlertH5(data) {
  var isClose = data['isClose'] || false;
  if (removeAlertH5(data) || isClose) {
    return;
  }
  var instance = new jjAlert({
    data: data });

  instance.$mount();
  document.body.appendChild(instance.$el);
  instance.show(data);
  jj_alert_instance = instance;
};

var showAlertH5_Vue3 = function showAlertH5_Vue3(data) {
  var isClose = data['isClose'] || false;
  if (removeAlertH5(data) || isClose) {
    return;
  }
  document.body.appendChild(mountNode);
  var app = createApp(_jjAlert.default, _objectSpread({},
  data));

  var instance = app.mount(mountNode);
  instance.show(data);
  jj_alert_instance = instance;
};

var removeAlertH5 = function removeAlertH5(data) {
  if (jj_alert_instance !== null) {
    var priority = data['priority'] || 0;
    var alertPriority = jj_alert_instance.priority;
    if (alertPriority > priority && jj_alert_instance.isShow) {
      //比较已有弹窗的优先级，如果已经展示的弹窗的优先级比较高，就不往下执行
      return true;
    }
    jj_alert_instance.close();
    jj_alert_instance.$el.remove();
    jj_alert_instance = null;

  }
  return false;
};

var getData = function getData(alertData, message, btnTitle) {
  var data = {};
  var isAlertDataNull = alertData === undefined || alertData === null;
  var isMessageNull = message === undefined || message === null;
  var isBtnTitileNull = btnTitle === undefined || btnTitle === null;
  if (isAlertDataNull && isMessageNull && isBtnTitileNull) {
    return {};
  } else {
    if (!isAlertDataNull) {
      if (typeof alertData === 'object') {
        data = _objectSpread({},
        alertData);

        return data;
      } else {
        data['title'] = alertData + '';
      }
    }

    if (!isMessageNull) {
      data['message'] = message + '';
    }
    if (!isBtnTitileNull) {
      data['btns'] = [{
        'title': btnTitle }];

    }

  }
  return data;
};var _default =
jj_alert;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createApp"]))

/***/ }),

/***/ 3:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2022 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou' || vm.mpHost === 'mp-xhs'){//百度、快手、小红书 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue !== pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"jj-uni-messagebox","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"jj-uni-messagebox","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"jj-uni-messagebox","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"jj-uni-messagebox","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      (this.$scope['_triggerEvent'] || this.$scope['triggerEvent']).call(this.$scope, event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 33:
/*!*************************************************************************************************************!*\
  !*** /Users/weiqu/Documents/GitApp/jj-uni-messagebox/pages/components/jj-messagebox/messageView/loading.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createApp) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _constant = __webpack_require__(/*! ./constant.js */ 14);


var _ref = __webpack_require__(/*! ./ref.js */ 15);



var _processor = _interopRequireDefault(__webpack_require__(/*! ./processor.js */ 16));
var _jjLoading = _interopRequireDefault(__webpack_require__(/*! ../loading/jj-loading.vue */ 34));


var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 3));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
var jjLoading = _vue.default.extend(_jjLoading.default); //创建vm实例的构造函数












var jj_loading_instance = null;
var getLoadingData = function getLoadingData(loadingData) {
  var data = {};
  if (loadingData === undefined || loadingData === null) {

  } else {
    if (typeof loadingData === 'object') {
      data = _objectSpread({},
      loadingData);

    } else {
      data = {
        "message": loadingData + '' };

    }
  }
  return data;
};

var jj_loading = function jj_loading(loadingData) {
  var data = getLoadingData(loadingData);
  var obj = (0, _processor.default)(_constant.kLoading);
  obj.processDataFun = getLoadingData;











  (0, _ref.showMessageBox)(function () {
    obj.messageObj = showLoadingApp_MP(data);
  });








  return obj;
};

var showLoadingH5 = function showLoadingH5(data) {
  var isClose = data['isClose'] || false;
  removeLoadingH5();
  if (isClose) {
    return;
  }
  var instance = new jjLoading({
    data: data });

  instance.$mount();
  document.body.appendChild(instance.$el);
  instance.show(data);
  jj_loading_instance = instance;
};

var showLoadingH5_Vue3 = function showLoadingH5_Vue3(data) {
  var isClose = data['isClose'] || false;
  removeLoadingH5();
  if (isClose) {
    return;
  }

  document.body.appendChild(mountNode);
  var app = createApp(_jjLoading.default, _objectSpread({},
  data));

  var instance = app.mount(mountNode);
  instance.show(data);
  jj_loading_instance = instance;
};

var removeLoadingH5 = function removeLoadingH5() {
  if (jj_loading_instance !== null) {
    jj_loading_instance.close();
    jj_loading_instance.$el.remove();
    jj_loading_instance = null;
  }
};

var showLoadingApp_MP = function showLoadingApp_MP(data) {
  var loading = (0, _ref.getRef)(_constant.kLoading);
  if (loading !== undefined) {
    loading.isShow = false;
    var isClose = data['isClose'] || false;
    if (isClose) {
      loading.close();
      return null;
    }
    loading.show(data);
    return loading;
  }
  return null;
};var _default =

jj_loading;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createApp"]))

/***/ }),

/***/ 4:
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {Object.defineProperty(exports, "__esModule", { value: true });exports.compileI18nJsonStr = compileI18nJsonStr;exports.hasI18nJson = hasI18nJson;exports.initVueI18n = initVueI18n;exports.isI18nStr = isI18nStr;exports.normalizeLocale = normalizeLocale;exports.parseI18nJson = parseI18nJson;exports.resolveLocale = resolveLocale;exports.isString = exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var isArray = Array.isArray;
var isObject = function isObject(val) {return val !== null && typeof val === 'object';};
var defaultDelimiters = ['{', '}'];var
BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {_classCallCheck(this, BaseFormatter);
    this._caches = Object.create(null);
  }_createClass(BaseFormatter, [{ key: "interpolate", value: function interpolate(
    message, values) {var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    } }]);return BaseFormatter;}();exports.Formatter = BaseFormatter;

var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {var _ref2 = _slicedToArray(_ref, 2),startDelimiter = _ref2[0],endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: 'text', value: text });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ?
      'list' :
      isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ?
      'named' :
      'unknown';
      tokens.push({ value: sub, type: type });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
        text += char;
      }
  }
  text && tokens.push({ type: 'text', value: text });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = isArray(values) ?
  'list' :
  isObject(values) ?
  'named' :
  'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else
        {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;}

    index++;
  }
  return compiled;
}

var LOCALE_ZH_HANS = 'zh-Hans';exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {return hasOwnProperty.call(val, key);};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}
function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}var
I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {var locale = _ref3.locale,fallbackLocale = _ref3.fallbackLocale,messages = _ref3.messages,watcher = _ref3.watcher,formater = _ref3.formater;_classCallCheck(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }_createClass(I18n, [{ key: "setLocale", value: function setLocale(
    locale) {var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    } }, { key: "getLocale", value: function getLocale()
    {
      return this.locale;
    } }, { key: "watchLocale", value: function watchLocale(
    fn) {var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    } }, { key: "add", value: function add(
    locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else
        {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else
      {
        this.messages[locale] = message;
      }
    } }, { key: "f", value: function f(
    message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    } }, { key: "t", value: function t(
    key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else
      {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    } }]);return I18n;}();exports.I18n = I18n;


function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else
  {
    appVm.$watch(function () {return appVm.$locale;}, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {var _ref4 =
    [
    messages,
    locale];locale = _ref4[0];messages = _ref4[1];

  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale =
    typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale ||
    LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher });

  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else
    {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    } };

}

var isString = function isString(val) {return typeof val === 'string';};exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else
    {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else
    {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {var locale = _ref5.locale,locales = _ref5.locales,delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name] });

    }
  });
  localeValues.unshift({ locale: locale, values: locales[locale] });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  }
  catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else
  {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else
  if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}

function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {return locales.indexOf(locale) > -1;});
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 5:
/*!******************************************************************!*\
  !*** /Users/weiqu/Documents/GitApp/jj-uni-messagebox/pages.json ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 60:
/*!***********************************************************************!*\
  !*** /Users/weiqu/Documents/GitApp/jj-uni-messagebox/static/image.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.loading_custom = exports.bg_custom_update = exports.background_image = exports.logo = void 0;var logo = function logo() {
  return "data:image/png;base64,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UmVhZHlxyWU8AAADKmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzIgNzkuMTU5Mjg0LCAyMDE2LzA0LzE5LTEzOjEzOjQwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGRkE0MjcxNTdEQzYxMUU4QkZBOERDOEVCQ0U0NTBGMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGRkE0MjcxNDdEQzYxMUU4QkZBOERDOEVCQ0U0NTBGMSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNS41IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QkE4RkFCN0M3REM1MTFFOEJGQThEQzhFQkNFNDUwRjEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QkE4RkFCN0Q3REM1MTFFOEJGQThEQzhFQkNFNDUwRjEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5BZZ+3AAAB1ElEQVR42mJkAALtmZb/GfAAJkIKwIoYiAA4FV1JO0Ylk0hWxILLHTgV6cyywqoIIIAYiQinb8S4iYs036E7esgEJq6ABAGAACImMBmo5m6yDcLlR5gcNnnaumhADWIhJoOTbRC+9ILPa9+o4TWAAAIlyDVAOphCc1SYqGAICNwZxumIidi8NILz2qhBdCyPaOcicgq1wRnYAAFErRKSgZo+GzSOoWpQD1sHsRCjCDnzkpp90DM+If2jUTbqoFEHjZZDpJYroyFESeNmNFHTykEqg8g9bwACCNRiVAYyLgEx1wA7Zu3V9OMhVBt1opajBlsaCh7NZaMOGnXQgFeupHZjKO1CjUbZqINGHTTqoFEHjTpo1EGjDhqMgw342kejUTaahggpoOdg1WiUjTpoODoIvL7tzSBykB5AgPbtGIdBGIYCaBR16swROEQvzT06cxjm1lRFDC0LcpXC+xJzpIdJhOW8e4z359MVWSde1C32xRYasC0mCmascDZzrQz+7NgABAgQINnRY/iUrb5D9v9l9toqCBAgQIAAAQIESAABAgQIEKCD5ZK9QPaMigoCdIJP7NdjOyoIECBAgGQBGjB8zVDjam153T0OqInJbBAWfdg8AExKZVcA71uIAAAAAElFTkSuQmCC";
};exports.logo = logo;
var background_image = function background_image() {
  return "data:image/jpeg;base64,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";
};exports.background_image = background_image;
var bg_custom_update = function bg_custom_update() {
  return "data:image/png;base64,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";
};exports.bg_custom_update = bg_custom_update;
var loading_custom = function loading_custom() {
  return "data:image/png;base64,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";
};exports.loading_custom = loading_custom;

/***/ }),

/***/ 63:
/*!*****************************************************************************!*\
  !*** /Users/weiqu/Documents/GitApp/jj-uni-messagebox/pages/mine/request.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var requsetUserInfo = function requsetUserInfo() {
  //全局方式调用
  var load = getApp().globalData.$jj_loading();
  setTimeout(function () {
    load.close();
    getApp().globalData.$jj_toast('成功获取用户信息。。。。。。哈哈😄😄');
  }, 3000);
};var _default =

requsetUserInfo;exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map