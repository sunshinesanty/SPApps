"use strict";
var React = require("react");
var SPWebTitle = function (props) {
    return (React.createElement("h1", null, React.createElement("a", {href: props.Url}, " ", props.Title)));
};
SPWebTitle.prototype = {
    children: React.PropTypes.element
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SPWebTitle;
