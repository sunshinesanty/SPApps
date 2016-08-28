/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	eval("\"use strict\";\n\nvar React = __webpack_require__(1);\nvar react_dom_1 = __webpack_require__(2);\n__webpack_require__(3);\nvar spwebtitle_1 = __webpack_require__(4);\nfunction GetSessionValue(key) {\n    return sessionStorage ? sessionStorage.getItem(key) : \"\";\n}\nreact_dom_1.render(React.createElement(spwebtitle_1.default, { Title: GetSessionValue(\"SPSiteTitle\"), Url: GetSessionValue(\"SPHostUrl\") }), document.getElementById(\"example\"));\n\n/*****************\n ** WEBPACK FOOTER\n ** ./content/index.tsx\n ** module id = 0\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./content/index.tsx?");

/***/ },
/* 1 */
/***/ function(module, exports) {

	eval("module.exports = React;\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"React\"\n ** module id = 1\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22React%22?");

/***/ },
/* 2 */
/***/ function(module, exports) {

	eval("module.exports = ReactDOM;\n\n/*****************\n ** WEBPACK FOOTER\n ** external \"ReactDOM\"\n ** module id = 2\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///external_%22ReactDOM%22?");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	eval("module.exports = __webpack_require__.p + \"favicon.ico\";\n\n/*****************\n ** WEBPACK FOOTER\n ** ./content/favicon.ico\n ** module id = 3\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./content/favicon.ico?");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	eval("\"use strict\";\n\nvar React = __webpack_require__(1);\nvar SPWebTitle = function SPWebTitle(props) {\n    return React.createElement(\"h1\", null, React.createElement(\"a\", { href: props.Url }, \" \", props.Title));\n};\nSPWebTitle.prototype = {\n    children: React.PropTypes.object.isRequired\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.default = SPWebTitle;\n\n/*****************\n ** WEBPACK FOOTER\n ** ./content/components/spwebtitle.tsx\n ** module id = 4\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./content/components/spwebtitle.tsx?");

/***/ }
/******/ ]);