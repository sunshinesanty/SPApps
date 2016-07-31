"use strict";
var React = require("react");
var react_dom_1 = require("react-dom");
var spwebtitle_1 = require("./components/spwebtitle");
function GetSessionValue(key) {
    return sessionStorage ? sessionStorage.getItem(key) : "";
}
react_dom_1.render(React.createElement(spwebtitle_1.default, {Title: "From Session:" + GetSessionValue("SPSiteTitle"), Url: GetSessionValue("SPHostUrl")}), document.getElementById("example"));
