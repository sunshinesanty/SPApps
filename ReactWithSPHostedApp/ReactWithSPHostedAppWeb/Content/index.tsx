import * as React from "react";
import { render } from "react-dom";
import "./favicon.ico";

import SPWebTitle from "./components/spwebtitle";
function GetSessionValue(key:string) {
    return sessionStorage ? sessionStorage.getItem(key) : "";
}
render(
    <SPWebTitle Title={GetSessionValue("SPSiteTitle") } Url={GetSessionValue("SPHostUrl") } />,
    document.getElementById("example")
);